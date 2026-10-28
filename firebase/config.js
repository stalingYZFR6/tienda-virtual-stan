// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARZ_JliN4Err5XZ-MT9GJgSTqLlqFT3wA",
  authDomain: "tiendavirtual01-37586.firebaseapp.com",
  projectId: "tiendavirtual01-37586",
  storageBucket: "tiendavirtual01-37586.firebasestorage.app",
  messagingSenderId: "531805503131",
  appId: "1:531805503131:web:98ff943d14fa8a1f8a503e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);