import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AllDrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const [userNames, setUserNames] = useState({});
  const db = getDatabase();

  useEffect(() => {
    const fetchAllDrinks = () => {
      const drinksRef = ref(db, 'drinks');
      onValue(drinksRef, (snapshot) => {
        const allDrinks = [];
        const drinksData = snapshot.val();

        if (drinksData) {
          Object.keys(drinksData).forEach((drinkId) => {
            const drink = drinksData[drinkId];
            allDrinks.push({
              id: drinkId,
              ...drink,
            });
          });

          // Ordenar por dataRegistro em ordem decrescente
          allDrinks.sort((a, b) => new Date(b.dataRegistro) - new Date(a.dataRegistro));
        }

        setDrinks(allDrinks);
      });
    };

    const fetchUserNames = () => {
      const usersRef = ref(db, 'usuarios');
      onValue(usersRef, (snapshot) => {
        const usersData = snapshot.val();
        const namesMap = {};

        if (usersData) {
          Object.keys(usersData).forEach((userId) => {
            namesMap[userId] = usersData[userId].nome;
          });
        }

        setUserNames(namesMap);
      });
    };

    fetchAllDrinks();
    fetchUserNames();
  }, [db]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-400 via-pink-300 to-red-500 flex flex-col">
      <Header />
      <div className="flex-grow mt-8 max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Todos os Drinks Cadastrados</h2>
        {drinks.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhum drink cadastrado.</p>
        ) : (
          <ul className="space-y-4 my-12">
            {drinks.map((drink) => (
              <li key={drink.id} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800">{drink.nomeDrink}</h3>
                <div className="border-b border-gray-300 my-2"></div>
                <p className="text-gray-700">
                  <strong>Descrição:</strong> {drink.descricao}
                </p>
                <p className="text-gray-700">
                  <strong>Tipo:</strong> {drink.tipo}
                </p>
                <p className="text-gray-700">
                  <strong>Cadastrado por:</strong> {userNames[drink.userId] || "Usuário desconhecido"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllDrinksList;
