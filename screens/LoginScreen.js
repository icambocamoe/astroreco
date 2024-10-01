import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth
import { auth } from '../firebase.js'; // Import your firebase configuration

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState('');

  // Updated onSubmit function with Firebase Authentication
  const onSubmit = async (data) => {
    try {
      // Use Firebase Authentication to sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.username, // Email/username from form
        data.password  // Password from form
      );

      // If login is successful, navigate to Home
      navigation.navigate('Home');
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/logos astromedia.jpg')}
          style={styles.image}
        />
      </View>


      <Text style={styles.label}>Username (Email)</Text>
      <Controller
        control={control}
        name="username"
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
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
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
