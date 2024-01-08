// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDf2AoGUYy0cQUFfNwGT_-abd3zUS8T7eo",
  authDomain: "otp-ph.firebaseapp.com",
  projectId: "otp-ph",
  storageBucket: "otp-ph.appspot.com",
  messagingSenderId: "842384869837",
  appId: "1:842384869837:web:2d7b3e7c13fb6c93141c84",
  measurementId: "G-7CE2273CY1"
};



// const firebaseConfig = {
//   apiKey: "AIzaSyCSzhirA6oErdp9oeQkXhaq6v7DIxXGEzM",
//   authDomain: "otp-project-c54fe.firebaseapp.com",
//   projectId: "otp-project-c54fe",
//   storageBucket: "otp-project-c54fe.appspot.com",
//   messagingSenderId: "633230247841",
//   appId: "1:633230247841:web:c3967b7f6a85ba7b406de0",
//   measurementId: "G-76HQDQY021"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);