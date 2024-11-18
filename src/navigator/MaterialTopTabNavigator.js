import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext } from "react";
import RecommendationsScreen from "../screens/RecommendationsScreen";
import MoviesScreen from "../screens/MoviesScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeContext } from "../context/ThemeContext.js";



const Tab = createMaterialTopTabNavigator();

export function MaterialTopTabNavigator({ route }) {
  const { user } = route.params; // Ajuste correcto

  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }

  return (
    <Tab.Navigator style={{marginTop:24}}
    
    screenOptions={({ route }) => ({
     /*  tabBarStyle: {
        height: 150, // Ajusta la altura aquí
      }, */
      tabBarLabelStyle: {
        display: 'none', // Oculta completamente el texto del label
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

      /*   if (route.name === "BirthChart") {
          iconName = focused ? "map" : "map-outline"; // Cambia el icono según si está enfocado o no
        } else if (route.name === "Horoscope") {
          iconName = focused ? "star" : "star-outline"; // Cambia el icono según si está enfocado o no
        } else */ if (route.name === "S") {
          iconName = focused ? "musical-notes" : "musical-notes-outline"; // Cambia el icono según si está enfocado o no
        } else if (route.name === "M") {
          iconName = focused ? "film" : "film-outline"; // Cambia el icono según si está enfocado o no
        } /* else if (route.name === "Settings") {
          iconName = focused ? "settings" : "settings-outline"; // Cambia el icono según si está enfocado o no
        } else if (route.name === "HomeScreen") {
          iconName = focused ? "home" : "home-outline"; // Cambia el icono según si está enfocado o no
        } */

        // Retorna el ícono correspondiente de Ionicons
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor:  themeData.texto  /* "black" */, // Cambia el color del ícono cuando la pestaña está activa
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { backgroundColor:  themeData.fondo  /* "white" */ },
    })}
    
    >
      <Tab.Screen
        name="S"
        component={RecommendationsScreen}
        initialParams={{ user }} // Pass 'user' to HoroscopeScreen
        options={{
          headerShown: false,
         /*  tabBarLabel: "", // Esto ocultará el nombre en la pestaña */
        }}
      />
      <Tab.Screen
        name="M"
        component={MoviesScreen}
        initialParams={{ user }} // Pass 'user' to HoroscopeScreen
        options={{
          headerShown: false,
         /*  tabBarLabel: "", // Esto ocultará el nombre en la pestaña */
        }}
      />
    </Tab.Navigator>
  );
}
