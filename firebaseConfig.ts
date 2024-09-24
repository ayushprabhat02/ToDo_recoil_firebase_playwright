// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBYnKwS66cyf8aHO1r8N5M9mhHZVLKR4I",
    authDomain: "fir-storetodo.firebaseapp.com",
    projectId: "fir-storetodo",
    storageBucket: "fir-storetodo.appspot.com",
    messagingSenderId: "507588147754",
    appId: "1:507588147754:web:e7d05e47289a2a506da153",
    measurementId: "G-3TNHDJ0GCB"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
