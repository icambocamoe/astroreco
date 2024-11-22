import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Linking,
  StyleSheet,
  ScrollView,
} from "react-native";

import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import { stylesAppTheme } from "../theme/AppTheme";
import { TitleComponent } from "../components/TitleComponent.js";
import { ThemeContext } from "../context/ThemeContext.js";
import { HoroscopeContext } from "../context/HoroscopeContext.js";

import { LanguajeContext } from "../context/LanguageContext.js";
import Languages from "../lang/Languages.json";
import { LoadingIndicator } from "../components/LoadingIndicator.js";

export default function HoroscopeScreen({ route }) {
  const { horoscope } = useContext(HoroscopeContext);
  const { user } = route.params;


  const contextLang = useContext(LanguajeContext);
  const languageData = contextLang?.languageData;
  const currentLanguage = languageData?.language || "spanish";

  const [loading, setLoading] = useState(false);

  if (loading)
    return <LoadingIndicator />

  const t = (keyPath) => {
    return keyPath
      .split(".")
      .reduce((obj, key) => obj?.[key], Languages?.[currentLanguage]);
  };



  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

  return (
    <ScrollView
      style={[
        dynamicStyles.dynamicScrollViewStyle,
        stylesAppTheme.scrollViewStyle,
      ]}
    >
      <View
        style={[
          dynamicStyles.dynamicMainContainer,
          stylesAppTheme.mainContainer,
        ]}
      >
        <TitleComponent />

        <View
          style={[
            dynamicStyles.dynamicViewContainer,
            stylesAppTheme.viewContainer,
          ]}
        >
          <Text style={[styles.title, dynamicStyles.dynamicText]}>
            {t("horoscope.title")}
          </Text>
          <Text style={[styles.date, dynamicStyles.dynamicText, styles.text]}>
            {horoscope.date}
          </Text>
          <Text
            style={[styles.horoscope, dynamicStyles.dynamicText, styles.text]}
          >
            {horoscope.horoscope}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    //textAlign: "justify",
  },
  date: {
    fontWeight: "bold",

  }
});
