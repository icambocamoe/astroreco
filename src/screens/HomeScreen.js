import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { TitleComponent } from "../components/TitleComponent";
import { stylesAppTheme } from "../theme/AppTheme";
import { ThemeContext } from "../context/ThemeContext";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";

export const HomeScreen = () => {
  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

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
