import React, { useContext, useState } from "react";
import { useAuth } from "./contexts/AuthContext"; // Importando o AuthContext
import { database } from "./firebaseConfig"; // Altere para usar o Realtime Database
import Header from "./components/Header"; // Importando o componente Header
import Footer from "./components/Footer";

const DrinkRegister = () => {
  const { currentUser, login } = useAuth(); // Obtendo o usuário e a função de login do AuthContext
  const [nomeDrink, setNomeDrink] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para mensagens de erro

  // Pegando o ID do usuário do AuthContext
  const codUsuario = currentUser ? currentUser.uid : null;

  const handleRegisterDrink = async () => {
    try {
      if (!codUsuario) {
        // Se o usuário não estiver logado, tenta fazer login (você pode personalizar isso)
        const email = prompt("Por favor, insira seu email:");
        const password = prompt("Por favor, insira sua senha:");
        
        if (email && password) {
          await login(email, password); // Tentando fazer login
        } else {
          alert("Email e senha são necessários para login.");
          return;
        }
      }

      // Após login, pega o código do usuário novamente
      const updatedUser = currentUser || { uid: null };
      if (!updatedUser.uid) {
        alert("Usuário não encontrado. Faça login novamente.");
        return;
      }

      // Salvando os dados do usuário se ainda não estiverem salvos
      const userRef = database.ref(`usuarios/${updatedUser.uid}`);
      const userSnapshot = await userRef.once('value');

      if (!userSnapshot.exists()) {
        await userRef.set({
          nome: updatedUser.displayName || "Usuário sem nome", // ou pegue de onde estiver
          email: updatedUser.email,
          dataRegistro: new Date().toISOString(),
        });
      }

      // Salvando os dados do drink no Realtime Database
      await database.ref(`usuarios/${updatedUser.uid}/drinks`).push({
        nomeDrink,
        descricao,
        tipo,
        dataRegistro: new Date().toISOString(), // Adicionando a data do registro do drink
      });

      alert("Drink registrado com sucesso!");
      setNomeDrink(""); // Limpar o campo após o registro
      setDescricao("");
      setTipo("");
      setErrorMessage(""); // Limpa mensagens de erro ao registrar com sucesso
    } catch (error) {
      console.error("Erro ao registrar drink:", error);
      setErrorMessage("Erro ao registrar drink. Tente novamente."); // Define mensagem de erro
    }
  };

  return (
    <div className="min-h-screen w-ful bg-gradient-to-r from-orange-400 via-pink-300 to-red-500">
      <Header />
    <div className="m-12 max-w-md mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Registrar Drink</h2>
      <div className="flex flex-col">
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Nome do Drink</label>
          <input
            type="text"
            value={nomeDrink}
            onChange={(e) => setNomeDrink(e.target.value)}
            placeholder="Nome do Drink"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            className="w-full p-2 border border-gray-300 rounded resize-none"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Tipo</label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            placeholder="Tipo"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
        <button
          onClick={handleRegisterDrink}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
        >
          Registrar Drink
        </button>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default DrinkRegister;
