// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjIftNOlsQ5WNQfmsR73WeyhMncnzF90s",
  authDomain: "mail-box-client1.firebaseapp.com",
  databaseURL: "https://mail-box-client1-default-rtdb.firebaseio.com",
  projectId: "mail-box-client1",
  storageBucket: "mail-box-client1.appspot.com",
  messagingSenderId: "232180811041",
  appId: "1:232180811041:web:3cacb43b65b1ccc3526a60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
