// src/firebase.jsx

import { setPersistence, browserLocalPersistence } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";


// Initialize P4plorer
const adminFirebaseConfig = {
  apiKey: "AIzaSyBj3RBY47DTb8__SUPhwA8F7MQzdzMXBnk",
  authDomain: "pato4lorer.firebaseapp.com",
  projectId: "pato4lorer",
  storageBucket: "pato4lorer.firebasestorage.app",
  messagingSenderId: "234507461952",
  appId: "1:234507461952:web:2ba12936b59156138146a5",
  measurementId: "G-4ETFRSKFJK",
  databaseURL: "https://pato4lorer-default-rtdb.firebaseio.com"
};

// Initialize Patoplorer Inventory
const userFirebaseConfig = {
  apiKey: "AIzaSyCVkylgXltZ-K_y-fh4vNeo0Sx1TFD6k9o",
  authDomain: "patoplorer---inventory.firebaseapp.com",
  projectId: "patoplorer---inventory",
  storageBucket: "patoplorer---inventory.firebasestorage.app",
  messagingSenderId: "1007297575551",
  appId: "1:1007297575551:web:786706cd3c45b6d4855d4a",
  measurementId: "G-9Y81Q2GKF6",
  databaseURL: "https://patoplorer---inventory-default-rtdb.firebaseio.com"
};

// Initialize Firebase for user
const userApp = initializeApp(userFirebaseConfig, "userApp");

// Initialize Firebase for admin
const defaultApp = initializeApp(adminFirebaseConfig);

// Initialize Firebase services for admin
const adminAuth = getAuth(defaultApp);
const adminFirestore = getFirestore(defaultApp);
const adminStorage = getStorage(defaultApp);
const adminDatabase = getDatabase(defaultApp);
const adminAnalytics = getAnalytics(defaultApp);

// Initialize Firebase services for user
const userAuth = getAuth(userApp);
const userFirestore = getFirestore(userApp);
const userStorage = getStorage(userApp);
const userDatabase = getDatabase(userApp);
const userAnalytics = getAnalytics(userApp);

// Set persistence for userAuth
setPersistence(userAuth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence for userAuth:", error);
});

// Set persistence for adminAuth
setPersistence(adminAuth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence for adminAuth:", error);
});

// Export the auth, db, and storage objects
export { 
  // Auth
  userAuth,
  adminAuth,

  // Firestore
  userFirestore,
  adminFirestore,

  // Storage
  userStorage,
  adminStorage,

  // Database
  userDatabase,
  adminDatabase,

  // Analytics
  userAnalytics,
  adminAnalytics,
};