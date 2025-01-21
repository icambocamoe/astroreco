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

import { LanguageContext } from "../context/LanguageContext.js";
import { HoroscopeContext } from "../context/HoroscopeContext.js";

import Languages from "../lang/Languages.json";
import { LoadingIndicator } from "../components/LoadingIndicator.js";
import { TextComponent } from "../components/TextComponent.js";

export default function HoroscopeScreen({ route }) {
  const { horoscope } = useContext(HoroscopeContext);
  const { user } = route.params;


  const contextLang = useContext(LanguageContext);
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
          ]} >
  
          <TextComponent text={t("horoscope.title")} bold={true} typeText={"header"} align={"center"} />
          <TextComponent text={`${horoscope.date}`} bold={true} typeText={"subheader"} />
          <TextComponent text={`${horoscope.horoscope}`} align={"justify"} />
          
        </View>
      </View>
    </ScrollView>
  );
}
