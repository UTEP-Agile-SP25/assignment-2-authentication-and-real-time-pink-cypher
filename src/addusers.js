
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";
import { auth, app } from './config.js'; 

//this function adds the user's name to the top of the screen
const db = getFirestore(app)
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const fullName = `${userData.firstName} ${userData.lastName}`;
            
           
            document.getElementById("username").textContent = fullName;
        } else {
            console.log("No user data found in Firestore.");
        }
    } else {
        console.log("No user is logged in.");
        window.location.href = "index.html";
    }
});
