import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        history.push("/register-drink");
      }
    });

    return () => unsubscribe();
  }, [history]);

};

export default Login;
