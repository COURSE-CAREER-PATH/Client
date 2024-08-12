// ClientspersonalInfo.js
import React, {useRef, useState, useEffect} from 'react';
import { Buttons, ButtonsTwo, Input, TextArea, } from '../../Buttons';
import CountriesList from './CountriesList';
import ImageSelector from '../../Dashboard/ImageSelector';
import { useGlobalState } from './GlobalStateProvider';
import { ImLocation } from 'react-icons/im';
import LanguagesList from './LanguagesList';
import { DownloadIcon, LinkedinIcon } from 'lucide-react';
import { FaFacebook, FaPhoneAlt } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { X } from 'lucide-react';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import FreelancerInfo from './FreelancerFolder/FreeLancerInfo';
import MultiSelectDropdown from './MultiSelectDropdown';
import PortFolioLinks from './Portfolio/PortFolioLinks';
import ClientInfo from './ClientInfo';
import CompanySizeSelector from './CompanySizeSelector';
import { IoIosLink } from 'react-icons/io';



const Divheader = 'text-center pb-2';

const InfoSection = `mt-28 h-auto flex flex-col  items-start lg:w-[33%] mx-4 my-3 border border-purple-700 rounded-3xl py-10 hover:border-neutral-400`

const linkDivs = `flex items-center gap-x-3 mx-2 text-2xl`

