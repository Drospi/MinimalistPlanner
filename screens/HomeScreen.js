import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Mi Planificador Personal</Text>

          <View style={styles.optionsContainer}>
            <Text style={styles.sectionTitle}>Planes</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => navigation.navigate("MonthlyPlan")}
            >
              <Text style={styles.optionText}>Plan Mensual</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("WeeklyPlan")}
              style={styles.optionButton}
            >
              <Text style={styles.optionText}>Plan Semanal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => navigation.navigate("DailyPlan")}
            >
              <Text style={styles.optionText}>Plan Diario</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Organización</Text>

            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Asistencia</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => navigation.navigate('Goal')}
            style={styles.optionButton}>
              <Text style={styles.optionText}>Metas</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => navigation.navigate('HomeWork')}
            style={styles.optionButton}>
              <Text style={styles.optionText}>Tareas Pendientes</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  optionsContainer: {
    width: "100%",
    maxWidth: 400,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  optionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  optionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
