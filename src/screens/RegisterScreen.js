import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth
import { getDocs, doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig.js'; // Import your firebase configuration
import { stylesAppTheme } from '../theme/AppTheme.js';
import { dynamicStylesAppTheme } from '../theme/DynamicAppTheme.js';
import { ThemeContext } from '../context/ThemeContext.js';
import { TitleComponent } from '../components/TitleComponent.js';
import { ButtonComponent } from '../components/ButtonComponent.js';
import { LanguajeContext } from '../context/LanguageContext.js';
import Languages from "../lang/Languages.json";


export default function RegisterScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);
  
  const onSubmit = async (data) => {
    try {
      // Use Firebase Authentication to register a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.useremail, // Email from form
        data.password    // Password from form
      );
      //console.log(`User created successfully:'${userCredential.user.uid}`);
      const userUID = userCredential.user.uid;
      let docRef;  // Declare docRef in a wider scope
      // After user is created, save non-sensitive user data in Firestore
      try {
        //Storing user id reference in a document to userRefData collection
        docRef = await addDoc(collection(db, "userRefData"), {
          userIDRef: userUID,
          name: data.username,
          email: data.useremail,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

      } catch (err) {
        console.error(`Cannot store credentials: ${err.message}`);

        // If storing in Firestore fails, delete the newly created user
        if (userCredential && userCredential.user) {
          await userCredential.user.delete();
          console.log('User deleted due to Firestore error');
        }
        setError(`Cannot store credentials: ${err.message}, try again later.`);

        return; // Return early if there's an error storing credentials
      }

      // If registration is successful, navigate to Onboarding
      setSuccess('Registration successful! You can now complete onboarding.');
      navigation.navigate('Onboarding', { docRef }); // Pass docRef only
    } catch (err) {
      setError(`Registration failed: ${err.message}`); // Include the error message for better feedback
    }
  };

  const contextLang = useContext(LanguajeContext);
  const languageData = contextLang?.languageData;
  const currentLanguage = languageData?.language || "spanish";

  const t = (keyPath) => {
    return keyPath
      .split(".")
      .reduce((obj, key) => obj?.[key], Languages?.[currentLanguage]);
  };

  return (
    <ScrollView style={[stylesAppTheme.scrollViewStyle, dynamicStyles.dynamicScrollViewStyle]}>
    <View style={[stylesAppTheme.mainContainer, dynamicStyles.dynamicMainContainer]}>
      <TitleComponent />
      <View
          style={[stylesAppTheme.viewContainer, dynamicStyles.dynamicViewContainer]}
        >
      <View style={stylesAppTheme.logincontainer}>
        <Text style={[stylesAppTheme.screensName, dynamicStyles.dynamicText]}>{t("register.title")}</Text>

        {/* <Text style={styles.label}>Name</Text> */}
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={stylesAppTheme.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
              placeholder={t("register.name_input")} 
              placeholderTextColor="#888" 
            />
          )}
        />

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
              placeholder={t("register.email_input")} 
              placeholderTextColor="#888" 
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
              placeholder={t("register.password_input")} 
              placeholderTextColor="#888" 
            />
          )}
        />

        {/* <Button title="Register" onPress={handleSubmit(onSubmit)} /> */}
        <ButtonComponent title={t("register.button_text")} action={handleSubmit(onSubmit)} />

        {/* <TouchableOpacity
            style={stylesAppTheme.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={stylesAppTheme.buttonText}>register</Text>
          </TouchableOpacity> */}

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={stylesAppTheme.touchableLink}>
          <Text style={[stylesAppTheme.linkText, dynamicStyles.dynamicText, {/* backgroundColor: "red", */ width: 250, textAlign: 'center'}]}>
          {t("register.text_link")}
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
    </ScrollView>
    
  );

}

const styles = StyleSheet.create({

  screensName: {
    fontStyle: 'bold',
    alignSelf: 'center',
    fontSize: 24,
    paddingTop: 20,
    alignContent: 'center',
  },

 /*  label: {
    fontSize: 18,
    marginBottom: 8,
  }, */
  error: {
    color: 'red',
    marginTop: 10,
  },
  success: {
    color: 'green',
    marginTop: 10,
  },
});
