import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB2f10IfdfM0ummBAvm5lJb-9AGPjOcNA8",
    authDomain: "qrproject-4f2ed.firebaseapp.com",
    projectId: "qrproject-4f2ed",
    storageBucket: "qrproject-4f2ed.appspot.com",
    messagingSenderId: "342936280209",
    appId: "1:342936280209:web:3a28e649e906263db3b330",
    measurementId: "G-MTT9VM7J27"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebase);

export default firebase;