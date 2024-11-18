// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import getAuth for authentication
import { getFirestore } from 'firebase/firestore'; // Import getFirestore for Firestore
import { getAnalytics } from 'firebase/analytics'; // Optional, if you want to use analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBj3RBY47DTb8__SUPhwA8F7MQzdzMXBnk',             // Replace with your actual API key
  authDomain: 'pato4lorer.firebaseapp.com',     // Replace with your auth domain
  projectId: 'pato4lorer',       // Replace with your project ID
  storageBucket: 'pato4lorer.appspot.com', // Replace with your storage bucket
  messagingSenderId: '234507461952', // Replace with your messaging sender ID
  appId: '1:234507461952:web:2ba12936b59156138146a5',               // Replace with your app ID
  measurementId: 'G-4ETFRSKFJK', // Replace with your measurement ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional, if you want to use analytics
const auth = getAuth(app); // Initialize authentication
const db = getFirestore(app); // Initialize Firestore

// Export the auth and db objects
export { auth, db };
