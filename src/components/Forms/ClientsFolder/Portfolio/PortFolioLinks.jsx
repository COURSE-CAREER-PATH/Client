import React, { useState } from 'react';
import { useGlobalState } from '../GlobalStateProvider';
import { Buttons, ButtonsTwo } from '../../../Buttons';

const PortfolioLinks = () => {
  const { formData, setFormData } = useGlobalState();
  const [links, setLinks] = useState(formData.links || [{ name: '', url: '' }]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedLinks = [...links];
    updatedLinks[index][name] = value;
    setLinks(updatedLinks);
    setFormData({ ...formData, links: updatedLinks });
  };

  const addLink = () => {
    setLinks([...links, { name: '', url: '' }]);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    setFormData({ ...formData, links: updatedLinks });
  };

  return (
    <div className='w-full md:w-1/2 flex mx-auto flex-col'>
      {links.map((link, index) => (
        <div key={index}  className='flex items-center justify-around flex-col md:flex-row gap-6 mb-4'>
          <div className="relative">
          <input
          id='linkName'
          placeholder=""
           className='block px-2.5 pb-2.5 pt-4 text-sm text-neutral-300 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-neutral-300 focus:outline-none focus:ring-0 focus:border-purple-700 peer border w-full py-2 rounded-xl'
            type="text"
            name="name"
            value={link.name}
            onChange={(e) => handleChange(index, e)}
            style={{ marginRight: '10px' }}
          />
          <label htmlFor="linkName"
           className="absolute text-sm text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-4 scale-75 top-2 origin-[0] dark:bg-gray-900 px-0 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-neutral-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto backdrop-blur-3xl start-1 ml-2"
          >
            Project Name
          </label>
          </div>
          <div className="relative">
          <input
          id='URL'
          className='block px-2.5 pb-2.5 pt-4 text-sm text-neutral-300 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-neutral-300 focus:outline-none focus:ring-0 focus:border-purple-700 peer border w-full py-2 rounded-xl'
            type="text"
            name="url"
            value={link.url}
            onChange={(e) => handleChange(index, e)}
            placeholder=""
          />
          <label htmlFor="URL"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-4 scale-75 top-2 origin-[0] dark:bg-gray-900 px-0 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-neutral-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto backdrop-blur-3xl start-1 ml-2"
          >
            Project Url
          </label>
          </div>
          <span type="button" onClick={() => removeLink(index)} style={{ marginLeft: '10px' }}>
            <ButtonsTwo value={'Remove'}/>
          </span>
        </div>
      ))}
      <span type="button" onClick={addLink}>
        <Buttons value={'Add new link'}/>
      </span>
    </div>
  );
};

export default PortfolioLinks;
