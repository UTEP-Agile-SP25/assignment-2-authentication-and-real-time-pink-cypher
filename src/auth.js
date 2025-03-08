import { auth, app } from './config.js'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; 

const db = getFirestore(app);

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User Created:", userCredential.user);
        alert("User Created Successfully!");


        await addUser(userCredential.user.uid, email, firstName, lastName);

        //change to profile.html after authentication
        window.location.href = "profile.html";  

    } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
    }
});

async function addUser(userId, userEmail, userFirstName, userLastName) {
    try {
        await setDoc(doc(db, "users", userId), {
            email: userEmail,
            firstName: userFirstName,  
            lastName: userLastName
        });

        console.log("User added to Firestore successfully.");
    } catch (e) {
        console.error("Error adding user to Firestore:", e);
    }
}
