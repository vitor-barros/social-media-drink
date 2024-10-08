import React, { useState } from "react";
import { firestore } from "./firebaseConfig";

const DrinkRegister = () => {
  const [nomeDrink, setNomeDrink] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const codUsuario = localStorage.getItem("codUsuario"); 

  const handleRegisterDrink = async () => {
    try {
      await firestore.collection("usuarios").doc(codUsuario).collection("drinks").add({
        nomeDrink,
        descricao,
        tipo,
        nomeUsuario: codUsuario,
      });
      alert("Drink registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar drink:", error);
    }
  };

  return (
    <div>
      <input type="text" value={nomeDrink} onChange={(e) => setNomeDrink(e.target.value)} placeholder="Nome do Drink" />
      <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Tipo" />
      <button onClick={handleRegisterDrink}>Registrar Drink</button>
    </div>
  );
};

export default DrinkRegister;