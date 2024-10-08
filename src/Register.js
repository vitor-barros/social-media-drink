import React, { useState } from "react";
import { registerUser } from "./authService";
import { addUserToFirestore } from "./userService";
import Usuario from "./Usuario";
import { useNavigate } from "react-router-dom";

const Register = ({ setIsRegistered }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  
  const handleRegister = async () => {
    try {
      const userCredential = await registerUser(email, senha);
      const user = userCredential.user;
      const codUsuario = user.uid;

      const usuario = new Usuario(nome, codUsuario, email, senha);

      await addUserToFirestore(usuario);

      localStorage.setItem("codUsuario", codUsuario);

      setIsRegistered(true);

      navigate("/register-drink");

      alert("Usuário registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Register;