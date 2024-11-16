// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ph-web-e6330.firebaseapp.com",
  projectId: "ph-web-e6330",
  storageBucket: "ph-web-e6330.firebasestorage.app",
  messagingSenderId: "982589087233",
  appId: "1:982589087233:web:b48892acd4caff8327aa00",
  measurementId: "G-8WG10LXCMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
