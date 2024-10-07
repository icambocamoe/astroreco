
// Import the Firebase modules
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, setPersistence, browserLocalPersistence, getAuth, connectAuthEmulator } from 'firebase/auth'; // For authentication
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { ReactNativeAsyncStorage, AsyncStorage } from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLA4vnLFaVow25ylLUkb57NhmnN6qk1vE",
  authDomain: "fir-auth-65294.firebaseapp.com",
  projectId: "fir-auth-65294",
  storageBucket: "fir-auth-65294.appspot.com",
  messagingSenderId: "105428798939",
  appId: "1:105428798939:web:49a9375f32ea94d4dfebfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

// Conditionally initialize authentication based on platform
let auth;
if (Platform.OS !== 'web') {
  // Use react-native-specific persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  // For web, just use standard auth
  auth = getAuth(app);
}
const db = getFirestore(app);


const machineIP = "192.168.100.66"; // Replace with your machine's actual IP address

connectFirestoreEmulator(db, machineIP, 8080); // Firestore emulator
connectAuthEmulator(auth, `http://${machineIP}:9099`); // Auth emulator


export { auth, db };
