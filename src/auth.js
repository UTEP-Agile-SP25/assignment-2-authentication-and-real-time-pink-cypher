import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

onAuthStateChanged(auth, async (user) => {
    if(user){
        console.log("User is logged in:", user.email);
        await fetchUserData(user.uid);
        
    }else{
        console.log("User is logged out");
    }
})


async function fetchUserData(userID) {
    try {
        const userRef = doc(db, "users", userID); // ✅ Ref to the user's document
        const userSnap = await getDoc(userRef);   // ✅ Retrieve the document

        if (userSnap.exists()) {
            const userData = userSnap.data();
            console.log("✅ User data:", userData);

            if (!userData.firstname) {
                console.error("⚠️ 'firstname' field is missing in Firestore document.");
                return;
            }

            document.getElementById("greeting").innerHTML = `<h1>Welcome, ${userData.firstname}</h1>`;
        } else {
            console.error("❌ No user document found in Firestore for ID:", userID);
        }
    } catch (error) {
        console.error("🚨 Error fetching user data:", error);
    }
}

export async function signUp(firstName, lastName, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully:", userCredential.user.email);
        console.log("User ID:", userCredential.user.uid);

        const userRef = doc(db, "users", userCredential.user.uid);

        await setDoc(userRef,{
            firstname: firstName,
            lastname: lastName,
            timestamp: new Date()
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

export async function login(email, password){
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "profile_creation.html"

    }catch(error){
        console.error("Error logging in:", error);
    }
}

export async function logout(){
    try{
        await signOut(auth)
        console.log("User signed out successfully");
    }catch(error){
        console.error("Error logging out:", error);
    }
}