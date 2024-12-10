// firebase.js

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Firebase config - You can replace this with environment variables for better security
const firebaseConfig = {
  apiKey: "AIzaSyD_oq7xt8hIQrvcLImexf2kl-MU5GbNglo",
  authDomain: "gsi-startups.firebaseapp.com",
  projectId: "gsi-startups",
  storageBucket: "gsi-startups.firebasestorage.app",
  messagingSenderId: "305171034739",
  appId: "1:305171034739:web:a2759ade0d15674fa07006",
  measurementId: "G-YGJ28GHGSP",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get Firebase Auth and Firestore
const auth = getAuth(app)
const db = getFirestore(app)

// Function to check Firestore initialization and handle errors
const checkFirestoreInitialization = () => {
  try {
    // Checking Firestore initialization (optional step)
    console.log("Firestore initialized", db)
  } catch (error) {
    console.error("Error initializing Firestore:", error)
  }
}

checkFirestoreInitialization()

export { auth, db }
