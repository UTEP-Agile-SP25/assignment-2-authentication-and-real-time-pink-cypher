// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl3t2f4Kj6calWk5s2JxaO_H9Z75ZGAh0",
  authDomain: "assingment2-af58c.firebaseapp.com",
  projectId: "assingment2-af58c",
  storageBucket: "assingment2-af58c.firebasestorage.app",
  messagingSenderId: "612465170115",
  appId: "1:612465170115:web:271e638ab4466ba3133476",
  measurementId: "G-BEJE9DRXS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app