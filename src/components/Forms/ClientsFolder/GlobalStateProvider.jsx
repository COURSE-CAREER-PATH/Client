import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { dataBase } from '../../config/firebase';
import { getAuth } from 'firebase/auth';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [uid, setUid] = useState(null);
  const [formData, setFormData] = useState({
    uid: '',
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    Password: '',
    PasswordTwo: '',
    aditionalAddress: '',
    Email: '',
    zipCode: '',
    Country: '',
    State: '',
    City: '',
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
    Portfolio: [],
    links: [],
    EmployerStatus: false,
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

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
        setFormData(prevFormData => ({
          ...prevFormData,
          uid: user.uid 
        }));
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
      <div className="fixed -z-20 h-full w-full bg-black"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div><div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#000,#020617)]"></div></div>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
