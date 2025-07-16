import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD9f71RrFqU2Gg-V-7jL-QPs7-X4WmIijA",
  authDomain: "todo-150725.firebaseapp.com",
  databaseURL: "https://todo-150725-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-150725",
  storageBucket: "todo-150725.firebasestorage.app",
  messagingSenderId: "553535249528",
  appId: "1:553535249528:web:89ca5da2fc843eaf2d218d",
  measurementId: "G-HKRV3NWNKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
};