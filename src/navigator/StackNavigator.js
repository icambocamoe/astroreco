import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen.js";
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import RegisterScreen from "../screens/RegisterScreen.js";
import OnboardingScreen from "../screens/OnboardingScreen.js";
import { HomeTabs } from "./BottomTabNavigator.js";
import { auth } from "../../firebaseConfig.js"; // Import your firebase configuration
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'



const Stack = createNativeStackNavigator();



export const StackNavigator = () => {


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
      
        <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
          <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} initialParams={{ user }} />
          <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
        </Stack.Navigator>
      
    );
  }
  



  

