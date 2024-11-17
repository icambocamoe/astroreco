import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import RecommendationsScreen from "../screens/RecommendationsScreen";
import MoviesScreen from "../screens/MoviesScreen";


const Tab = createMaterialTopTabNavigator();

export function MaterialTopTabNavigator({ route }) {
  const { user } = route.params; // Ajuste correcto
  return (
    <Tab.Navigator style={{marginTop:40}}>
      <Tab.Screen
        name="S"
        component={RecommendationsScreen}
        initialParams={{ user }} // Pass 'user' to HoroscopeScreen
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="M"
        component={MoviesScreen}
        initialParams={{ user }} // Pass 'user' to HoroscopeScreen
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
