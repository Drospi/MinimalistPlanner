import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MonthlyPlanScreen from './screens/MonthlyPlanScreen';
import WeeklyPlanScreen from './screens/WeeklyPlanScreen';
import DailyPlanScreen from './screens/DailyPlanScreen';
import GoalScreen from './screens/GoalScreen';
import HomeWorkScreen from './screens/HomeWorkScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MonthlyPlan" 
          component={MonthlyPlanScreen} 
          options={{ title: 'Plan Mensual' }}
        />
        <Stack.Screen 
          name="WeeklyPlan"
          component={WeeklyPlanScreen}
          options={{ title: 'Plan Semanal' }}
        />
        <Stack.Screen 
          name="DailyPlan"
          component={DailyPlanScreen}
          options={{ title: 'Plan Diario' }}
        />
        <Stack.Screen 
          name="Goal"
          component={GoalScreen}
          options={{ title: 'Metas' }}
        />
        <Stack.Screen 
          name="HomeWork"
          component={HomeWorkScreen}
          options={{ title: 'Tareas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}