import { onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

// Ensure the user is signed in and display their info
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("userEmail").innerText = `Logged in as: ${user.email}`;
    } else {
        window.location.href = "index.html"; // Redirect if not logged in
    }
});

// Handle profile update
document.getElementById("profileForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newName = document.getElementById("displayName").value;

    try {
        // Update the display name in Firebase Authentication
        await updateProfile(auth.currentUser, { displayName: newName });

        // Update in Firestore
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            email: auth.currentUser.email,
            displayName: newName
        }, { merge: true });

        alert("Profile updated successfully! Please refresh the page.");
        console.log("Profile updated:", newName);
    } catch (error) {
        console.error("Profile update error:", error.message);
    }
});

// Handle Sign Out
document.getElementById("signoutButton")?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html"; // Redirect to login page
});