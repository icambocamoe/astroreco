import React, { useContext, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { TitleComponent } from "../components/TitleComponent";
import { stylesAppTheme } from "../theme/AppTheme";
import { ThemeContext } from "../context/ThemeContext";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const HomeScreen = () => {
  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto
  const setThemeData = context?.setThemeData;

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);


/*   const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("themeColors");
      if (storedTheme) {
        return JSON.parse(storedTheme);
      }
      return null; // Si no hay tema guardado, devuelve null
    } catch (error) {
      console.error("Error loading theme:", error);
      return null;
    }
 }; */

 //const handleThemeChange = (themeName) => {
  //const newTheme = ColorPaletteTheme(themeName); // Obtén el tema basado en el nombre
  //setThemeData(newTheme); // Actualiza el contexto con el nuevo tema
  //setSelectedTheme(themeName); // Actualiza el picker
  //saveTheme(newTheme);
//};


  useEffect(() => {
    // Carga el tema al iniciar la app
    const loadStoredTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("themeColors");
      if (storedTheme) {
        //setTheme(JSON.parse(storedTheme));
        setThemeData(JSON.parse(storedTheme));
        console.log("Theme loaded!");
      }
    };
    loadStoredTheme();
  }, []);

  return (
    <ScrollView style={[stylesAppTheme.scrollViewStyle, dynamicStyles.dynamicScrollViewStyle]}>
      <View style={[stylesAppTheme.mainContainer, dynamicStyles.dynamicMainContainer]}>
        <TitleComponent />
        <View style={[stylesAppTheme.viewContainer, dynamicStyles.dynamicViewContainer]}>
        <Text style={[dynamicStyles.dynamicText]}>Home Screen</Text>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    padding: 50, // Combining padding from both containers
    backgroundColor: "#fff",
  },
};
