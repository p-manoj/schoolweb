
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyuuJq22oR8VvXTzTLwmQQMuRY4_szxic",
    authDomain: "project-quiz-31651.firebaseapp.com",
    projectId: "project-quiz-31651",
    storageBucket: "project-quiz-31651.firebasestorage.app",
    messagingSenderId: "217705043693",
    appId: "1:217705043693:web:e1b77947dcce37aec61ee4",
    measurementId: "G-TYWXL7MS5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Add data to Firestore
async function addUser(userName, score) {
    try {
        const docRef = await addDoc(collection(db, "userData"), {
            name: userName,
            score: score
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Retrieve data from Firestore
export async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "userData"));
    let users = [];
    querySnapshot.forEach((doc) => {
        console.log({ ...doc.data(), ref: doc.ref });
        users.push({ ...doc.data(), ref: doc.ref });
        console.log(`${doc.id} => `, doc.data());
    });
    return users;
}

export async function updateUser(userName, score) {
    const querySnapshot = await getUsers();
    let userUpdated = false;
    querySnapshot.forEach((doc) => {
        if (doc.name == userName) {
            updateDoc(doc.ref, {
                score: score
            });
            userUpdated = true;
        }
    });
    if (!userUpdated) {
        addUser(userName, score);
    }
}

// Run the functions
//addUser();
// getUsers();

