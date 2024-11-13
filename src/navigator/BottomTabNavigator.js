import HoroscopeScreen from "../screens/HoroscopeScreen.js";
import RecommendationsScreen from "../screens/RecommendationsScreen.js";
import MoviesScreen from "../screens/MoviesScreen.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext } from "react";
import { SettingsScreen } from "../screens/SettingsScreen.js";
import { BirthChartScreen } from "../screens/BirthChartScreen.js";
import { HomeScreen } from "../screens/HomeScreen.js";
import { ThemeContext } from "../context/ThemeContext.js";

const Tab = createBottomTabNavigator();

export function HomeTabs({ route }) {
  // Extract the passed 'user' param
  const { user } = route.params;
  console.log(user);


  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }

  return (
    <Tab.Navigator
      initialRouteName="BirthChart"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "BirthChart") {
            iconName = focused ? "map" : "map-outline"; // Cambia el icono según si está enfocado o no
          } else if (route.name === "Horoscope") {
            iconName = focused ? "star" : "star-outline"; // Cambia el icono según si está enfocado o no
          } else if (route.name === "Songs") {
            iconName = focused ? "musical-notes" : "musical-notes-outline"; // Cambia el icono según si está enfocado o no
          } else if (route.name === "Movies") {
            iconName = focused ? "film" : "film-outline"; // Cambia el icono según si está enfocado o no
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline"; // Cambia el icono según si está enfocado o no
          }
          else if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline"; // Cambia el icono según si está enfocado o no
          }

          // Retorna el ícono correspondiente de Ionicons
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themeData.texto  /* "black" */, // Cambia el color del ícono cuando la pestaña está activa
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: themeData.fondo,  /* "white" */ },
      })}
    >
      {/* <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}
      
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{ user }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="BirthChart"
        component={BirthChartScreen}
        initialParams={{ user }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Horoscope"
        component={HoroscopeScreen}
        initialParams={{ user }} // Pass 'user' to HoroscopeScreen
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Songs"
        component={RecommendationsScreen}
        initialParams={{ user }} // Pass 'user' to RecommendationsScreen
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        initialParams={{ user }} // Pass 'user' to RecommendationsScreen
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        initialParams={{ user }} // Pass 'user' to RecommendationsScreen
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
