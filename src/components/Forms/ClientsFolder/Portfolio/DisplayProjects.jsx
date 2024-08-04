import React from 'react';
import { useGlobalState } from '../GlobalStateProvider';
import { IoLogoLaravel } from 'react-icons/io5';
import { IoIosLink } from 'react-icons/io';

const DisplayProjects = () => {
  const { formData } = useGlobalState();
  const links = formData.links || []; // Ensure there's a default empty array if links are not present

  return (
    <div>
      {links.length === 0 ? (
        <h2 className='text-4xl mx-10'>No Project Links</h2>
      ) : (
        <ol>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer"   className='text-2xl mx-10 flex gap-4'>
                <span>
                <IoIosLink/>
                </span>
                {link.name}
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default DisplayProjects;