const ClientspersonalInfo = () => {
  const divRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    

    // Attach the event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { formData, setFormData,  saveDataToFirestore, loadDataFromFirestore } = useGlobalState();
  const [fullProfileImage, setFullProfileImage] = useState(false);
  const PersonalInfoRef = useRef(null)
  const freeLanceInfoRef = useRef(null)
  const ClientInfoRef = useRef(null)
  const topRef = useRef(null)
  const toggleProfileImage = () => {
    setFullProfileImage(!fullProfileImage);
    if (fullProfileImage) {
      enablePageScroll()
    }else{
      disablePageScroll()
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const ScrollToPersonalInfo = ()=>{
    PersonalInfoRef.current.scrollIntoView({behavior: 'smooth'})
  }
  const ScrollToFreelanceInfo = ()=>{
    freeLanceInfoRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
  }
  const ScrollToTop = ()=>{
    topRef.current.scrollIntoView({behavior: 'smooth'})
  }
  const ScrollToClientInfo = ()=>{
    ClientInfoRef.current.scrollIntoView({behavior: 'smooth'})
  }
    const finishUp = ()=>{
    saveDataToFirestore()
    ScrollToTop()
  }

  return (
    // main div
    <div className=" font-josefin" ref={divRef}>
      {/* Profile photo full view */}
      {fullProfileImage && (
        <div className="absolute inset-0 flex items-center justify-center z-30 backdrop-blur-2xl">
          <div className="relative h-auto w-full max-w-screen-md p-4">
            <button onClick={toggleProfileImage} className="absolute top-2 right-2 text-white  flex flex-col gap-8">
              <X className='transform active:rotate-180 transition duration-500 ease-in-out'/>
              <a href={formData.ProfilePicture} download={formData.ProfilePicture} className='transform active:animate-bounce transition duration-500 ease-in-out'>
              <DownloadIcon/>
              </a>
            </button>
            <div className="flex items-center justify-center ">
              <img src={formData.ProfilePicture} alt="No Profile Photo" className="max-h-[90dvh] w-[90%] rounded-3xl border border-purple-700" />
            </div>
          </div>
        </div>
      )}
      {/* All Info Div */}
      <div className='flex flex-col lg:flex-row' ref={topRef}>

      {/* Main Profile */}
      <div className={`${InfoSection} px-10 relative`}>
        <div onClick={toggleProfileImage} >
        <ImageSelector />
        </div>
        <div className="md:text-4xl lg:text-5xl text-2xl font-bold flex gap-2">
          {formData.userName? (
            <div>
              <h1>{formData.userName}</h1>
            </div>
          ) : (
            <p>
              User Name
            </p>
          )}
        </div>
        <div className="text-sm my-3 md:my-5 text-start">
         {
          formData.Bio? (
              formData.Bio
          )
          :
              <p>
                Edit Bio and Describe yourself
              </p>
         }
        </div>
        <h1 className='flex gap-2 text-sm my-1 md:my-2'>
          <p>
            <ImLocation/>
          </p>
          <p>
            {formData.Country} -
          </p>
          <p>
            {formData.State} -
          </p>
          <p>
            {formData.City}.
          </p>
        </h1>
        <h1>
          {formData.aditionalAddress ? (
            <p>
              {formData.aditionalAddress}
            </p>
          ): (
            <p>
              No added address 
            </p>
          )}
        </h1>
        <h1 className='flex gap-3'>
          I speak: {
            formData.Language? (
              formData.Language
            )
            :
            <p className=''>
              Add Language
            </p>
          }
        </h1>
        <h1>
          {
            formData.mobileNumber || formData.Email ? 
            <h1>
              {formData.mobileNumber}
            </h1>
            ||
            <h1>
              {formData.Email}
            </h1>
            :
            <p>
              Add contact Information
            </p>
          }
        </h1>
        <div className="mt-5">
          <h1 className='mb-3'>
            Social Media Links
          </h1>
          <div className="flex items-center text-2xl justify-around">
           <a href={formData.LinkedIn? formData.LinkedIn : '/*'} target='_blank' rel="noopener noreferrer">
            <LinkedinIcon/>
           </a>
           <a href={formData.Facebook? formData.Facebook : '/*'} target='_blank' rel="noopener noreferrer">
            <FaFacebook/>
           </a>
           <a href={formData.Twitter? formData.Twitter : '/*'} target='_blank' rel="noopener noreferrer">
            <BsTwitterX/>
           </a>
          </div>
        </div>
        <div className="mx-auto absolute bottom-5 left-1/3" onClick={ScrollToPersonalInfo}>
        <Buttons value={'Edit profile'}/>
      </div>
      </div>
     <div className={`${InfoSection} relative`}>
        <FreelancerInfo/>
        <div className="mx-auto absolute bottom-5 left-1/3" onClick={ScrollToFreelanceInfo}>
        <ButtonsTwo value={'Edit Freelance Info'}/>
        </div>
      </div>
      {/* Info as Client */}
      <div className={`${InfoSection} relative`}>
      <ClientInfo/>
      <div className="mx-auto absolute bottom-5 left-1/3" onClick={ScrollToClientInfo}>
        <Buttons value={'Edit Client Info'}/>
        </div>
      </div>
      </div>

      <div className=" w-[90%] border border-purple-700 rounded-3xl mx-auto overflow-hidden scrollbar-none">
        <div className="w-[300%] flex items-center justify-between">
      <div className="flex flex-col  w-[100%] py-10 mt-2 px-5 h-auto "  ref={PersonalInfoRef}>
        <h1 className="text-3xl font-Ubuntu text-neutral-400 text-center mb-10">
          Personal Information
        </h1>
        <div className="flex flex-col gap-4 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="w-full md:w-auto">
              <h1 className={Divheader}>First Name</h1>
              <Input
                Labelvalue="First Name"
                value={formData.firstName}
                onChange={(value) => handleInputChange('firstName', value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <h1 className={Divheader}>Middle Name</h1>
              <Input
                Labelvalue="Middle Name"
                value={formData.middleName}
                onChange={(value) => handleInputChange('middleName', value)}
              />
            </div>
            <div className="w-full md:w-auto md:mb-0">
              <h1 className={Divheader}>Last Name</h1>
              <Input
                Labelvalue="Last Name"
                value={formData.lastName}
                onChange={(value) => handleInputChange('lastName', value)}
              />
            </div>
            <div className="w-full md:w-auto mb-10 md:mb-0">
              <h1 className={Divheader}>Mobile Number</h1>
              <Input
                Labelvalue="Mobile Number"
                Number="number"
                value={formData.mobileNumber}
                onChange={(value) => handleInputChange('mobileNumber', value)}
              />
            </div>
          </div>
          <CountriesList />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="col-span-2">
              <p className="font-semi-bold">Aditional Address</p>
              <Input
                Labelvalue={'Additional address'}
                width={'full'}
                value={formData.aditionalAddress}
                onChange={(value) => handleInputChange('aditionalAddress', value)}
              />
            </div>
            <div className="col-span-1">
              <p className="font-semi-bold ">Zip Code</p>
              <Input
                Labelvalue={'Zip Code'}
                width={'full'}
                Number={'number'}
                value={formData.zipCode}
                onChange={(value) => handleInputChange('zipCode', value)}
              />
            </div>
              <div className="col-span-1">
              <LanguagesList/>
              </div>
          </div>
        </div>
        <div className="my-8 flex flex-col text-center">
          <h1>
            Describe yourself 
          </h1>
         <TextArea labelValue={'Bio'} 
          value={formData.Bio}
          onChange={(value) => handleInputChange('Bio', value)}/>
        </div>
        <div className="">
        <h1 className='text-center mb-2'>
            Links
          </h1>
        <div className="flex sm:flex-row flex-col gap-y-8 justify-around lg:w-1/2 w-full mx-auto items-center mb-10">
          <div className={linkDivs}>
            <LinkedinIcon/>
           <Input Labelvalue={'LinkedIn'}
            value={formData.LinkedIn}
            onChange={(value) => handleInputChange('LinkedIn', value)}
           />
          </div>
          <div className={linkDivs}>
            <FaFacebook/>
           <Input Labelvalue={'Facebook'}
            value={formData.Facebook}
            onChange={(value) => handleInputChange('Facebook', value)}
           />
          </div>
          <div className={linkDivs}>
            <BsTwitterX/>
           <Input Labelvalue={'Twitter'}
            value={formData.Twitter}
            onChange={(value) => handleInputChange('Twitter', value)}
           />
          </div>
        </div>
        </div>
        <div className="flex items-center w-1/7 mx-auto">
        <div className='' onClick={ScrollToTop}>
      <Buttons value={'Back to top'}/>
      </div>
        <div onClick={ScrollToFreelanceInfo}>
        <Buttons value={'Next'}/>
        </div>
        </div>
      </div>
      
      <div className='my-10 w-[100%]  h-auto py-10 flex flex-col' ref={freeLanceInfoRef}>
      <div className="gap-10 flex flex-col capitalize text-center">
          <h1 className='text-center my-10 mb-5 text-3xl text-neutral-500 '>
            Info As Freelancer
          </h1>
          <div className="md:w-1/2 lg:w-1/4 mx-auto ">
          <p>
            What Is Your Dominant Profession
          </p>
          <Input Labelvalue={'Profession'}
           width={'full'}
           value={formData.Profession}
           onChange={(value) => handleInputChange('Profession', value)}
          />
          </div>
          <div className="mx-5">
            <p>
              work history and experience overview
            </p>
            <TextArea labelValue={'Overview'}
             value={formData.Overview}
             onChange={(value) => handleInputChange('Overview', value)}
            />
          </div>

          <div className="md:w-1/2 lg:w-1/4 mx-auto">
              <p>
                List of skill set you can offer
              </p>
            <MultiSelectDropdown/>
          </div>
          <div className="">
            <PortFolioLinks/>
          </div>
          </div>
          
          <div className="flex justify-around mx-auto">
      <div className="mt-10" onClick={ScrollToPersonalInfo}>
        <Buttons value={'Back'}/>
      </div>
      <div className='mx-auto mt-10' onClick={ScrollToTop}>
      <Buttons value={'Back to top'}/>
      </div>
      <div className="mt-10" onClick={ScrollToClientInfo}>
        <Buttons value={'Next'}/>
      </div>
          </div>
      </div>
      <div className="w-[100%] mx-auto flex flex-col h-auto text-center px-5 md:px-16"  ref={ClientInfoRef}>
         <div className="w-full lg:w-1/2 mx-auto  gap-y-3 flex flex-col">
         <h1 className='text-3xl font-bold text-neutral-500'>
          Info As Client 
         </h1>
         <div className="flex flex-col md:flex-row w-1/2 mx-auto gap-x-4">
          <div className="">
          <h1 className='text-sm text-start text-neutral-200'>
          Company Name  
         </h1>
         <Input
                Labelvalue={'Company Name'}
                width={'full'}
                value={formData.companyName}
                onChange={(value) => handleInputChange('companyName', value)}
              />
          </div>

          <div className="">
          <h1 className='text-sm text-start text-neutral-200'>
          Company Position  
         </h1>
         <Input
                Labelvalue={'Company Position'}
                width={'full'}
                value={formData.companyPosition}
                onChange={(value) => handleInputChange('companyPosition', value)}
              />
          </div>
          </div>
          <div className="">
              <CompanySizeSelector/>
          </div>
          <div className="flex flex-col ">
          <h1 className='text-sm text-center text-neutral-200'>
          Company Address  
         </h1>
          <TextArea labelValue={'Company Address'} 
          value={formData.companyAddress}
          onChange={(value) => handleInputChange('companyAddress', value)}/> 
          </div>
          <div className="flex flex-col ">
          <h1 className='text-sm text-center text-neutral-200'>
          Company Description  
         </h1>
          <TextArea labelValue={'Company Description'} 
          value={formData.companyDescription}
          onChange={(value) => handleInputChange('companyDescription', value)}/> 
          </div>
         <div className="my-10 mx-auto w-1/2 lg:w-[100%]">
        <h1 className='text-center mb-2'>
            Links
          </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-5 mx-auto">
          <div className={linkDivs}>
            <LinkedinIcon/>
           <Input Labelvalue={'LinkedIn'}
            value={formData.companyLinkedIn}
            onChange={(value) => handleInputChange('companyLinkedIn', value)}
           />
          </div>
          <div className={linkDivs}>
            <FaFacebook/>
           <Input Labelvalue={'Facebook'}
            value={formData.companyFacebook}
            onChange={(value) => handleInputChange('companyFacebook', value)}
           />
          </div>
          <div className={linkDivs}>
            <BsTwitterX/>
           <Input Labelvalue={'Twitter'}
            value={formData.companyTwitter}
            onChange={(value) => handleInputChange('companyTwitter', value)}
           />
          </div>
          <div className={linkDivs}>
            <IoIosLink/>
           <Input Labelvalue={'Website'}
            value={formData.companyWebsite}
            onChange={(value) => handleInputChange('companyWebsite', value)}
           />
          </div>
        </div>
        </div>
          <div className=''>
          <h1 className='text-center mb-2'>
            Phone
          </h1>
          <div className="grid grid-cols-12 items-center">
            <FaPhoneAlt/>
            <div className="col-span-11">
           <Input Labelvalue={'Phone'}
            value={formData.companyPhone}
            onChange={(value) => handleInputChange('companyPhone', value)}
            Number={'Number'}
           />
            </div>
          </div>
          </div>
          <div className="flex items-center w-1/7 mx-auto mt-10">
          <div onClick={ScrollToFreelanceInfo}>
        <Buttons value={'Back'}/>
        </div>
        <div className='' onClick={finishUp}>
      <ButtonsTwo value={'Finish and submit'}/>
      </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default ClientspersonalInfo;
