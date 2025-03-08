import { auth, app } from './config.js'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; 

const db = getFirestore(app);

document.getElementById('signin-form').addEventListener('submit', async (e) => {
    e.preventDefault();


    const email = document.getElementById('signEmail').value;
    const password = document.getElementById('signPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User Signed In:", userCredential.user);
        alert("Logged In Successfully!");

        window.location.href = "profile.html";  
    } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
    }
});

