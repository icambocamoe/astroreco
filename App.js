import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigator/StackNavigator.js";
import { StatusBar } from "expo-status-bar";
import { ThemeContext, ThemeProvider } from "./src/context/ThemeContext.js";
import { UserContext, UserProvider } from "./src/context/UserContext.js";
import {
  LanguageContext,
  LanguageProvider,
} from "./src/context/LanguageContext.js";

export default function App() {
  return (
    <NavigationContainer>
      <LanguageProvider>
        <UserProvider>
          <ThemeProvider>
            <StatusBar style="dark" />
            <AppContent />
          </ThemeProvider>
        </UserProvider>
      </LanguageProvider>
    </NavigationContainer>
  );
}

const AppContent = () => {
  // Accede al contexto de tema y maneja el caso de que pueda ser undefined
  const context = useContext(ThemeContext);

  // Maneja el caso en que el contexto puede ser undefined
  if (!context) {
    return null; // O muestra una pantalla de carga si es necesario
  }

  const { themeData } = context;

  if (!themeData) {
    return null; // Si el tema aún no está disponible, puedes manejarlo aquí
  }

  // Determina el estilo de la StatusBar en función de si es un tema oscuro o claro
  const statusBarStyle = themeData.isDarkMode ? "light" : "dark";

  return (
    <>
      {/* Aplica themeData.fondo para cambiar el color de la StatusBar dinámicamente */}
      <StatusBar style={statusBarStyle} backgroundColor={themeData.fondo} />
      <StackNavigator />
    </>
  );
};
