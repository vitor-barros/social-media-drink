import React, { useEffect, useState } from 'react';
import { useAuth } from "./contexts/AuthContext";
import { getDatabase, ref, onValue } from 'firebase/database';
import Header from './components/Header';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import BotaoTrash from './images/trash.svg';
import { removeDrinkFromDatabase } from './userService';
import './PerfilUsuario.css';

const PerfilUsuario = () => {
  const { currentUser } = useAuth();
  const [drinks, setDrinks] = useState([]);
  const [usuarioNome, setUsuarioNome] = useState('');
  const db = getDatabase();

  useEffect(() => {
    if (!currentUser) {
      console.log("Usuário não encontrado!");
      return;
    }

    // Referência para o nó do usuário para obter o nome
    const userRef = ref(db, `usuarios/${currentUser.uid}`);
    const drinksRef = ref(db, `drinks`);

    // Obter o nome do usuário
    const unsubscribeUser = onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setUsuarioNome(userData.nome || "Usuário Desconhecido");
      }
    });

    // Obter a lista de drinks filtrando pelo userId
    const unsubscribeDrinks = onValue(drinksRef, (snapshot) => {
      const drinksData = snapshot.val();
      if (drinksData) {
        const userDrinks = Object.keys(drinksData)
          .map(id => ({
            id,
            ...drinksData[id],
          }))
          .filter(drink => drink.userId === currentUser.uid); // Filtrar apenas os drinks do usuário atual
        setDrinks(userDrinks);
      }
    });

    // Limpeza dos listeners
    return () => {
      unsubscribeUser();
      unsubscribeDrinks();
    };
  }, [currentUser, db]);

  const handleDelete = async (nomeDrink) => {
    await removeDrinkFromDatabase(currentUser.uid, nomeDrink);
    setDrinks(drinks.filter(drink => drink.nomeDrink !== nomeDrink));
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-r from-orange-400 via-pink-300 to-red-500'>
      <Header />
      <div className='div-header'>
        <UserProfile userName={usuarioNome} />
        {drinks.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhum drink cadastrado.</p>
        ) : (
          <ul className="space-y-6">
            {drinks.map((drink) => (
              <li key={drink.id} className="social-media-card p-4 border rounded-lg shadow-md bg-white">
                <h3 className="post-title font-bold text-lg text-gray-800">{drink.nomeDrink}</h3>
                <div className="border-b border-gray-300 my-2"></div>
                <p className="text-gray-700">
                  <strong>Descrição:</strong> {drink.descricao}
                </p>
                <p className="post-type text-gray-700">
                  <strong>Tipo:</strong> {drink.tipo}
                </p>
                <p className="post-description flex justify-between items-center">
                  <span className="flex items-center">
                    <strong>Cadastrado por: </strong> <span className="ml-1">{usuarioNome}</span>
                  </span>
                  <button onClick={() => handleDelete(drink.nomeDrink)} className="image-button">
                    <img src={BotaoTrash} alt="Botão de excluir" className="w-6 h-6" />
                  </button>
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

export default PerfilUsuario;
