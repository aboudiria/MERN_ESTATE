// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-stack-bbf5d.firebaseapp.com",
  projectId: "mern-stack-bbf5d",
  storageBucket: "mern-stack-bbf5d.appspot.com",
  messagingSenderId: "95327259733",
  appId: "1:95327259733:web:3db92e8574864439cf98dc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
