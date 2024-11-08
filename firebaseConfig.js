// Import the required Firebase modules and platform
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4IhQHYFAmpsHkXpJrd9bHc13mTA3tfAI",
  authDomain: "astromedia-modular.firebaseapp.com",
  projectId: "astromedia-modular",
  storageBucket: "astromedia-modular.appspot.com",
  messagingSenderId: "128503393727",
  appId: "1:128503393727:web:9bc7dc018d9e2287e5c50a"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Authentication with persistence for React Native
let auth;
let user;
if (Platform.OS === 'web') {
  auth = getAuth(app);
  // Set the persistence mode for the auth session
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      // Now you can sign in a user and the session will be remembered even after a page refresh
      console.log('Persistence set to local storage');
    })
    .catch((error) => {
      // Handle Errors here.
      console.error('Error setting persistence:', error);
    });
 
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

}

// Initialize Firestore
const db = getFirestore(app);

// Uncomment the following lines to use Firebase emulators (for development only)
// const machineIP = "192.168.100.66"; // Replace with your IP
// connectFirestoreEmulator(db, machineIP, 8080);
// connectAuthEmulator(auth, `http://${machineIP}:9099`);

export { auth, db };
