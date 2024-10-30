import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <form className="flex max-w-[500px] mx-auto my-5" onSubmit={(event) => event.preventDefault()}>
      <input
        type="text"
        className="flex-grow p-2.5 text-base border-2 border-gray-300 border rounded-l-md outline-none focus:border-blue-500"
        placeholder="Pesquisar drink"
        value={query}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchBar;
