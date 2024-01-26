// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_A,
  authDomain:import.meta.env.VITE_B,
  projectId: import.meta.env.VITE_C,
  storageBucket: import.meta.env.VITE_D,
  messagingSenderId: import.meta.env.VITE_F,
  appId: import.meta.env.VITE_E
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;