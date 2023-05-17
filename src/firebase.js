// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB0zU4HglZSJ2yVWJyNBjkiXgBe0Osy9co",
  authDomain: "final-year-projcet.firebaseapp.com",
  projectId: "final-year-projcet",
  storageBucket: "final-year-projcet.appspot.com",
  messagingSenderId: "334604980034",
  appId: "1:334604980034:web:9b49c8932ef26528db42db",
  measurementId: "G-C4RCLPQN7R"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const database = getFirestore(app);
const storage = getStorage();

export { storage, auth, database };