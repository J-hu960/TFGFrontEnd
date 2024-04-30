// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARH0r6HdtI9n0l9cc6RL7BGLIICz1oey4",
  authDomain: "imagestfg.firebaseapp.com",
  projectId: "imagestfg",
  storageBucket: "imagestfg.appspot.com",
  messagingSenderId: "1048957775251",
  appId: "1:1048957775251:web:054fe83b335f92ced8cc66",
  measurementId: "G-3YTSKHSLGK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
