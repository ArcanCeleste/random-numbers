import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDS24DOISQ_MU2MExO6aQVFbnlrXQCa3lc",
    authDomain: "random-numbers-guilherme.firebaseapp.com",
    projectId: "random-numbers-guilherme",
    storageBucket: "random-numbers-guilherme.appspot.com",
    messagingSenderId: "161225460561",
    appId: "1:161225460561:web:62880e4fd214d4cd9c2170"
};

export const fbConfig = initializeApp(firebaseConfig);