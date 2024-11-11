import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth
import { getDocs, doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig.js'; // Import your firebase configuration
import { stylesAppTheme } from '../theme/AppTheme.js';


export default function RegisterScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
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

  return (
    <ScrollView>
    <View style={stylesAppTheme.container}>
      <View style={stylesAppTheme.imagecontainer}>
        <Text style={stylesAppTheme.imagelabel}>Astromedia</Text>
        <Image
          source={require('../../assets/logos astromedia.jpg')}
          style={stylesAppTheme.image}
        />
      </View>
      <View style={stylesAppTheme.logincontainer}>
        <Text style={stylesAppTheme.screensName}>Register to get your cosmic content!</Text>

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
              placeholder="Name" 
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
              placeholder="Email" 
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
              placeholder="Password" 
              placeholderTextColor="#888" 
            />
          )}
        />

        {/* <Button title="Register" onPress={handleSubmit(onSubmit)} /> */}

        <TouchableOpacity
            style={stylesAppTheme.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={stylesAppTheme.buttonText}>register</Text>
          </TouchableOpacity>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={stylesAppTheme.touchableLink}>
          <Text style={stylesAppTheme.linkText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
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
    paddingTop: 20
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
