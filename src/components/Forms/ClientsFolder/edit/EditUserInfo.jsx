import React, { useRef, useEffect } from 'react'
import { Buttons, ButtonsTwo, Input, TextArea } from '../../../Buttons'
import { FaFacebook, FaPhoneAlt } from 'react-icons/fa'
import { BsTwitterX } from 'react-icons/bs'
import { ArrowLeft, ArrowRight, LinkedinIcon } from 'lucide-react'
import EditFreelancerInfo from './EditFreelancerInfo'
import EditEmployerInfo from './EditEmployerInfo'
import { useGlobalState } from "../GlobalStateProvider";
import CountriesList from '../CountriesList'
import LanguageList from '../LanguagesList'
import { useNavigate } from 'react-router'
import { GrReturn } from 'react-icons/gr'

const Divheader = "text-start pb-2";

const InfoSection = `mt-28 h-auto flex flex-col items-start lg:w-[33%] mx-4 my-3 border border-purple-700 rounded-3xl py-10 hover:border-neutral-400`;

const linkDivs = `flex items-center gap-x-3 mx-2 text-2xl`;

const EditUserInfo = () => {
  const { formData, setFormData, saveDataToFirestore, updateFormData } = useGlobalState();
  const nav = useNavigate()
  
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const toggleEmployerStatus = () => {
    setFormData(prevFormData => {
      const updatedFormData = {
        ...prevFormData,
        EmployerStatus: !prevFormData.EmployerStatus // Toggle status
      };
  
      // Save the updated form data after the state change
      saveToDB(updatedFormData);
      
      return updatedFormData;
    });
  };
  
  const saveToDB = async (updatedFormData) => {
    try {
      // Ensure the updatedFormData is passed correctly and saved to Firebase
      await updateFormData(updatedFormData); // Pass updated form data to update Firestore
      await saveDataToFirestore(updatedFormData); // Actually save to Firestore
      console.log("Data successfully updated!");
    } catch (error) {
      console.error("Error updating employer status:", error);
    }
  };
  
  const freeLanceInfoRef = useRef(null);
  const PersonalInfoRef = useRef(null);
  const ClientInfoRef = useRef(null);

  const ReturntoDashboard = () => {
    updateFormData();
    saveDataToFirestore();
    nav('/dashboard')
  };

  const ScrollToFreelanceInfo = () => {
    freeLanceInfoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    updateFormData();
    saveDataToFirestore();
  };

  const ScrollToClientInfo = () => {
    ClientInfoRef.current?.scrollIntoView({ behavior: "smooth" });
    updateFormData();
    saveDataToFirestore();
  };

    
  return (
    <div>
      <div className="w-[90%] border border-purple-700 rounded-3xl mx-auto overflow-hidden scrollbar-none">
        <div className="w-[300%] flex items-center justify-between">
          <div className="flex flex-col w-[100%] py-10 mt-2 h-auto mx-auto" ref={PersonalInfoRef}>
            <h1 className="text-3xl font-Ubuntu text-center mb-10">Personal Information</h1>
            <div className="mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="w-full md:w-auto md:mb-0">
                  <h1 className={Divheader}>User Name</h1>
                  <Input
                    type="text"
                    Labelvalue="User Name"
                    required
                    value={formData.userName}
                    onChange={(value) => handleInputChange("userName", value)}
                  />
                </div>
                <div className="w-full md:w-auto">
                  <h1 className={Divheader}>First Name</h1>
                  <Input
                    Labelvalue="First Name"
                    value={formData.firstName}
                    onChange={(value) => handleInputChange("firstName", value)}
                  />
                </div>
                <div className="w-full md:w-auto">
                  <h1 className={Divheader}>Middle Name</h1>
                  <Input
                    Labelvalue="Middle Name"
                    value={formData.middleName}
                    onChange={(value) => handleInputChange("middleName", value)}
                  />
                </div>
                <div className="w-full md:w-auto md:mb-0">
                  <h1 className={Divheader}>Last Name</h1>
                  <Input
                    Labelvalue="Last Name"
                    value={formData.lastName}
                    onChange={(value) => handleInputChange("lastName", value)}
                  />
                </div>
              </div>
              <CountriesList />
              <div className="flex flex-col md:flex-row w-full gap-5 items-center">
                <div className="w-full md:w-1/4 mb-2">
                  <h1 className={Divheader}>Mobile Number</h1>
                  <Input
                    type="number"
                    Labelvalue="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={(value) => handleInputChange("mobileNumber", value)}
                  />
                </div>
                <div className="w-full md:w-3/4">
                  <p className="font-semi-bold">Additional Address</p>
                  <Input
                    Labelvalue="Additional address"
                    width="full"
                    value={formData.additionalAddress}
                    onChange={(value) => handleInputChange("additionalAddress", value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start my-4">
                <div className="col-span-1">
                  <p className="font-semi-bold">Zip Code</p>
                  <Input
                    type="number"
                    Labelvalue="Zip Code"
                    width="full"
                    value={formData.zipCode}
                    onChange={(value) => handleInputChange("zipCode", value)}
                  />
                </div>
                <div className="col-span-1">
                  <LanguageList />
                </div>
              </div>
            </div>
            <div className="flex gap-y-2 flex-col my-5 md:w-1/2 md:mx-auto">
              <h1>Describe yourself</h1>
              <TextArea
                labelValue="Bio"
                value={formData.Bio}
                onChange={(value) => handleInputChange("Bio", value)}
              />
            </div>
            <div>
              <h1 className="text-center mb-2">Links</h1>
              <div className="flex sm:flex-row flex-col gap-y-8 justify-around lg:w-1/2 w-full mx-auto items-center mb-10">
                <div className={linkDivs}>
                  <LinkedinIcon />
                  <Input
                    Labelvalue="LinkedIn"
                    value={formData.LinkedIn}
                    onChange={(value) => handleInputChange("LinkedIn", value)}
                  />
                </div>
                <div className={linkDivs}>
                  <FaFacebook />
                  <Input
                    Labelvalue="Facebook"
                    value={formData.Facebook}
                    onChange={(value) => handleInputChange("Facebook", value)}
                  />
                </div>
                <div className={linkDivs}>
                  <BsTwitterX />
                  <Input
                    Labelvalue="Twitter"
                    value={formData.Twitter}
                    onChange={(value) => handleInputChange("Twitter", value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mx-auto">
              <div >
                <Buttons value="Return" icon={(<GrReturn/>)} click={ReturntoDashboard}/>
              </div>
              <div>
                <ButtonsTwo value="Next" icon={(<ArrowRight/>)}  click={ScrollToFreelanceInfo}/>
              </div>
            </div>
          </div>

          <div ref={freeLanceInfoRef}  className='w-[100%]'>
            <EditFreelancerInfo />
            <div className="flex gap-4 justify-center mx-auto">
              <div className="mt-10" onClick={ReturntoDashboard}>
                <Buttons value="Finish Up" />
              </div>
            </div>
              <div className="mt-4" onClick={ScrollToClientInfo}>
                <h1 className='text-center font-semibold hover:text-purple-500 cursor-pointer hover:underline'>
                  Would you like to be an employer 
                </h1>
              </div>
          </div> 

          <div ref={ClientInfoRef} className='w-[100%]'>
            <EditEmployerInfo />
            <div className="flex gap-4 justify-center">
              <div className="mt-10" onClick={ScrollToFreelanceInfo}>
                <Buttons value="Back" />
              </div>
              <div className="mt-10" onClick={toggleEmployerStatus}>
                <ButtonsTwo value="Save" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;
