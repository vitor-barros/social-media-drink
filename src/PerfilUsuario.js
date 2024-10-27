import React, { useEffect, useState } from 'react';
import { useAuth } from "./contexts/AuthContext";
import { getDatabase, ref, onValue } from 'firebase/database';
import Header from './components/Header';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';

import styles from './index.css'

import './PerfilUsuario.css';

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
    <div className='min-h-screen w-ful bg-gradient-to-r from-orange-400 via-pink-300 to-red-500'>
      <Header />
      {/* <div className="max-w-4xl mx-auto p-6 bg-pink-50 rounded-lg shadow-lg"> */}
      <div className='div-header'>
        <UserProfile userName={usuarioNome} />
        {drinks.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhum drink cadastrado.</p>
        ) : (
          <ul className="space-y-6">
            {drinks.map((drink) => (
              <li key={drink.id} className="social-media-card">
                <div className="card-header">
                  <h2 className="user-name">{usuarioNome}</h2>
                </div>
                <h3 className="post-title">{drink.nomeDrink}</h3>
                <p className="text-gray-700">
                  <strong>Descrição:</strong> {drink.descricao}
                </p>
                <p className="post-type">
                  <strong>Tipo:</strong> {drink.tipo}
                </p>
                <p className="post-description">
                  <strong>Cadastrado por:</strong> {usuarioNome}
                </p>
              </li>
            ))}
          </ul>
        )}
      {/* </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default PerfilUsuario;
