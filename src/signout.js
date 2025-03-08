import { auth, app } from './config.js'; 
import { signOut} from "firebase/auth";
document.getElementById('logout').addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        await signOut(auth);
        console.log("Signed out successfully!");
        alert("Logged Out Successfully!");

        window.location.href = "profile.html";  
    } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
    }
});

