
// Import the Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth'; // For authentication
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";


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
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to Firebase Emulators
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080); // Firestore emulator
  //connectAuthEmulator(auth, "http://localhost:9099"); // Auth emulator
}

export { auth, db };
