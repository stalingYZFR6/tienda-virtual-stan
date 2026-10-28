// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5NmSn1Uuz3Ny_sQzjphccqIoGQQ93FYc",
  authDomain: "tiendavirtual-ffba3.firebaseapp.com",
  projectId: "tiendavirtual-ffba3",
  storageBucket: "tiendavirtual-ffba3.firebasestorage.app",
  messagingSenderId: "471638311650",
  appId: "1:471638311650:web:7d35b47bf0d48fc44194bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);