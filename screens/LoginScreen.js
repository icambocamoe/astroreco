import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebaseConfig.js'; // Import your firebase configuration


export default function LoginScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState('');

  // Updated onSubmit function with Firebase Authentication
  const onSubmit = async (data) => {
    try {
      // Use Firebase Authentication to sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.useremail, // Email/username from form
        data.password  // Password from form
      );
      const user = userCredential.user.uid;
      console.log(user);
      // Now you can fetch or store user data in Firestore

      // After successful authentication, store non-sensitive user data in Firestore
     /* await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: data.username, // Example additional data from form
        createdAt: new Date() // Example timestamp
      });*/
      //await fetchUserData(user.uid);
      // If login is successful, navigate to Home
      navigation.navigate('Home',{user});
    } catch (err) {
      setError('Login failed. Check your credentials.');
      //fetchUserData(user.uid);
    }
  };

  // Function to fetch user data
  /* const fetchUserData = async (uid) => {
     try {
       console.log("Firestore database instance:", db);
       console.log("User document path:", doc(db, "users", uid));
       const userDocRef = doc(db, "users", uid);  // Get reference to document
       console.log("User document path:", userDocRef.path);  // Logs the path of the document
       const userDocSnap = await getDoc(userDocRef);  // Fetch document snapshot
       // Log the result to see if userDocSnap is valid
       console.log(userDocSnap);
 
       // Check if the document exists
       if (userDocSnap.exists()) {
         console.log("User data:", userDocSnap.data());
       } else {
         console.log("No user data found!");
       }
     } catch (error) {
       console.error("Error fetching user data:", error);
     }
   };*/
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Text style={styles.imagelabel}>Astromedia</Text>
        <Image
          source={require('../assets/logos astromedia.jpg')}
          style={styles.image}
        />
      </View>


      <View style={styles.logincontainer}>

        <Text style={styles.screensName}>Show it's yourself!</Text>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="useremail"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />

        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />

        <Button title="Login" onPress={handleSubmit(onSubmit)} />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline', paddingTop: 20 }}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  imagecontainer: {
    paddingTop: 50,
  },
  logincontainer: {
    paddingTop: 100,
  },
  screensName: {
    fontStyle: 'bold',
    alignSelf: 'center',
    fontSize: 36,
    marginBottom: 20,
  },
  image: {
    alignSelf: 'center',  // This will center the image horizontally
    width: 200,
    height: 200,
  },
  imagelabel: {
    fontStyle: 'bold',
    alignSelf: 'center',
    fontSize: 48,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
