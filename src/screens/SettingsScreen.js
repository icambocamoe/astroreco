import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TitleComponent } from "../components/TitleComponent";
import RNPickerSelect from "react-native-picker-select";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import { stylesAppTheme } from "../theme/AppTheme";
import { ThemeContext } from "../context/ThemeContext";
import {
  deleteUser,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth"; // Import Firebase signOut method
import { auth, db } from "../../firebaseConfig.js"; // Import Firebase auth
import { ButtonComponent } from "../components/ButtonComponent.js";
import { ColorPaletteTheme } from "../theme/ColorPaletteTheme.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LanguageContext } from "../context/LanguageContext.js";
import Languages from "../lang/Languages.json";
import { Alert } from "react-native";

export const SettingsScreen = ({ navigation, route }) => {
  const [temaClaro, setTemaClaro] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("claro00"); // Estado para el tema seleccionado en el picker
  const [selectedLanguage, setSelectedLanguage] = useState("english"); // Estado para el tema seleccionado en el picker

  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto
  const setThemeData = context?.setThemeData;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const contextLang = useContext(LanguageContext); // Obtiene el contexto
  const languageData = contextLang?.languageData;
  const setLanguageData = contextLang?.setLanguageData;

  const currentLanguage = languageData?.language || "spanish";

  const t = (keyPath) => {
    return keyPath
      .split(".")
      .reduce((obj, key) => obj?.[key], Languages?.[currentLanguage]);
  };

  const handleEditAccount = async () =>{
    
  }
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Firebase sign out
      // After signing out, navigate back to the Login screen
      navigation.replace("Login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.error("No user is currently signed in.");
        return;
      }

      // Re-authenticate the user before account deletion
      const credential = EmailAuthProvider.credential(
        auth,
        user.email,
        "user_password_here" // Replace with the user's password
      );
      await reauthenticateWithCredential(user, credential);

      // Delete the user
      await deleteUser(user);

      // Provide feedback and navigate to the Login screen
      Alert.alert("Account deleted successfully");
      navigation.replace("Login");
    } catch (error) {
      console.error("Error deleting user: ", error);

      // Handle specific errors
      if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Reauthentication Required",
          "Please log in again to delete your account."
        );
      } else {
        Alert.alert("Error", "An error occurred while deleting your account.");
      }
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
  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log("User signed out!");
      // Redirect the user or update your UI as needed
    } catch (error) {
      console.error("Error signing out: ", error);
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

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Carga el tema guardado
        const savedTheme = await AsyncStorage.getItem("themeColors");
        if (savedTheme) {
          const parsedTheme = JSON.parse(savedTheme);
          setThemeData(parsedTheme);
          setSelectedTheme(parsedTheme.name || "claro00"); // Asegúrate de usar el nombre del tema
        }

        // Carga el idioma guardado
        const savedLanguage = await AsyncStorage.getItem("appLanguage");
        if (savedLanguage) {
          setLanguageData({ language: savedLanguage });
          setSelectedLanguage(savedLanguage);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    loadSettings();
  }, [setThemeData, setLanguageData]);

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
          <Text style={[dynamicStyles.dynamicText, styles.textScreen]}>
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
          <Text style={[dynamicStyles.dynamicText, styles.textScreen]}>
            {t("settings.language_label")}
          </Text>
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
              /* { label: "Japanese", value: "japanese" },
              { label: "Chinese", value: "chinese" }, */
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
            action={handleSignOut}
          />
          <Text></Text>
          <ButtonComponent
            title={"Delete account"}
            //action={handleDeleteAccount}
            action={() => setIsModalVisible(true)} // Mostrar el modal
          />

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>{t("settings.modal_text")}</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.confirmButton]}
                    onPress={() => {
                      setIsModalVisible(false);
                      handleDeleteAccount();
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {t("settings.modal_confirm")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>
                      {t("settings.modal_cancel")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

           <ButtonComponent
            title={"Editar datos"}
            action={handleEditAccount}
          />

        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo translúcido
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "red",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  textScreen: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
