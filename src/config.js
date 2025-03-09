// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqxW7Yps4DdS1EjqvuC9m1XGmtiqOC9nY",
    authDomain: "garcia-sandbox-14376.firebaseapp.com",
    projectId: "garcia-sandbox-14376",
    storageBucket: "garcia-sandbox-14376.firebasestorage.app",
    messagingSenderId: "795807001862",
    appId: "1:795807001862:web:93d5267f12a27f2b180287"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;