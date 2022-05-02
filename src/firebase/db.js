import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAw7xtD9zbQKdzwSbKLR7q3vJVz6lvV5rk",
    authDomain: "ideaapp2.firebaseapp.com",
    projectId: "ideaapp2",
    storageBucket: "ideaapp2.appspot.com",
    messagingSenderId: "1047188473803",
    appId: "1:1047188473803:web:e4ca54ef6d24fad8b1984e",
    measurementId: "G-VCBFLH360S"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);