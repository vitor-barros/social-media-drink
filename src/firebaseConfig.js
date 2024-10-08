// firebaseConfig.js
// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAUSuxGXed8NBs89Fnqwwbu2osW62OZXwE",
    authDomain: "rede-social-drink.firebaseapp.com",
    projectId: "rede-social-drink",
    storageBucket: "rede-social-drink.appspot.com",
    messagingSenderId: "1096981831678",
    appId: "1:1096981831678:web:f52510f611cf7dbc462aaf",
    measurementId: "G-DR6DQELRXL"
  };
  
  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);   

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;

