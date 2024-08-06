// GlobalStateContext.js
import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    aditionalAddress: '',
    zipCode: '',
    Country: '',
    State: '',
    Email: '',
    Password: '',
    ProfilePicture: '',
    Language: '',
    Bio: '',
    LinkedIn: '',
    Facebook: '',
    Twitter: '',
    Skills: ``,
    Overview: '',
    Profession: '',
    rating: '',
    Portfolio: '',
    companyLogo: '',
    companyName: '',
    companyPosition: '',
    companySize: '',
    companyAddress: '',
    companyDescription: '', 
    companyLinkedIn: '',
    companyFacebook: '',
    companyTwitter: '',
    companyWebsite: '',
    companyPhone: '',
  });

  return (
    <GlobalStateContext.Provider value={{ formData, setFormData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
