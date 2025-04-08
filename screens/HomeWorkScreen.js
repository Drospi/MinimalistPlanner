import { View, Text, StyleSheet } from 'react-native';

export default function HomeWorkScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan Tareas</Text>
      <Text>Aquí va el contenido de tu plan semanal...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});