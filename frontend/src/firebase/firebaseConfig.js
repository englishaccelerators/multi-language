
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyADlzxwy8R0UEFP1jibERrZ8dDE4Y4d60",
  authDomain: "english-dictionary-web.firebaseapp.com",
  databaseURL: "https://english-dictionary-web-default-rtdb.firebaseio.com",
  projectId: "english-dictionary-web",
  storageBucket: "english-dictionary-web.appspot.com",
  messagingSenderId: "956213881752",
  appId: "1:956213881752:web:7796b7de76160982bf59ed",
  measurementId: "G-K4G70XY6GT"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
