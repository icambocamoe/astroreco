import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext } from "react";
import SongsScreen from "../screens/SongsScreen.js";
import MoviesScreen from "../screens/MoviesScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeContext } from "../context/ThemeContext.js";
import BooksScreen from "../screens/BooksScreen.js";



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
        }  else if (route.name === "B") {
          iconName = focused ? "book" : "book-outline"; // Cambia el icono según si está enfocado o no
        } /*else if (route.name === "HomeScreen") {
          iconName = focused ? "home" : "home-outline"; // Cambia el icono según si está enfocado o no
        } */

        // Retorna el ícono correspondiente de Ionicons
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor:  themeData.texto  /* "black" */, // Cambia el color del ícono cuando la pestaña está activa
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { backgroundColor:  themeData.fondo  /* "white" */ },
      tabBarIndicatorStyle: {
        backgroundColor: themeData.texto, // Cambia el color de la línea debajo del icono
        height: 1, // Ajusta el grosor del indicador si es necesario
      },
    })}
    
    >
      <Tab.Screen
        name="S"
        component={SongsScreen}
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
      <Tab.Screen
        name="B"
        component={BooksScreen}
        initialParams={{ user }} // Pass 'user' to HoroscopeScreen
        options={{
          headerShown: false,
         /*  tabBarLabel: "", // Esto ocultará el nombre en la pestaña */
        }}
      />
    </Tab.Navigator>
  );
}
