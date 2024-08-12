// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDefNV_BG5aiJuj8uHCDNfV4d6l4VShe5I",
  authDomain: "ccp-auth-428b1.firebaseapp.com",
  projectId: "ccp-auth-428b1",
  storageBucket: "ccp-auth-428b1.appspot.com",
  messagingSenderId: "496178586907",
  appId: "1:496178586907:web:376d75899a1c8a9e9a9fbe",
  measurementId: "G-1NJDKSVF4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const dataBase = getFirestore(app)
export const Auth = getAuth(app)
