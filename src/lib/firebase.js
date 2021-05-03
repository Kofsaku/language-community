import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';



// // firebase.appが0のときはinitializeしない。
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
// }

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();
// export const storage = firebase.storage();
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


import firebase from "firebase/app";
import "firebase/auth"; // If you need it

const config = {
  apiKey: "AIzaSyAarPzrLqsgahv26tgNe1jBLsYnOMJ3Nas",
  authDomain: "palmates-81837.firebaseapp.com",
  projectId: "palmates-81837",
  storageBucket: "palmates-81837.appspot.com",
  messagingSenderId: "148671998179",
  appId: "1:148671998179:web:a858c1e47c549fe7833dd6",
  measurementId: "G-W1Q4J2CGV3"
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export const auth = firebase.auth();
export const Firebase = firebase;

export const Login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(){
      return result;
    })
    .catch(function (error) {
      console.log(error);
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

// ログイン状態の検知
export const listenAuthState = () => {
  return firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      dispatch({
        type: "login",
        payload: {
          user,
        },
      });
    } else {
      // User is signed out.
      // ...
      dispatch({
        type: "logout",
      });
    }
  });
};

export const firebaseUser = () => {
  return firebase.auth().currentUser;
};

// Logout
export const Logout = () => {
  auth.signOut().then(() => {
    window.location.reload();
  });
};