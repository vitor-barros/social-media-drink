import { auth } from "./firebaseConfig";
 
export const registerUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const loginUser = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const logoutUser = () => {
  return auth.signOut();
};
