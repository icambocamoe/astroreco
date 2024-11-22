import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig.js"; // Import your firebase configuration
import { stylesAppTheme } from "../theme/AppTheme.js";
import { TitleComponent } from "../components/TitleComponent.js";
import { ButtonComponent } from "../components/ButtonComponent.js";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme.js";
import { ThemeContext } from "../context/ThemeContext.js";
import { LanguageContext } from "../context/LanguageContext.js";
import Languages from "../lang/Languages.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState("");

  // Updated onSubmit function with Firebase Authentication
  const onSubmit = async (data) => {
    try {
      // Set Firebase Authentication persistence to LOCAL
      //await setPersistence(auth, browserLocalPersistence); // Use LOCAL persistence

      // Use Firebase Authentication to sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.useremail, // Email/username from form
        data.password // Password from form
      );
      const user = userCredential.user.uid;
      //console.log(user);

      // If login is successful, navigate to Home
      navigation.navigate("Home", { user });
    } catch (err) {
      setError("Login failed. Check your credentials.");
      //fetchUserData(user.uid);
    }
  };

  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto
  const setThemeData = context?.setThemeData;

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }

  const contextLang = useContext(LanguageContext);
  const languageData = contextLang?.languageData;
  const currentLanguage = languageData?.language || "spanish";
  const setLanguageData = contextLang?.setLanguageData;

  const t = (keyPath) => {
    return keyPath
      .split(".")
      .reduce((obj, key) => obj?.[key], Languages?.[currentLanguage]);
  };

  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

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

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("appLanguage");

        if (storedLanguage) {
          setLanguageData({ language: storedLanguage }); // Corrige el estado del contexto
        }
      } catch (error) {
        console.error("Error loading language:", error);
      }
    };
    loadLanguage();
  }, []);



  return (
    <ScrollView
      style={[
        stylesAppTheme.scrollViewStyle,
        dynamicStyles.dynamicScrollViewStyle,
        { paddingTop: 90 },
      ]}
    >
      <View
        style={[
          stylesAppTheme.mainContainer,
          dynamicStyles.dynamicMainContainer,
        ]}
      >
        {/* <View style={stylesAppTheme.imagecontainer}> */}
        {/* <Text style={stylesAppTheme.imagelabel}>Astromedia</Text> */}
        <TitleComponent />
        {/* <Image
            source={require("../../assets/logos astromedia.jpg")}
            style={stylesAppTheme.image}
          /> */}
        {/* </View> */}
        <View
          style={[
            stylesAppTheme.viewContainer,
            dynamicStyles.dynamicViewContainer,
          ]}
        >
          <View style={stylesAppTheme.logincontainer}>
            <Text
              style={[stylesAppTheme.screensName, dynamicStyles.dynamicText]}
            >
              {t("login.title")}
            </Text>
            {/* <Text style={styles.label}>Email</Text> */}
            <Controller
              control={control}
              name="useremail"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    stylesAppTheme.input,
                    /* dynamicStyles.dynamicViewContainer, */ {
                      borderColor: themeData.texto,
                    },
                  ]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder={t("login.email_input")}
                  placeholderTextColor="#888" // (Opcional) Color del placeholder
                />
              )}
            />

            {/* <Text style={styles.label}>Password</Text> */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    stylesAppTheme.input,
                    /* dynamicStyles.dynamicViewContainer, */ {
                      borderColor: themeData.texto,
                    },
                  ]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  placeholder={t("login.password_input")}
                  placeholderTextColor="#888"
                />
              )}
            />

            <ButtonComponent
              title={t("login.button_text")}
              action={handleSubmit(onSubmit)}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={stylesAppTheme.touchableLink}
            >
              <Text
                style={[
                  stylesAppTheme.linkText,
                  dynamicStyles.dynamicText,
                  {
                    /* backgroundColor: "red", */ width: 260,
                    textAlign: "center",
                  },
                ]}
              >
                {t("login.text_link")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /* label: {
    fontSize: 18,
    marginBottom: 8,
  }, */

  error: {
    color: "red",
    marginTop: 10,
  },
});
