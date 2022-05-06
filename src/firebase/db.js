import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdSWOxh-aBB3g_oD-cSeWOZQGaNTMVJVA",
    authDomain: "iotalarm-7c087.firebaseapp.com",
    databaseURL: "https://iotalarm-7c087-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iotalarm-7c087",
    storageBucket: "iotalarm-7c087.appspot.com",
    messagingSenderId: "544832202744",
    appId: "1:544832202744:web:f8357699b1c1e0de24d80d",
    measurementId: "G-K1L26L2VT9"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);