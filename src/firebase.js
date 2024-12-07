// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import getAuth for authentication
import { getFirestore } from 'firebase/firestore'; // Import getFirestore for Firestore
import { getStorage } from 'firebase/storage'; // Import getStorage for Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj3RBY47DTb8__SUPhwA8F7MQzdzMXBnk",
  authDomain: "pato4lorer.firebaseapp.com",
  projectId: "pato4lorer",
  storageBucket: "pato4lorer.firebasestorage.app",
  messagingSenderId: "234507461952",
  appId: "1:234507461952:web:2ba12936b59156138146a5",
  measurementId: "G-4ETFRSKFJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize authentication
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Firebase Storage

// Export the auth, db, and storage objects
export { auth, db, storage };
