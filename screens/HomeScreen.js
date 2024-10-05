import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebaseConfig.js'; // Import Firebase auth
import { signOut } from 'firebase/auth'; // Import Firebase signOut method
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 

export default function HomeScreen({ navigation, route }) {
  const { user } = route.params;
  useEffect(() => {
    const queryUserRefData = async () => {
      try {
        // Reference to the userRefData collection
        const userRefCollection = collection(db, "userRefData");

        // Create a query to filter by userIDRef
        const q = query(userRefCollection, where("userIDRef", "==", user));
        try {
          // Execute the query
          const querySnapshot = await getDocs(q);

          // Iterate through the results
          querySnapshot.forEach((doc) => {
            console.log(`Document ID: ${doc.id}, Data: `, doc.data());
          });

        } catch (error) {
          console.error("Error fetching user reference data: ", error);
        }
      } catch (err) {
        console.error("Error fetching document: ", error);
      }

    };
    // Calling the function when the screen is loaded
    queryUserRefData();
  }, [])

  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Firebase sign out
      // After signing out, navigate back to the Login screen
      navigation.replace('Login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Astromedia!</Text>

      <Image
        source={require('../assets/logos astromedia.jpg')} // Replace with your own image
        style={styles.image}
      />

      <Text style={styles.text}>
        Get personalized media recommendations based on your astrological profile and horoscope.
      </Text>

      <Button
        title="View Horoscope"
        onPress={() => {
          navigation.navigate('Horoscope');
        }}
      />

      <Button
        title="Get Recommendations"
        onPress={() => {
          navigation.navigate('Recommendations');
        }}
      />

      <Button
        title="Sign Out"
        onPress={handleSignOut} // Call the sign out function
        color="red" // Optional: change button color for sign out
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
