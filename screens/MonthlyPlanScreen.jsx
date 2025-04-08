import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Modal, Alert } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const MonthlyPlanScreen = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState('');
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  // Inicializar datos de ejemplo
  useEffect(() => {
    const initialTasks = {
      [moment().format('YYYY-MM')]: [
        { id: '1', text: 'Revisar presupuesto', completed: false },
        { id: '2', text: 'Reunión con equipo', completed: true },
        { id: '3', text: 'Actualizar proyecto', completed: false },
      ],
      [moment().add(1, 'month').format('YYYY-MM')]: [
        { id: '4', text: 'Preparar presentación', completed: false },
      ],
    };
    setTasks(initialTasks);
  }, []);

  // Mover tareas pendientes al siguiente mes
  const movePendingToNextMonth = () => {
    const currentMonthKey = currentMonth.format('YYYY-MM');
    const nextMonthKey = currentMonth.clone().add(1, 'month').format('YYYY-MM');
    
    if (tasks[currentMonthKey]) {
      const pendingTasks = tasks[currentMonthKey].filter(task => !task.completed);
      const completedTasks = tasks[currentMonthKey].filter(task => task.completed);
      
      setTasks(prev => ({
        ...prev,
        [currentMonthKey]: completedTasks,
        [nextMonthKey]: [
          ...(prev[nextMonthKey] || []),
          ...pendingTasks.map(task => ({
            ...task,
            id: Math.random().toString(36).substring(7),
          }))
        ]
      }));
      
      Alert.alert('Tareas movidas', 'Las tareas pendientes se han movido al siguiente mes');
    }
  };

  // Agregar nueva tarea
  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const monthKey = currentMonth.format('YYYY-MM');
    const newTaskObj = {
      id: Math.random().toString(36).substring(7),
      text: newTask,
      completed: false
    };
    
    setTasks(prev => ({
      ...prev,
      [monthKey]: [...(prev[monthKey] || []), newTaskObj]
    }));
    
    setNewTask('');
    setIsPanelActive(false);
  };

  // Editar tarea
  const saveEditedTask = () => {
    if (editText.trim() === '' || !editingTask) return;
    
    const monthKey = currentMonth.format('YYYY-MM');
    setTasks(prev => ({
      ...prev,
      [monthKey]: prev[monthKey].map(task => 
        task.id === editingTask.id ? { ...task, text: editText } : task
      )
    }));
    
    setEditingTask(null);
    setEditText('');
  };

  // Eliminar tarea
  const deleteTask = (taskId) => {
    const monthKey = currentMonth.format('YYYY-MM');
    setTasks(prev => ({
      ...prev,
      [monthKey]: prev[monthKey].filter(task => task.id !== taskId)
    }));
  };

  // Cambiar estado de tarea
  const toggleTask = (taskId) => {
    const monthKey = currentMonth.format('YYYY-MM');
    setTasks(prev => ({
      ...prev,
      [monthKey]: prev[monthKey].map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  // Renderizar cada tarea
  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
        <MaterialIcons 
          name={item.completed ? 'check-box' : 'check-box-outline-blank'} 
          size={24} 
          color={item.completed ? '#4CAF50' : '#757575'} 
        />
      </TouchableOpacity>
      
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.text}
      </Text>
      
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => {
          setEditingTask(item);
          setEditText(item.text);
        }}>
          <Feather name="edit" size={20} color="#2196F3" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <MaterialIcons name="delete" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Generar meses para el slider
  const months = Array.from({ length: 12 }, (_, i) => 
    moment().subtract(2, 'months').add(i, 'months')
  );

  return (
    <View style={styles.container}>
      {/* Encabezado con selector de mes */}
      <View style={styles.header}>
        <Text style={styles.title}>Plan Mensual</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.monthSelector}
        >
          {months.map((month, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.monthButton,
                currentMonth.format('YYYY-MM') === month.format('YYYY-MM') && 
                styles.activeMonthButton
              ]}
              onPress={() => setCurrentMonth(month)}
            >
              <Text style={styles.monthText}>
                {month.format('MMMM YYYY')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de tareas */}
      <FlatList
        data={tasks[currentMonth.format('YYYY-MM')] || []}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.taskList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay tareas para este mes</Text>
        }
      />

      {/* Botón para agregar tarea */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setIsPanelActive(true)}
      >
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Panel para agregar nueva tarea */}
      <Modal
  visible={isPanelActive}
  transparent
  animationType="slide"
  onRequestClose={() => setIsPanelActive(false)}
>
  <View style={styles.panelContainer}>
    <View style={styles.panelContent}>
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => setIsPanelActive(false)}
      >
        <MaterialIcons name="close" size={24} color="#6200EE" />
      </TouchableOpacity>
      <Text style={styles.panelTitle}>Agregar Tarea</Text>
      {/* Resto del contenido */}
    </View>
  </View>
</Modal>

      {/* Modal para editar tarea */}
      <Modal
        visible={!!editingTask}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Tarea</Text>
            <TextInput
              style={styles.input}
              value={editText}
              onChangeText={setEditText}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditingTask(null)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveEditedTask}
              >
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Botón para mover tareas pendientes */}
      {moment().isAfter(currentMonth, 'month') && (
        <TouchableOpacity 
          style={styles.moveButton}
          onPress={movePendingToNextMonth}
        >
          <Text style={styles.moveButtonText}>Mover pendientes al siguiente mes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200EE',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  monthSelector: {
    paddingHorizontal: 10,
  },
  monthButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeMonthButton: {
    backgroundColor: 'white',
  },
  monthText: {
    color: 'white',
    fontWeight: '500',
  },
  activeMonthText: {
    color: '#6200EE',
  },
  taskList: {
    padding: 20,
    paddingBottom: 100,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  taskText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  taskActions: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#757575',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  panelContent: {
    padding: 20,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  moveButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 8,
  },
  moveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  panelContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
});

export default MonthlyPlanScreen;