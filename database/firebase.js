// Import the functions you need from the SDKs you need
// import *as firebase from "firebase/app";
// import 'firebase/auth';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAbf7AccMGqsv5pDuJAUtdhzRzuVIc9XtA",
//   authDomain: "fir-auth-92aa4.firebaseapp.com",
//   projectId: "fir-auth-92aa4",
//   storageBucket: "fir-auth-92aa4.appspot.com",
//   messagingSenderId: "116338048861",
//   appId: "1:116338048861:web:c92674a6d4841dd4ac32b4"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
// export default firebase


import React from 'react';
import firebase from 'firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAbf7AccMGqsv5pDuJAUtdhzRzuVIc9XtA",
  authDomain: "fir-auth-92aa4.firebaseapp.com",
  projectId: "fir-auth-92aa4",
  storageBucket: "fir-auth-92aa4.appspot.com",
  messagingSenderId: "116338048861",
  appId: "1:116338048861:web:c92674a6d4841dd4ac32b4"
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.uiConfig = {
      signinOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };
  }
}
export default Firebase;

const FirebaseContext = React.createContext(null);
export { FirebaseContext };
