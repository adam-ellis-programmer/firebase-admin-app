// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app' // has to be called first
// import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC3d575GnN2u73tGM_YCZyJ0shsvyXkp5M',
  authDomain: 'test-project-e2c7b.firebaseapp.com',
  projectId: 'test-project-e2c7b',
  storageBucket: 'test-project-e2c7b.appspot.com',
  messagingSenderId: '15604152459',
  appId: '1:15604152459:web:51d4ddb641f2117962bc8e',
  measurementId: 'G-S95XDT8X97',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
// export const admin = ...
