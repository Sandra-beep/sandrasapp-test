//Firebase för byte från Strapi, ej klar
import dotenv from 'dotenv'
import firebase from 'firebase';

//Const and Console
const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: AIzaSyAFpG36cuvjiGPzINJJ1qLMTt5OwMJ94iY,
  authDomain: web - study - buddy.firebaseapp.com,
  projectId: web - study - buddy,
  storageBucket: "web-study-buddy.appspot.com",
  messagingSenderId: "428961698354",
  appId: "1:428961698354:web:dc1e9fb70fafe3a36fe22b",
  measurementId: "G-N9TQ80DVM8"
};



//Initilize Firebase
firebase.initializeApp(firebaseConfig);

//export
export default firestore;