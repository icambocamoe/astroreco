import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth
import { auth } from '../firebase.js'; // Import your firebase configuration

export default function RegisterScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Updated onSubmit function with Firebase Authentication
  const onSubmit = async (data) => {
    try {
      // Use Firebase Authentication to register a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.username, // Email/username from form
        data.password  // Password from form
      );

      // If registration is successful, navigate to Home
      setSuccess('Registration successful! You can now log in.');
      navigation.navigate('Login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
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

      <Button title="Register" onPress={handleSubmit(onSubmit)} />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
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
  success: {
    color: 'green',
    marginTop: 10,
  },
});
