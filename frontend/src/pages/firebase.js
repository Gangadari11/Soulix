// firebase.js - Create this file in your src folder
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyABnTDOC-waNjptG-cnCYLfe9-Be-mEMQI",
  authDomain: "mindbloom-385f2.firebaseapp.com",
  projectId: "mindbloom-385f2",
  storageBucket: "mindbloom-385f2.firebasestorage.app",
  messagingSenderId: "739339184112",
  appId: "1:739339184112:web:b1ac87d4be568c4cc69f35",
  measurementId: "G-D1E786JV6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;