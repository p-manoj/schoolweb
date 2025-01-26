
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































// // function authenticate() {
// //     return gapi.auth2.getAuthInstance().signIn({
// //         scope: 'https://www.googleapis.com/auth/spreadsheets',
// //     });
// // }

// // function loadClient() {
// //     gapi.client.setApiKey('AIzaSyBOrfyTEzhkcMUkMzbrGQsJ_Itjsu03y_I'); // Use OAuth for private sheets
// //     return gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4');
// // }

// // gapi.load('client:auth2', () => {
// //     gapi.auth2.init({ client_id: "903277855198-2dar9o5dsntj46em4k4f35v4285k2n4t.apps.googleusercontent.com" })
// // });

// // console.log(gapi);

// // // const sheets = google.sheets('v4');
// // // const { OAuth2 } = google.auth;

// // // const oauth2Client = new OAuth2(
// // //     "903277855198-2dar9o5dsntj46em4k4f35v4285k2n4t.apps.googleusercontent.com",
// // //     "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"
// // // );

// // // // Set the credentials
// // // oauth2Client.setCredentials({
// // //     scope: 'https://www.googleapis.com/auth/spreadsheets',
// // //     token_type: 'Bearer'
// // // });

// // // async function updateLeaderBoard(spreadsheetId, range, values) {
// // //     const request = {
// // //         spreadsheetId,
// // //         range,
// // //         valueInputOption: 'RAW',
// // //         resource: {
// // //             values,
// // //         },
// // //         auth: oauth2Client,
// // //     };

// // //     try {
// // //         const response = (await sheets.spreadsheets.values.update(request)).data;
// // //         console.log('Leaderboard updated:', response);
// // //     } catch (err) {
// // //         console.error('Error updating leaderboard:', err);
// // //     }
// // // }

// // // // Example usage
// // // const spreadsheetId = '175olwGMuHpMlmxK-iDTBdRwvxzW_I2j_trwsgNA_mtQ';
// // // const range = 'Sheet1!A1:B2';
// // // const values = [
// // //     ['Name', 'Score'],
// // //     ['Alice', '100'],
// // //     ['Bob', '90'],
// // // ];

// // // updateLeaderBoard(spreadsheetId, range, values);


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://volcanostock007:PVDWlSoNyuNgDZUA@quiz.gcehg.mongodb.net/?retryWrites=true&w=majority&appName=quiz";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
