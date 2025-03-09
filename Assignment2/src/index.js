import { signUp } from "./auth.js";

document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevents form from refreshing the page

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    console.log("Submitting form...");  // Debugging log
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
        await signUp(firstName, lastName, email, password);
        console.log("Sign-up function executed successfully.");
    } catch (error) {
        console.error("Error during sign-up:", error);
    }
});