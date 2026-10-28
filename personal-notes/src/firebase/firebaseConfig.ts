import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace every placeholder below with the values from YOUR OWN
// Firebase project (Firebase Console > Project settings > Your apps > Web app).
// Do not use another project's configuration.
const firebaseConfig = {
  apiKey: "AIzaSyCTaNGZaSEczIvKOHBoBWeGQ2Ti9gGhPtc",

  authDomain: "n322-class67.firebaseapp.com",

  projectId: "n322-class67",

  storageBucket: "n322-class67.firebasestorage.app",

  messagingSenderId: "210772866693",

  appId: "1:210772866693:web:02b0fdfb6289066aa15bec",

  measurementId: "G-SJLV2ZCFH1",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
