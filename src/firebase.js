import{getFirestore} from "firebase/firestore"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeXSkIUaIWBrCOjQOnI3RS2mPzMJlQukY",
  authDomain: "siddhikitchensrecipe.firebaseapp.com",
  projectId: "siddhikitchensrecipe",
  storageBucket: "siddhikitchensrecipe.appspot.com",
  messagingSenderId: "771433958516",
  appId: "1:771433958516:web:751caae8868b49cfb85521"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)