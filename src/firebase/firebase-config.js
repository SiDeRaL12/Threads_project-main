import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcvqYPNKBtadY5J-7YxFp_1IBlMNtfc5A",
  authDomain: "threadsproject-dc8b5.firebaseapp.com",
  projectId: "threadsproject-dc8b5",
  storageBucket: "threadsproject-dc8b5.appspot.com",
  messagingSenderId: "381172527743",
  appId: "1:381172527743:web:7d8f4de6c8027d315a854a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

