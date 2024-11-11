import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { auth } from "./firebaseConfig.js"; // Import your firebase configuration
import { onAuthStateChanged } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen.js';

import RegisterScreen from './src/screens/RegisterScreen.js';
import OnboardingScreen from './src/screens/OnboardingScreen.js';
import { HomeTabs } from './src/navigator/BottomTabNavigator.js';

const Stack = createNativeStackNavigator();

// Define the Bottom Tab Navigator for Home Section



export default function App() {

  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        // Simulate an async operation such as fetching a configuration or initializing a service
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay

        const unsubscribe = onAuthStateChanged(auth, (u) => {
          if (u) {
            console.log('User is signed in:', u.uid);
            setUser(u.uid);
          } else {
            console.log('No active session found');
            setUser(null);
          }
          setLoading(false); // Set loading to false after initialization
        });

        // Return the unsubscribe function for cleanup
        return unsubscribe;
      } catch (error) {
        console.error('Error initializing Firebase:', error);
        setLoading(false);
      }
    };

    initializeFirebase();
  }, []);

  if (loading) {
    // Render a loading indicator or splash screen
    return <Text>Loading...</Text>; // Replace with a better loading component if desired
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} initialParams={{ user }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

