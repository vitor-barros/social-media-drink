import React, { useEffect, useState } from 'react';
import { useAuth } from "./contexts/AuthContext";
import { getDatabase, ref, onValue } from 'firebase/database';
import Header from './components/Header';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import BotaoTrash from './images/trash.svg';
import imagemErro from './images/image404.jpeg'
import { removeDrinkFromDatabase } from './userService';

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

    const userRef = ref(db, `usuarios/${currentUser.uid}`);
    const drinksRef = ref(db, `drinks`);

    const unsubscribeUser = onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setUsuarioNome(userData.nome || "Usuário Desconhecido");
      }
    });

    const unsubscribeDrinks = onValue(drinksRef, (snapshot) => {
      const drinksData = snapshot.val();
      if (drinksData) {
        const userDrinks = Object.keys(drinksData)
          .map(id => ({
            id,
            ...drinksData[id],
          }))
          .filter(drink => drink.userId === currentUser.uid);
        setDrinks(userDrinks);
      }
    });

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
    <div className="min-h-screen w-full bg-gradient-to-r from-orange-400 via-pink-300 to-red-500 flex flex-col">
      <Header />
      <div className="flex flex-col items-center pt-12 px-4 flex-grow overflow-y-auto">
        <UserProfile userName={usuarioNome} />
        {drinks.length === 0 ? (
          <p className="text-gray-600 text-center mt-4">Nenhum drink cadastrado.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full max-w-5xl">
            {drinks.map((drink) => (
              <li
                key={drink.id}
                className="w-full max-w-sm p-4 bg-white bg-opacity-90 rounded-lg shadow-lg flex flex-col justify-between"
              >
                <h3 className="font-bold text-lg text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis">{drink.nomeDrink}</h3>
                <div className="border-b border-gray-300 my-2"></div>
                <img
                  src={drink.img || imagemErro} // adiciona uma imagem se n tiver
                  alt={drink.nomeDrink}
                  className="w-full h-100 object-cover rounded-md my-2"
                />
                <p className="text-gray-700 text-sm line-clamp-2">
                  <strong>Descrição:</strong> {drink.descricao}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Tipo:</strong> {drink.tipo}
                </p>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="flex items-center">
                    <strong>Cadastrado por:</strong>
                    <span className="truncate">{usuarioNome}</span>
                  </span>
                  <button onClick={() => handleDelete(drink.nomeDrink)} className="flex-shrink-0">
                    <img src={BotaoTrash} alt="Botão de excluir" className="w-6 h-6" />
                  </button>
                </div>
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
