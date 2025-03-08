import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

// Sign Up Function
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: "Anonymous"
        });

        console.log("User created:", user);

        // ✅ Ensure the redirect is inside the try block
        window.location.href = "profile.html"; 
    } catch (error) {
        console.error("Sign-up error:", error.message);
        alert("Error: " + error.message);
    }
});

// Sign In Function
document.getElementById("signinForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential.user);
    } catch (error) {
        console.error("Sign-in error:", error.message);
    }
});

// Sign Out Function
document.getElementById("signoutButton").addEventListener("click", async () => {
    await signOut(auth);
    console.log("User signed out");
    window.location.href = "index.html"; // Redirect to login page
});

// Profile Update
document.getElementById("profileForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newName = document.getElementById("displayName").value;

    try {
        await updateProfile(auth.currentUser, { displayName: newName });

        // Update in Firestore
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            email: auth.currentUser.email,
            displayName: newName
        }, { merge: true });

        console.log("Profile updated");
    } catch (error) {
        console.error("Profile update error:", error.message);
    }
});

// Maintain User Session
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is still signed in:", user.email);
    } else {
        console.log("No user signed in");
    }
});