import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { dataBase } from '../../config/firebase';
import { getAuth } from 'firebase/auth';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    aditionalAddress: '',
    zipCode: '',
    Country: '',
    State: '',
    ProfilePicture: '',
    Language: '',
    Bio: '',
    LinkedIn: '',
    Facebook: '',
    Twitter: '',
    Jobs: [],
    Overview: '',
    Profession: '',
    ratings: [],
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

  const auth = getAuth(); // Get the Firebase Auth instance
  const [uid, setUid] = useState(null);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null); // User is signed out
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [auth]);

  // Function to save formData to Firestore
  const saveDataToFirestore = async () => {
    try {
      if (!uid) {
        console.error("Error: User must be logged in to save data.");
        return;
      }

      await setDoc(doc(dataBase, "userInfo", uid), formData);
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  // Function to retrieve data from Firestore
  useEffect(() => {
    if (uid) {
      const docRef = doc(dataBase, "userInfo", uid);

      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setFormData(docSnap.data());
          console.log("Data retrieved successfully!");
        } else {
          console.log("No such document!");
        }
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [uid]);

  return (
    <GlobalStateContext.Provider value={{ formData, setFormData, saveDataToFirestore }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
