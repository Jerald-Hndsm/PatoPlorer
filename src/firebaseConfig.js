// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPQjhHPTitIOKlJVOxcgOH4zl89Nlbc6Q",
  authDomain: "patoplorer-9acba.firebaseapp.com",
  projectId: "patoplorer-9acba",
  storageBucket: "patoplorer-9acba.appspot.com",
  messagingSenderId: "729081081943",
  appId: "1:729081081943:web:1b2dfd48c84945eb65f312",
  measurementId: "G-6W5DG7B3KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
export {auth};
