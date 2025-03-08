// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getApps, setLogLevel } from "firebase/app";

setLogLevel('debug'); // Enables debug logging for Firebase
console.log("Initialized Firebase apps:", getApps());

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoKUFf0VHoJp38kTiLhbGjc9KMTk0NtXs",
  authDomain: "assignment-1-87b8b.firebaseapp.com",
  projectId: "assignment-1-87b8b",
  storageBucket: "assignment-1-87b8b.firebasestorage.app",
  messagingSenderId: "1018778581611",
  appId: "1:1018778581611:web:85b997cc29f0f2d8b50f2e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

