import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { auth, app } from './config.js';

const db = getFirestore(app);

// Function to add a book
document.getElementById('book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;

    try {
        await addDoc(collection(db, "books"), { title, author });
        document.getElementById('book-form').reset();
    } catch (error) {
        console.error("Error adding book:", error);
    }
});

// Function to add a song
document.getElementById('song-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('songTitle').value;
    const artist = document.getElementById('songArtist').value;

    try {
        await addDoc(collection(db, "songs"), { title, artist });
        document.getElementById('song-form').reset();
    } catch (error) {
        console.error("Error adding song:", error);
    }
});

// Function to render books in real-time
onSnapshot(collection(db, "books"), (snapshot) => {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';  

    snapshot.forEach((docData) => {  
        const book = docData.data();
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', async () => {
            await deleteDoc(doc(db, "books", docData.id));
        });

        li.appendChild(deleteBtn);
        booksList.appendChild(li);
    });
});

// Function to render songs in real-time
onSnapshot(collection(db, "songs"), (snapshot) => {
    const songsList = document.getElementById('songs-list');
    songsList.innerHTML = '';  

    snapshot.forEach((docData) => { 
        const song = docData.data();
        const li = document.createElement('li');
        li.textContent = `${song.title} by ${song.artist}`;
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', async () => {
            await deleteDoc(doc(db, "songs", docData.id));
        });

        li.appendChild(deleteBtn);
        songsList.appendChild(li);
    });
});

