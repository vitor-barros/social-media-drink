import React from 'react';

const UserProfile = ({ userName = "John Doe", onLogout = () => console.log("Logout clicked") }) => {
  return (
    <div className="flex justify-center">
      <div className="w-80 h-64 bg-white bg-opacity-90 rounded-lg shadow-lg flex flex-col items-center justify-between p-6 box-border">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <img
            src="/placeholder.svg?height=80&width=80"
            alt={userName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-white text-xl font-bold">
            {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-3 mb-1 text-center">{userName}</h2>
        <p className="text-sm text-gray-600 m-0">User Profile</p>
        <button
          className="w-full px-4 py-2 bg-white bg-opacity-90 rounded-lg shadow-lg rounded-md cursor-pointer flex items-center justify-center transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white"
          onClick={onLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
