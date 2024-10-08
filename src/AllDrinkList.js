import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const AllDrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchAllDrinks = async () => {
      try {
        const usersRef = collection(db, 'usuarios');
        const usersSnapshot = await getDocs(usersRef);
        const allDrinks = [];

        for (const userDoc of usersSnapshot.docs) {
          const drinksRef = collection(db, 'usuarios', userDoc.id, 'drinks');
          const drinksSnapshot = await getDocs(drinksRef);

          drinksSnapshot.docs.forEach(drinkDoc => {
            allDrinks.push({
              id: drinkDoc.id,
              ...drinkDoc.data(),
              nomeUsuario: userDoc.data().nome
            });
          });
        }

        setDrinks(allDrinks);
      } catch (error) {
        console.error("Erro ao buscar drinks:", error);
      }
    };

    fetchAllDrinks();
  }, [db]);

  return (
    <div>
      <h2>Todos os Drinks Cadastrados</h2>
      {drinks.length === 0 ? (
        <p>Nenhum drink cadastrado.</p>
      ) : (
        <ul>
          {drinks.map(drink => (
            <li key={drink.id}>
              <h3>{drink.nomeDrink}</h3>
              <p><strong>Descrição:</strong> {drink.descricao}</p>
              <p><strong>Tipo:</strong> {drink.tipo}</p>
              <p><strong>Cadastrado por:</strong> {drink.nomeUsuario}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllDrinksList;
