import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "memo-space-warp.firebaseapp.com",
  projectId: "memo-space-warp",
  storageBucket: "memo-space-warp.appspot.com",
  messagingSenderId: "194823993249",
  appId: "1:194823993249:web:78e6412576ca99c5fd3de0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app