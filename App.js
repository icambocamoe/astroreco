import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { auth } from "./firebaseConfig.js"; // Import your firebase configuration
import { onAuthStateChanged } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen.js';
import HomeScreen from './src/screens/HomeScreen.js';
import RegisterScreen from './src/screens/RegisterScreen.js';
import OnboardingScreen from './src/screens/OnboardingScreen.js';
import HoroscopeScreen from './src/screens/HoroscopeScreen.js';
import RecommendationsScreen from './src/screens/RecommendationsScreen.js';
import MoviesScreen from './src/screens/MoviesScreen.js';
import HomeSvg from './src/svg_components/astrology-horoscope-svgrepo-com.svg';
import MusicNoteSvg from './src/svg_components/music-note-svgrepo-com.svg';
import MovieReelSvg from './src/svg_components/movie-play-button-2-svgrepo-com.svg';
import StarSVG from './src/svg_components/stars-svgrepo-com.svg';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// Define the Bottom Tab Navigator for Home Section
function HomeTabs({ route }) {
  // Extract the passed 'user' param
  const { user } = route.params;
  console.log(user)
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="BirthChart"
        component={HomeScreen}
        initialParams={{ user }} // Pass 'user' to HomeScreen
        options={{
          tabBarIcon: ({ color, size }) => <HomeSvg fill={color} width={size} height={size}  />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Horoscope"
        component={HoroscopeScreen}
        initialParams={{ user }} // Pass 'user' to HoroscopeScreen
        options={{
          tabBarIcon: ({ color, size }) => <StarSVG fill={color} width={size} height={size} />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Songs"
        component={RecommendationsScreen}
        initialParams={{ user }} // Pass 'user' to RecommendationsScreen
        options={{
          tabBarIcon: ({ color, size }) => <MusicNoteSvg fill={color} width={size} height={size} />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        initialParams={{ user }} // Pass 'user' to RecommendationsScreen
        options={{
          tabBarIcon: ({ color, size }) => <MovieReelSvg fill={color} width={size} height={size} />,
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}


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

