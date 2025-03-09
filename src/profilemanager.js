import { signUp, logout, login, onAuthStateChanged } from "./auth";
import { updateDoc, deleteDoc, setDoc, doc, getDoc, getDocs, getFirestore, collection } from "firebase/firestore";
import { db } from "./config";

async function getSongs() {

    try {
        const songsCol = collection(db, "songs")

        const snapshot = await getDocs(songsCol);
        const songs = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}))

        console.log(songs)

        // Get reference to the table body
        const tableBody = document.querySelector("#songsTable tbody");
        // Clear previous rows
        tableBody.innerHTML = "";
        
        // Create a new row for each song
        songs.forEach(song => {
            const tr = document.createElement("tr");
            
            const titleTd = document.createElement("td");
            titleTd.textContent = song.title || "";
            
            const artistTd = document.createElement("td");
            artistTd.textContent = song.artist || "";
            
            const yearTd = document.createElement("td");
            yearTd.textContent = song.year || "";
            
            const ratingTd = document.createElement("td");
            ratingTd.textContent = song.rating || "";
            
            tr.appendChild(titleTd);
            tr.appendChild(artistTd);
            tr.appendChild(yearTd);
            tr.appendChild(ratingTd);
            
            tableBody.appendChild(tr);
        });
        

    }catch(error) {
        console.error('Error getting songs: ', error);
    }
}

const saveSong = async function() {
    const songTitle = document.getElementById("titleInput").value.trim()
    const songArtist = document.getElementById("artistInput").value.trim()
    const songYear = document.getElementById("yearInput").value.trim()
    const songRating = document.getElementById("ratingInput").value.trim()

    if (!songTitle || !songArtist || !songYear || !songRating) {
        alert("All fields are required!");
        return;
    }

    try {
        // this will be the new document ID
        const songRef = doc(db, "songs", songTitle.toLowerCase())

        // song ref is the first parameter to set doc id
        await setDoc(songRef, {
            title:songTitle,
            artist:songArtist,
            year:songYear,
            rating: songRating
        })

        alert("Good job! Your song was saved!")
        document.getElementById("titleInput").value = ""
        document.getElementById("artistInput").value = ""
        document.getElementById("yearInput").value = ""
        document.getElementById("ratingInput").value = ""


    } catch(error) {
        console.log("error saving song: ", error)
    }

}

const deleteSong = async function() {
    const songId = document.getElementById("deleteSongId").value.trim().toLowerCase();

    if(!songId) {
        alert("Song ID is required!");
        return;
    }

    try {
        const songRef = doc(db, "songs", songId);

        const songSnap = await getDoc(songRef);

        if (!songSnap.exists()) {
            alert("Error: Song ID not found.");
            return;
        }

        await deleteDoc(songRef);
        alert("Song deleted successfully!");

        document.getElementById("deleteSongId").value = "";
        getSongs();
    } catch(error) {
        console.error("Error deleting song: ", error)
    }
}

const updateRating = async function(){
    const songId = document.getElementById("updateSongId").value.trim().toLowerCase();
    const newRating = Number(document.getElementById("newRatingInput").value);

    if(!songId ||!newRating) {
        alert("Song ID and new rating are required!");
        return;
    }

    try {
        const songRef = doc(db, "songs", songId);

        const songSnap = await getDoc(songRef);

        if (!songSnap.exists()) {
            alert("Error: Song ID not found.");
            return;
        }

        await updateDoc(songRef, {rating: newRating});
        alert("Rating updated successfully!");

        document.getElementById("updateSongId").value = "";
        document.getElementById("newRatingInput").value = "";
        getSongs();

    } catch(error) {
        console.error("Error updating rating: ", error)
    }
}

// Event Listeners
document.querySelector("#addSong").addEventListener("submit", (event) => {
    event.preventDefault();
    saveSong();
    getSongs();
});

document.querySelector("#deleteSong").addEventListener("submit", (event) => {
    event.preventDefault();
    deleteSong();
    getSongs();
});

document.querySelector("#updateRating").addEventListener("submit", (event) => {
    event.preventDefault();
    updateRating();
    getSongs();
});

getSongs();