import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARY4gKOONJ6QpF2ESMYXwZLvJNrD6wer8",
  authDomain: "lpcars.firebaseapp.com",
  projectId: "lpcars",
  storageBucket: "lpcars.firebasestorage.app",
  messagingSenderId: "293202672457",
  appId: "1:293202672457:web:89b940f1d4984abc8eb898"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, storage}