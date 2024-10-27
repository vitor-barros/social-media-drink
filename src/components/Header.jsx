import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/cheershdlogo.png'; // Caminho da sua logo

const Header = () => {
  return (
    <header className="bg-white bg-opacity-90 rounded-lg shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo e Título */}
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold text-pink-600" style={{ fontFamily: "'Pacifico', cursive" }}>
            Cheers
          </h1>
          <img src={logo} alt="Logo" className="w-12 h-12" /> {/* Tamanho ajustável da logo */}
        </div>

        {/* Navegação para desktop */}
        <nav className="space-x-4 items-center hidden md:flex">
          <Link to="/" className="text-gray-800 hover:text-pink-500 transition duration-300 p-2" aria-label="Go to Main Tab">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24" className="inline-block">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="ml-2">Home</span>
          </Link>
          <Link to="/register-drink" className="text-gray-800 hover:text-pink-500 transition duration-300 p-2" aria-label="Register for Publication">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24" className="inline-block">
              <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"/>
            </svg>
            <span className="ml-2">Registrar</span>
          </Link>
          <Link to="/perfil" className="text-gray-800 hover:text-pink-500 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="inline-block"
            >
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
            </svg>
            <span className="ml-2">Perfil</span>
          </Link>
        </nav>

        {/* Navegação para mobile */}
        <nav className="flex space-x-4 items-center md:hidden px-4"> {/* escondido em desktop */}
          <Link to="/perfil" className="text-gray-800 hover:text-pink-500 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="25" height="25" className="inline-block">
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
