import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";



const firebaseConfig = {
    apiKey: "AIzaSyDSQBVl0g6SDlC57e0hQOyffjCyusLsWOA",
  authDomain: "social-media-fda5e.firebaseapp.com",
  projectId: "social-media-fda5e",
  storageBucket: "social-media-fda5e.appspot.com",
  messagingSenderId: "859646923374",
  appId: "1:859646923374:web:b913a54ca50150f3540c7f",
  measurementId: "G-S6C7P7G8MX"
  };
  
  // Initialize Firebase
//   const analytics = getAnalytics(app);   

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


export const auth = firebase.auth();
export { database };
export default firebase;

