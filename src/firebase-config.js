import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYE2A2QNbQUWuUeFagcG5OJFBTRYJjniw",
  authDomain: "attendance-lists.firebaseapp.com",
  projectId: "attendance-lists",
  storageBucket: "attendance-lists.appspot.com",
  messagingSenderId: "921441605639",
  appId: "1:921441605639:web:27970885f6b629743772a2",
  measurementId: "G-RDH5HT6WX1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);