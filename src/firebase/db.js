import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'


// Get a Firestore instance
export const db = firebase
    .initializeApp({
        apiKey: "AIzaSyAw7xtD9zbQKdzwSbKLR7q3vJVz6lvV5rk",
        authDomain: "ideaapp2.firebaseapp.com",
        projectId: "ideaapp2",
        storageBucket: "ideaapp2.appspot.com",
        messagingSenderId: "1047188473803",
        appId: "1:1047188473803:web:e4ca54ef6d24fad8b1984e",
        measurementId: "G-VCBFLH360S"
    })
    .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })