import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

/* import { stylesAppTheme } from '../Theme/AppTheme'
import { dynamicStylesAppTheme } from '../Theme/DynamicAppTheme'
import { ThemeContext } from './ThemeContext' */
import LogoAstromedia from "../svg_components/astromedia_logo.svg";

import { stylesAppTheme } from "../theme/AppTheme";

export const ButtonComponent = ({ title, action }) => {
  /* const context = useContext(ThemeContext); // Obtiene el contexto
    const themeData = context?.themeData; // Obtiene themeData del contexto
  
    if (!themeData) {
      return null; // Puedes manejar la carga o estado por defecto aquí
    }
    // Genera los estilos dinámicos pasando themeData
    const dynamicStyles = dynamicStylesAppTheme(themeData);
 */
  return (
    <View /* style={[dynamicStyles.dynamicViewContainer, stylesAppTheme.viewContainer]} */
    >
      <View style={styles.logo}>
        {/*            <Text  style={[dynamicStyles.dynamicText, stylesAppTheme.titleScreen]} >{title}</Text> */}

        <TouchableOpacity
            style={stylesAppTheme.button}
            /* onPress={handleSubmit(onSubmit)} */
            onPress={action}
          >
            <Text style={stylesAppTheme.buttonText}>{title}</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
   /*  backgroundColor: "red", */
    /* height: 300, */
  },
});
