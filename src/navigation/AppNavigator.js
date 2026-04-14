import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";

import AuthLoadingScreen from "../components/AuthLoadingScreen";
import BottomTabs from "./BottomTabs";
import RideDetails from "../screens/RideDetails";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        {/* 🔥 Main App */}
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="RideDetails" component={RideDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}