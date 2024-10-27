import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';

const PerfilUsuario = ({ codUsuario }) => {
  const [drinks, setDrinks] = useState([]);
  const [usuarioNome, setUsuarioNome] = useState('');
  const db = getDatabase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Referência para os drinks do usuário
        const drinksRef = ref(db, `usuarios/${codUsuario}/drinks`);
        const drinksSnapshot = await get(drinksRef);

        if (drinksSnapshot.exists()) {
          const drinksData = drinksSnapshot.val();
          const drinksList = Object.keys(drinksData).map(id => ({
            id,
            ...drinksData[id],
          }));
          setDrinks(drinksList);
        } else {
          console.log("Nenhum drink encontrado.");
        }

        // Referência para os dados do usuário
        const usuarioRef = ref(db, `usuarios/${codUsuario}`);
        const usuarioSnapshot = await get(usuarioRef);

        if (usuarioSnapshot.exists()) {
          const usuarioData = usuarioSnapshot.val();
          setUsuarioNome(usuarioData.nome || "Usuário Desconhecido");
        } else {
          console.log("Usuário não encontrado!");
        }

      } catch (error) {
        console.error("Erro ao buscar dados do usuário e drinks:", error);
      }
    };

    fetchData();
  }, [codUsuario, db]);

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
