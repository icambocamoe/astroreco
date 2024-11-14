import React, { useState, useContext } from "react";
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

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

  return (
    <ScrollView
      style={[stylesAppTheme.scrollViewStyle, dynamicStyles.dynamicScrollViewStyle]}
    >
      <View style={[stylesAppTheme.mainContainer, dynamicStyles.dynamicMainContainer, {paddingTop: 90}]}>
        {/* <View style={stylesAppTheme.imagecontainer}> */}
          {/* <Text style={stylesAppTheme.imagelabel}>Astromedia</Text> */}
          <TitleComponent />
          {/* <Image
            source={require("../../assets/logos astromedia.jpg")}
            style={stylesAppTheme.image}
          /> */}
        {/* </View> */}
        <View
          style={[stylesAppTheme.viewContainer, dynamicStyles.dynamicViewContainer]}
        >
          <View style={stylesAppTheme.logincontainer}>
            <Text style={stylesAppTheme.screensName}>Show it's yourself!</Text>
            {/* <Text style={styles.label}>Email</Text> */}
            <Controller
              control={control}
              name="useremail"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={stylesAppTheme.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="Email"
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
                  style={stylesAppTheme.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  placeholder="Password"
                  placeholderTextColor="#888"
                />
              )}
            />

            <ButtonComponent title={"login"} action={handleSubmit(onSubmit)} />

            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={stylesAppTheme.touchableLink}
            >
              <Text style={stylesAppTheme.linkText}>
                Don't have an account? Register
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
