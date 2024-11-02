import React, { useContext, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { database } from "./firebaseConfig";
import Header from "./components/Header";
import Footer from "./components/Footer";

const DrinkRegister = () => {
  const [img, setImg] = useState(""); 
  const { currentUser, login } = useAuth(); 
  const [nomeDrink, setNomeDrink] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const codUsuario = currentUser ? currentUser.uid : null;

  const handleRegisterDrink = async () => {
    try {
      if (!codUsuario) {
        const email = prompt("Por favor, insira seu email:");
        const password = prompt("Por favor, insira sua senha:");
        
        if (email && password) {
          await login(email, password);
        } else {
          alert("Email e senha são necessários para login.");
          return;
        }
      }

      if (!nomeDrink.trim() || !descricao.trim() || !tipo.trim()) {
        alert("Todos os campos devem ser preenchidos.");
        return;
      }

      const updatedUser = currentUser || { uid: null };
      if (!updatedUser.uid) {
        alert("Usuário não encontrado. Faça login novamente.");
        return;
      }

      const userRef = database.ref(`usuarios/${updatedUser.uid}`);
      const userSnapshot = await userRef.once('value');

      if (!userSnapshot.exists()) {
        await userRef.set({
          nome: updatedUser.displayName || "Usuário sem nome",
          email: updatedUser.email,
          dataRegistro: new Date().toISOString(),
        });
      }

      await database.ref(`drinks`).push({
        nomeDrink,
        descricao,
        tipo,
        img,
        dataRegistro: new Date().toISOString(),
        userId: updatedUser.uid
      });

      alert("Drink registrado com sucesso!");
      setNomeDrink("");
      setDescricao("");
      setTipo("");
      setImg("");
      setErrorMessage("");
    } catch (error) {
      console.error("Erro ao registrar drink:", error);
      setErrorMessage("Erro ao registrar drink. Tente novamente.");
    }
  };

  // limites de caracteres pros campos
  const MAX_NOME_DRINK = 30;
  const MAX_DESCRICAO = 150;
  const MAX_TIPO = 20;
  const MAX_IMAGEM = 100;

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-orange-400 via-pink-300 to-red-500">
      <Header />
      <div className="m-12 max-w-md mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Registrar Drink</h2>
        <div className="flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Nome do Drink</label>
            <div className="relative">
              <input
                type="text"
                value={nomeDrink}
                onChange={(e) => setNomeDrink(e.target.value)}
                placeholder="Nome do Drink"
                maxLength={MAX_NOME_DRINK}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <span className="absolute right-2 bottom-2 text-gray-500 text-sm">{nomeDrink.length}/{MAX_NOME_DRINK}</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Descrição</label>
            <div className="relative">
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição"
                maxLength={MAX_DESCRICAO}
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows="3"
              />
              <span className="absolute right-2 bottom-2 text-gray-500 text-sm">{descricao.length}/{MAX_DESCRICAO}</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Tipo</label>
            <div className="relative">
              <input
                type="text"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                placeholder="Tipo"
                maxLength={MAX_TIPO}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <span className="absolute right-2 bottom-2 text-gray-500 text-sm">{tipo.length}/{MAX_TIPO}</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Imagem</label>
            <div className="relative">
              <input
                type="text"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="Imagem"
                maxLength={MAX_IMAGEM}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <span className="absolute right-2 bottom-2 text-gray-500 text-sm">{img.length}/{MAX_IMAGEM}</span>
            </div>
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
      <Footer />
    </div>
  );
};

export default DrinkRegister;
