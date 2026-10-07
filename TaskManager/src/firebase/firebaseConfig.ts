import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyCTaNGZaSEczIvKOHBoBWeGQ2Ti9gGhPtc",
  authDomain: "n322-class67.firebaseapp.com",
  projectId: "n322-class67",
  storageBucket: "n322-class67.firebasestorage.app",
  messagingSenderId: "210772866693",
  appId: "1:210772866693:web:078334833acb31f3a15bec",
  measurementId: "G-J787CVQNMP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);