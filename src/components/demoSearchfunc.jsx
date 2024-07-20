// SearchComponent.jsx
import React, { useState } from 'react';
import {Items}  from '.';
const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = Items.filter((Item) =>
    Item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <ul>
        {filteredItems.map((Item, index) => (
          <li key={index}>{Item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponenttwo;
