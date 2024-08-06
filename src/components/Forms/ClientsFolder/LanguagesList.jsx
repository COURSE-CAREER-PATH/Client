// LanguagesDropdown.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalState } from './GlobalStateProvider';

const LanguagesDropdown = () => {
  const {  setFormData } = useGlobalState();

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const languagesData = response.data.reduce((acc, country) => {
          const countryLanguages = Object.values(country.languages || {});
          countryLanguages.forEach((language) => {
            if (!acc.includes(language)) {
              acc.push(language);
            }
          });
          return acc;
        }, []);
        setLanguages(languagesData.sort());
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const handleChange = (event) => {
    const selectedLang = event.target.value;
    setSelectedLanguage(selectedLang);
    handleInputChange('Language', selectedLang);
  };

  return (
    <div className=''>
      <h2 className="">Languages</h2>
      <div className="">
        <select
          value={selectedLanguage}
          onChange={handleChange}
          className="p-2 border border-neutral-400 rounded-xl py-3 w-full outline-0 focus:border-purple-700"
        >
          <option value="" disabled>Select a language</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguagesDropdown;
