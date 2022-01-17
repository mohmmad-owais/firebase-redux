// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyBCzORI-sMwrAiH1EOy9PvsDEJRkWc7VC4",
  authDomain: "todo-93d2c.firebaseapp.com",
  databaseURL: "https://todo-93d2c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-93d2c",
  storageBucket: "todo-93d2c.appspot.com",
  messagingSenderId: "980437270368",
  appId: "1:980437270368:web:40067627c2495012576805"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);