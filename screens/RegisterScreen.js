import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth
import { getDocs, doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../firebaseConfig.js'; // Import your firebase configuration

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
      console.log(`User created successfully:'${userCredential.user.uid}`);
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
          updatedAt:serverTimestamp(),
        });
        
        /*
        // Getting ref of collection
        const usersCollection = collection(db, 'userRefData');
        // Fetch the documents from the collection
        const usersSnapshot = await getDocs(usersCollection);
        // Extract data from each document
        const usersList = usersSnapshot.docs.map(doc => doc.data().userIDRef);
        console.log(`Userlist: ${usersList}`);  // Output the list of users
         */
      } catch (err) {
        setError(`Cannot store credentials: ${err.message}`);
        return; // Return early if there's an error storing credentials
      }

      // If registration is successful, navigate to Onboarding
      setSuccess('Registration successful! You can now complete onboarding.');
      navigation.navigate('Onboarding', {docRef}); // Pass username only
    } catch (err) {
      setError(`Registration failed: ${err.message}`); // Include the error message for better feedback
    }
  };

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
        <Text style={styles.imagelabel}>Register to get your cosmic content!</Text>

        <Text style={styles.label}>Name</Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
            />
          )}
        />

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

        <Button title="Register" onPress={handleSubmit(onSubmit)} />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline', paddingTop: 20 }}>
            Already have an account? Login
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
  image: {
    alignSelf: 'center',  // This will center the image horizontally
    width: 200,
    height: 200,
  },
  screensName: {
    fontStyle: 'bold',
    alignSelf: 'center',
    fontSize: 24,
    paddingTop: 20
  },
  imagelabel: {
    fontStyle: 'bold',
    alignSelf: 'center',
    fontSize: 24,
    marginBottom: 8,
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
  success: {
    color: 'green',
    marginTop: 10,
  },
});
