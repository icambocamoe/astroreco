import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { TitleComponent } from "./TitleComponent";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import { stylesAppTheme } from "../theme/AppTheme";
import { ThemeContext } from "../context/ThemeContext";

export const LoadingIndicator = () => {
  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

  return (
    <View
      style={[
        dynamicStyles.dynamicScrollViewStyle,
        stylesAppTheme.scrollViewStyle,
        styles.fondo,
      ]}
    >
      <TitleComponent />
      <View style={{marginTop: 30}}>
        <ActivityIndicator size={60} color={themeData.texto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fondo: {
    height: "100%",
    paddingTop: 260,
  },
});
