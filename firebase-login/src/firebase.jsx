// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCo6msmFlI_V9Pk-hXR5wqfjpfyQWNNq00",
  authDomain: "fir-login-cba48.firebaseapp.com",
  projectId: "fir-login-cba48",
  storageBucket: "fir-login-cba48.appspot.com",
  messagingSenderId: "16166172785",
  appId: "1:16166172785:web:3dda95dcff55433a3303d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
