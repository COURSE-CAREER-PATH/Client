import React, { useState } from 'react';

const ItemList = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const items = [
    { id: 1, value: 'Item 1' },
    { id: 2, value: 'Item 2' },
    { id: 3, value: 'Item 3' },
  ];

  const handleClick = (item) => {
    setSelectedItem(item.value);
    console.log(item.value);
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id} onClick={() => handleClick(item)}>
            {item.value}
          </li>
        ))}
      </ul>
      {selectedItem && <p>Selected Item: {selectedItem}</p>}
    </div>
  );
};

export default ItemList;
