import React, { useEffect, useState } from 'react';
import { useAuth } from "./contexts/AuthContext"; // Importando o AuthContext para pegar o usuário logado
import { getDatabase, ref, onValue } from 'firebase/database';

const PerfilUsuario = () => {
  const { currentUser } = useAuth(); // Pegando o usuário logado do AuthContext
  const [drinks, setDrinks] = useState([]);
  const [usuarioNome, setUsuarioNome] = useState('');
  const db = getDatabase();

  useEffect(() => {
    if (!currentUser) {
      console.log("Usuário não encontrado!");
      return;
    }

    const userRef = ref(db, `usuarios/${currentUser.uid}`);

    // Real-time listener para atualizar automaticamente os drinks no perfil
    const unsubscribe = onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setUsuarioNome(userData.nome || "Usuário Desconhecido");
        const drinksData = userData.drinks || {};
        const drinksList = Object.keys(drinksData).map(id => ({
          id,
          ...drinksData[id],
        }));
        setDrinks(drinksList);
      }
    });

    return () => unsubscribe();
  }, [currentUser, db]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Drinks Cadastrados por {usuarioNome}</h2>
      {drinks.length === 0 ? (
        <p className="text-gray-600 text-center">Nenhum drink cadastrado.</p>
      ) : (
        <ul className="space-y-4">
          {drinks.map(drink => (
            <li key={drink.id} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800">{drink.nomeDrink}</h3>
              <p className="text-gray-700"><strong>Descrição:</strong> {drink.descricao}</p>
              <p className="text-gray-700"><strong>Tipo:</strong> {drink.tipo}</p>
              <p className="text-gray-700"><strong>Cadastrado por:</strong> {usuarioNome}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PerfilUsuario;
