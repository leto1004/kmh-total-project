import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHy6ffZZuHu8kVB4hgWbtBnZbXQ5PvFdQ",
  authDomain: "leto1004-photo.firebaseapp.com",
  projectId: "leto1004-photo",
  storageBucket: "leto1004-photo.appspot.com",
  messagingSenderId: "845530511342",
  appId: "1:845530511342:web:0e34266b0f8208b36400ff",
  measurementId: "G-ZXWL6ZC8F8"
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();