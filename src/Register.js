import React, { useState } from "react";
import { registerUser } from "./authService";
import { addUserToFirestore } from "./userService";
import Usuario from "./Usuario";
import { useNavigate } from "react-router-dom";

const Register = ({ setIsRegistered }) => {
  const [nome, setNome] = useState("");
  const [codUsuario, setCodUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  
  const handleRegister = async () => {
    try {
      const usuario = new Usuario(nome, codUsuario, email, senha);
      await registerUser(usuario.getEmail(), usuario.getSenha());
      await addUserToFirestore(usuario);
      localStorage.setItem("codUsuario", codUsuario);
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
      <input type="text" value={codUsuario} onChange={(e) => setCodUsuario(e.target.value)} placeholder="Código do Usuário" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Register;
