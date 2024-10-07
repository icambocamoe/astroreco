import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HoroscopeScreen from './screens/HoroscopeScreen';
import RecommendationsScreen from './screens/RecommendationsScreen';
import { auth, db } from './firebase'; // Update the path as needed

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Define the Bottom Tab Navigator for Home Section
function HomeTabs({ route }) {
  // Extract the passed 'user' param
  const { user } = route.params;
  console.log("hometabs", user)
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        initialParams={{ user }} // Pass 'user' to HomeScreen
      />
      <Tab.Screen 
        name="Horoscope" 
        component={HoroscopeScreen} 
        initialParams={{ user }} // Pass 'user' to HoroscopeScreen
      />
      <Tab.Screen 
        name="Recommendations" 
        component={RecommendationsScreen} 
        initialParams={{ user }} // Pass 'user' to RecommendationsScreen
      />
    </Tab.Navigator>
  );
}
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

