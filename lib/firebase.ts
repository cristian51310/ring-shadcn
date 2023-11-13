// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCIfdYQ9f8w0Vq-RMBdBB-snr9JOjs_OXM",
  authDomain: "ring-513.firebaseapp.com",
  projectId: "ring-513",
  storageBucket: "ring-513.appspot.com",
  messagingSenderId: "1031859208079",
  appId: "1:1031859208079:web:c933b00d682670be7b95fa",
  measurementId: "G-8LD2DPBNHN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;