// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication
import { getAnalytics } from "firebase/analytics"; // Optional, if you want to use analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj3RBY47DTb8__SUPhwA8F7MQzdzMXBnk",
  authDomain: "pato4lorer.firebaseapp.com",
  projectId: "pato4lorer",
  storageBucket: "pato4lorer.appspot.com",
  messagingSenderId: "234507461952",
  appId: "1:234507461952:web:2ba12936b59156138146a5",
  measurementId: "G-4ETFRSKFJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional, if you want to use analytics
const auth = getAuth(app); // Initialize authentication

// Export the auth object
export { auth };