import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white bg-opacity-90 rounded-lg shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo ou Título */}
        <h1 className="text-2xl font-bold text-gray-800">Minha Aplicação</h1>

        {/* Navegação */}
        <nav className="flex space-x-4">
          {/* Link Home */}
          <Link to="/" className="text-gray-800 hover:text-pink-500 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="inline-block"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="ml-2">Home</span>
          </Link>

          {/* Link Perfil */}
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
      </div>
    </header>
  );
};

export default Header;
