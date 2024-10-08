// DrinkRegister.js
import React, { useState } from "react";
import { addDrinkToUser } from "./userService";
import Drink from "./Drink";

const DrinkRegister = ({ codUsuario }) => {
  const [nomeDrink, setNomeDrink] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");

  const handleRegisterDrink = async () => {
    const drink = new Drink(nomeDrink, descricao, tipo);

    try {
      await addDrinkToUser(codUsuario, drink);
      alert("Drink cadastrado com sucesso!");
      setNomeDrink("");
      setDescricao("");
      setTipo("");
    } catch (error) {
      console.error("Erro ao cadastrar drink:", error);
      alert("Erro ao cadastrar o drink.");
    }
  };

  return (
    <div>
      <h2>Cadastro de Drink</h2>
      <input 
        type="text" 
        value={nomeDrink} 
        onChange={(e) => setNomeDrink(e.target.value)} 
        placeholder="Nome do Drink" 
      />
      <input 
        type="text" 
        value={descricao} 
        onChange={(e) => setDescricao(e.target.value)} 
        placeholder="Descrição" 
      />
      <input 
        type="text" 
        value={tipo} 
        onChange={(e) => setTipo(e.target.value)} 
        placeholder="Tipo de Drink" 
      />
      <button onClick={handleRegisterDrink}>Cadastrar Drink</button>
    </div>
  );
};

export default DrinkRegister;
