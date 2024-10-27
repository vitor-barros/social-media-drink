import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Header from "./components/Header";

const AllDrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const fetchAllDrinks = () => {
      const usersRef = ref(db, 'usuarios');
      onValue(usersRef, (snapshot) => {
        const allDrinks = [];
        const users = snapshot.val();

        if (users) {
          Object.keys(users).forEach(userId => {
            const user = users[userId];
            if (user.drinks) {
              Object.keys(user.drinks).forEach(drinkId => {
                const drink = user.drinks[drinkId];
                allDrinks.push({
                  id: drinkId,
                  ...drink,
                  nomeUsuario: user.nome,
                });
              });
            }
          });
        }

        setDrinks(allDrinks);
      }, {
        onlyOnce: true // Se você deseja buscar os dados apenas uma vez
      });
    };

    fetchAllDrinks();
  }, [db]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-400 via-pink-300 to-red-500 flex flex-col">
  {/* Header fixo no topo */}
    <Header />
  {/* Conteúdo principal, ajustado para iniciar logo abaixo do header fixo */}
  <div className="flex-grow mt-16 max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Todos os Drinks Cadastrados</h2>
    {drinks.length === 0 ? (
      <p className="text-gray-600 text-center">Nenhum drink cadastrado.</p>
    ) : (
      <ul className="space-y-4">
        {drinks.map((drink) => (
          <li key={drink.id} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">{drink.nomeDrink}</h3>
            <p className="text-gray-700">
              <strong>Descrição:</strong> {drink.descricao}
            </p>
            <p className="text-gray-700">
              <strong>Tipo:</strong> {drink.tipo}
            </p>
            <p className="text-gray-700">
              <strong>Cadastrado por:</strong> {drink.nomeUsuario}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
  );
};

export default AllDrinksList;
