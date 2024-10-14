import React, { useState, useEffect } from 'react';
import Mouaudepartments from './CoursesIndex';
import Vector from '../../assets/img/coursesvector.png';
import { Link } from 'react-router-dom';

function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(Mouaudepartments);
  const [filteredItems, setFilteredItems] = useState(items);
  const [visibleCount, setVisibleCount] = useState(10); 

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.course.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSeeMore = () => {
    setVisibleCount(prevCount => (prevCount === filteredItems.length ? 10 : filteredItems.length));
  };

  return (
    <div>
      <h1 className="text-lg text-center  uppercase">
        Find a job best suitable for you profession
      </h1>
      <input
        type='text'
        value={searchQuery}
        onChange={handleSearch}
        placeholder='Search'
        className='p-2 border border-neutral-300 rounded-2xl translate-y-20 focus:border-purple-700 outline-0 hover:border-neutral-500'
      />
      <div className='flex flex-wrap mt-24'>
        <div className="flex flex-wrap lg:w-1/2 w-full">
          {filteredItems.slice(0, visibleCount).map((item, index) => (
            <Link to={'/login'}> 
            <div key={index} className=''>
              <li 
                className='m-2 list-none border-[2px] border-purple-700 px-4 py-4 rounded-full active:border-neutral-300  hover:animate-pulse transition cursor-pointer'
              >
                {item.course}
              </li>
            </div>
            </Link>
          ))}
          {filteredItems.length > 10 && (
            <button
              onClick={handleSeeMore}
              className='mt-4 px-4 py-2   hover:animate-pulse transition '
            >
              {visibleCount === filteredItems.length ? 'See Less...' : 'See More...'}
            </button>
          )}
        </div>            
        <div className="w-1/2 md:flex hidden h-1/2">
          <img src={Vector} alt="Vector"/>
        </div>
      </div>
    </div>
  );
}

export default Courses;
