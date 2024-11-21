import React, { useContext, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { TitleComponent } from "../components/TitleComponent";
import RNPickerSelect from "react-native-picker-select";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import { stylesAppTheme } from "../theme/AppTheme";
import { ThemeContext } from "../context/ThemeContext";
import { signOut } from "firebase/auth"; // Import Firebase signOut method
import { auth, db } from "../../firebaseConfig.js"; // Import Firebase auth
import { ButtonComponent } from "../components/ButtonComponent.js";
import { ColorPaletteTheme } from "../theme/ColorPaletteTheme.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LanguajeContext } from "../context/LanguageContext.js";
import Languages from "../lang/Languages.json";

export const SettingsScreen = ({ navigation, route }) => {
  const [temaClaro, setTemaClaro] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("claro00"); // Estado para el tema seleccionado en el picker
  const [selectedLanguage, setSelectedLanguage] = useState("english"); // Estado para el tema seleccionado en el picker

  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto
  const setThemeData = context?.setThemeData;

  const contextLang = useContext(LanguajeContext); // Obtiene el contexto
  const languageData = contextLang?.languajeData;
  const setLanguageData = contextLang?.setLanguajeData;

  const currentLanguage = languageData?.language || "spanish";

  const t = (keyPath) => {
    return keyPath
      .split(".")
      .reduce((obj, key) => obj?.[key], Languages?.[currentLanguage]);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Firebase sign out
      // After signing out, navigate back to the Login screen
      navigation.replace("Login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!themeData || !setThemeData) {
    return null;
  }

  const handleThemeChange = (themeName) => {
    const newTheme = ColorPaletteTheme(themeName); // Obtén el tema basado en el nombre
    setThemeData(newTheme); // Actualiza el contexto con el nuevo tema
    setSelectedTheme(themeName); // Actualiza el picker
    saveTheme(newTheme);
  };

  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

  const saveTheme = async (theme) => {
    try {
      await AsyncStorage.setItem("themeColors", JSON.stringify(theme));
      console.log("Theme saved!");
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const saveLanguage = async (language) => {
    try {
      await AsyncStorage.setItem("appLanguage", language); // Guarda como string simple
      console.log("Language saved!");
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

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
          <Text style={dynamicStyles.dynamicText}>
            {t("settings.language_label")}aa
          </Text>
          <Text style={dynamicStyles.dynamicText}>
            {t("settings.theme_label")}{" "}
          </Text>

          <RNPickerSelect
            placeholder={{
              label: "Selecciona un estado...",
              value: null, // Esto asegura que no se seleccione ninguna opción inicialmente
              color: themeData.texto,
            }}
            onValueChange={handleThemeChange} // Cambia el tema
            value={selectedTheme} // El valor actual del picker
            items={[
              { label: "Light Clásico", value: "claro00" },
              { label: "Light Coralina del Amanecer", value: "claro01" },
              { label: "Light Pasión Eterna", value: "claro02" },
              { label: "Light Futuro Brillante", value: "claro03" },
              { label: "Light Magia Celestial", value: "claro04" },
              { label: "Light Destello Solar", value: "claro05" },
              { label: "Light Tormenta Eterna", value: "claro06" },
              { label: "Light Acero de los Titanes", value: "claro07" },
              { label: "Light Vida Eterna", value: "claro08" },
              { label: "Light Encanto Kawaii", value: "claro09" },
              { label: "Light Nostalgia Épica", value: "claro10" },

              { label: "Dark Clásico", value: "oscuro00" },
              { label: "Dark Sombras Cibernéticas", value: "oscuro01" }, // Tema: Eco Metálicos del Silencio
              { label: "Dark Cyberpunk, caos urbano", value: "oscuro02" }, // Tema: Sueños Cyberpunk de Neon
              { label: "Dark Cielo Nocturno del Caos", value: "oscuro03" }, // Tema: Noche Estrellada del Enigma
              { label: "Dark Luz del Abismo Esmeralda", value: "oscuro04" }, // Tema: Luz del Abismo Verde
              { label: "Dark Elegancia Sombría", value: "oscuro05" }, // Tema: Elegancia Sombría
              { label: "Dark Aguas Abisales", value: "oscuro06" }, // Tema: Aguas Misteriosas
              { label: "Dark Eclipse de Destrucción", value: "oscuro07" }, // Tema: Eclipse de Pasión
              {
                label: "Dark Reino de los Espíritus Olvidados",
                value: "oscuro08",
              }, // Tema: Reino de los Espíritus
              { label: "Dark Fuego del Inframundo", value: "oscuro09" }, // Tema: Fuego del Inframundo
              {
                label: "Dark Cenizas de Ruinas Ancestrales",
                value: "oscuro10",
              }, // Tema: Cenizas de la Ruina
            ]}
            style={{
              inputAndroid: {
                color: themeData.texto,
                padding: 10,
                fontSize: 20,
              },
              placeholder: {
                color: themeData.texto, // Color del placeholder
              },
            }}
          />

          <RNPickerSelect
            placeholder={{
              label: "Selecciona un idioma...",
              value: null, // Esto asegura que no se seleccione ninguna opción inicialmente
              color: themeData.texto,
            }}
            onValueChange={(value) => {
              if (value) {
                setSelectedLanguage(value);
                saveLanguage(value);
              }
            }}
            value={selectedLanguage} // El valor actual del picker
            items={[
              //{ label: "Light Clásico", value: "claro00" },
              { label: "Spanish", value: "spanish" },
              { label: "English", value: "english" },
              { label: "Japanese", value: "japanese" },
              { label: "Chinese", value: "chinese" },
            ]}
            style={{
              inputAndroid: {
                color: themeData.texto,
                padding: 10,
                fontSize: 20,
              },
              placeholder: {
                color: themeData.texto, // Color del placeholder
              },
            }}
          />

          {/* <Button
            title="Sign Out"
            onPress={() => {
              // Call your sign out function or navigate to login
              navigation.replace("Login");
            }}
            color="red"
          /> */}
          <ButtonComponent
            title={t("settings.button_sign_out")}
            action={() => {
              navigation.replace("Login");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
