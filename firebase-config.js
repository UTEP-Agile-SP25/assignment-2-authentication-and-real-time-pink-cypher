// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoKUFf0VHoJp38kTiLhbGjc9KMTk0NtXs",
  authDomain: "assignment-1-87b8b.firebaseapp.com",
  projectId: "assignment-1-87b8b",
  storageBucket: "assignment-1-87b8b.firebasestorage.app",
  messagingSenderId: "1018778581611",
  appId: "1:1018778581611:web:85b997cc29f0f2d8b50f2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
