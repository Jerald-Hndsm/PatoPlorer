// src/firebase.jsx

import { setPersistence, browserLocalPersistence } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// User API configuration
const userFirebaseConfig = {
  apiKey: process.env.REACT_APP_USER_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_USER_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_USER_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_USER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_USER_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_USER_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_USER_FIREBASE_DATABASE_URL,
};

// Admin API configuration
const adminFirebaseConfig = {
  apiKey: process.env.REACT_APP_ADMIN_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_ADMIN_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_ADMIN_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_ADMIN_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_ADMIN_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ADMIN_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_ADMIN_FIREBASE_DATABASE_URL,
};

// Publish API configuration
const publishFirebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLISH_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_PUBLISH_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PUBLISH_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUBLISH_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLISH_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PUBLISH_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_PUBLISH_FIREBASE_DATABASE_URL,
};

// Maintenance API configuration
const maintenanceFirebaseConfig = {
  apiKey: process.env.REACT_APP_MAINTENANCE_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_MAINTENANCE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_MAINTENANCE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_MAINTENANCE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_APP_MAINTENANCE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_MAINTENANCE_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MAINTENANCE_FIREBASE_MEASUREMENT_ID,
};

// Reports API configuration
const reportFirebaseConfig = {
  apiKey: process.env.REACT_APP_REPORT_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_REPORT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_REPORT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_REPORT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_REPORT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_REPORT_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_REPORT_FIREBASE_DATABASE_URL,
  measurementId: process.env.REACT_APP_REPORT_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase for user
const userApp = initializeApp(userFirebaseConfig, "userApp");

// Initialize Firebase for admin
const adminApp = initializeApp(adminFirebaseConfig, "adminApp");

// Initialize Firebase for publish
const publishApp = initializeApp(publishFirebaseConfig, "publishApp");

// Initialize Firebase for maintenance
const maintenanceApp = initializeApp(
  maintenanceFirebaseConfig,
  "maintenanceApp"
);

// Initialize Firebase for reports
const reportApp = initializeApp(reportFirebaseConfig, "reportApp");

// Initialize Firebase services for user
const userAuth = getAuth(userApp);
const userFirestore = getFirestore(userApp);
const userStorage = getStorage(userApp);
const userDatabase = getDatabase(userApp);

// Initialize Firebase services for admin
const adminAuth = getAuth(adminApp);
const adminFirestore = getFirestore(adminApp);
const adminStorage = getStorage(adminApp);
const adminDatabase = getDatabase(adminApp);

// Initialize Firebase services for publish
const publishAuth = getAuth(publishApp);
const publishFirestore = getFirestore(publishApp);
const publishStorage = getStorage(publishApp);
const publishDatabase = getDatabase(publishApp);

// Initialize Firebase services for maintenance
const maintenanceAuth = getAuth(maintenanceApp);
const maintenanceFirestore = getFirestore(maintenanceApp);
const maintenanceStorage = getStorage(maintenanceApp);
const maintenanceDatabase = getDatabase(maintenanceApp);

// Initialize Firebase services for reports
const reportAuth = getAuth(reportApp);
const reportFirestore = getFirestore(reportApp);
const reportStorage = getStorage(reportApp);
const reportDatabase = getDatabase(reportApp);
const reportAnalytics = getAnalytics(reportApp);

// Set persistence for userAuth
setPersistence(userAuth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence for userAuth:", error);
});

// Set persistence for adminAuth
setPersistence(adminAuth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence for adminAuth:", error);
});

// Set persistence for other auth instances if necessary
setPersistence(publishAuth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence for publishAuth:", error);
});

setPersistence(maintenanceAuth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence for maintenanceAuth:", error);
});

setPersistence(reportAuth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence for reportAuth:", error);
});

export {
  // Auth
  userAuth,
  adminAuth,
  publishAuth,
  maintenanceAuth,
  reportAuth,

  // Firestore
  userFirestore,
  adminFirestore,
  publishFirestore,
  maintenanceFirestore,
  reportFirestore,

  // Storage
  userStorage,
  adminStorage,
  publishStorage,
  maintenanceStorage,
  reportStorage,

  // Database
  userDatabase,
  adminDatabase,
  publishDatabase,
  maintenanceDatabase,
  reportDatabase,

  // Analytics
  reportAnalytics,
};
export default userApp;