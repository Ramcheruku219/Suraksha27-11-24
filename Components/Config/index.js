// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA0UYzGtvyDQ2AAq7EpC44OIYSy6UX6qeA",
    authDomain: "otp-expo-7a167.firebaseapp.com",
    projectId: "otp-expo-7a167",
    storageBucket: "otp-expo-7a167.appspot.com",
    messagingSenderId: "240412599669",
    appId: "1:240412599669:web:26c4507429541e22b99f3c",
    measurementId: "G-BG7WVTT39K"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebaseConfig };




