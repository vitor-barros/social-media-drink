import { database } from "./firebaseConfig"; // Ensure this points to your Firebase configuration file
import { getDatabase, ref, get, update } from 'firebase/database';


// export const getUserFromDatabase = async (codUsuario) => {
//   const userRef = database.ref(`usuarios/${codUsuario}`);
//   const snapshot = await userRef.once('value');
//   if (snapshot.exists()) {
//     return snapshot.val();
//   } else {
//     throw new Error("Usuário não encontrado");
//   }
// };

// export const addDrinkToUser = async (codUsuario, drink) => {
//   const drinkRef = database.ref(`usuarios/${codUsuario}/drinks`).push();
//   await drinkRef.set({
//     nomeDrink: drink.nomeDrink,
//     descricao: drink.descricao,
//     tipo: drink.tipo,
//     dataAdicao: new Date().toISOString()
//   });
// };

export const removeDrinkFromDatabase = async (codUsuario, nomeDrink) => {
  const db = getDatabase();
  const drinksRef = ref(db, 'drinks');
  const snapshot = await get(drinksRef);

  const updates = {};
  snapshot.forEach(childSnapshot => {
    const drinkData = childSnapshot.val();
    if (drinkData.userId === codUsuario && drinkData.nomeDrink === nomeDrink) {
      updates[childSnapshot.key] = null; // Seta a chave para null para remover
    }
  });

  await update(drinksRef, updates);
};


// export const getUserDrinks = async (codUsuario) => {
//   const drinksRef = database.ref(`usuarios/${codUsuario}/drinks`);
//   const snapshot = await drinksRef.once('value');
//   const drinks = [];
//   snapshot.forEach(childSnapshot => {
//     drinks.push(childSnapshot.val());
//   });
//   return drinks;
// };

// export const addUserToDatabase = async (usuario) => {
//   try {
//     await database.ref('users/' + usuario.codUsuario).set({
//       nome: usuario.nome,
//       email: usuario.email,
//       senha: usuario.senha
//     });
//     console.log("Usuário adicionado ao Realtime Database com sucesso!");
//   } catch (error) {
//     console.error("Erro ao adicionar usuário ao Realtime Database:", error);
//     throw error;
//   }
// };