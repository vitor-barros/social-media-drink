import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig"; 
import DrinkRegister from "./DrinkRegister";
import DrinkList from "./DrinkList";
import Register from "./Register"; 
// import AllDrinksList from "./AllDrinksList";
import AllDrinksList from "./AllDrinkList";

const App = () => {
  const [codUsuario, setCodUsuario] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCodUsuario(user.uid);
        setIsRegistered(true);
      } else {
        setCodUsuario(null);
        setIsRegistered(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Sua Aplicação</h1>
      {/* {!isRegistered ? (
        <Register setIsRegistered={setIsRegistered} /> // Exibe o componente de registro se não estiver registrado
      ) : (
        <> */}
          <DrinkList codUsuario={codUsuario} /> // Exibe a lista de drinks do usuário
          <DrinkRegister codUsuario={codUsuario} /> // Exibe o componente de registro de drinks
          <AllDrinksList /> // Exibe todos os drinks cadastrados por todos os usuários
        {/* </> */}
      {/* )} */}
    </div>
  );
};

export default App;
