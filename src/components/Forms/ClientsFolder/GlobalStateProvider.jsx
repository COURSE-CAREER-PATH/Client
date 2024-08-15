import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { dataBase } from '../../config/firebase';
import { getAuth } from 'firebase/auth';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    uid: '',
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    aditionalAddress: '',
    Email: '',
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

  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null); 
      }      
    });

    return () => unsubscribe();
  }, [auth]);

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

  useEffect(() => {
    if (uid) {
      setLoading(true);
      const docRef = doc(dataBase, "userInfo", uid);

      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setFormData(docSnap.data());
          console.log("Data retrieved successfully!");
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      });

      return () => {
        unsubscribe();
        setLoading(false);
      };
    }
  }, [uid]);

  const updateFormData = async () => {
    if (!uid) {
      console.error("Error: User must be logged in to update data.");
      return;
    }

    try {
      const userDocRef = doc(dataBase, "userInfo", uid); 
      await updateDoc(userDocRef, formData);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <GlobalStateContext.Provider value={{ formData, setFormData, saveDataToFirestore, updateFormData, loading }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);