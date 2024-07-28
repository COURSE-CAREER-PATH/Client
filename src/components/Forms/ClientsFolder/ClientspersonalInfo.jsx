// ClientspersonalInfo.js
import React, {useRef, useState} from 'react';
import { Buttons, Input, TextArea, } from '../../Buttons';
import CountriesList from './CountriesList';
import ImageSelector from '../../Dashboard/ImageSelector';
import { useGlobalState } from './GlobalStateProvider';
import { ImLocation } from 'react-icons/im';
import LanguagesList from './LanguagesList';
import { LinkedinIcon } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { X } from 'lucide-react';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
const Divheader = 'text-center pb-2';

const InfoSection = `mt-28 h-auto flex flex-col  items-center justify-center lg:w-[33%] mx-4 my-3 border border-purple-700 rounded-3xl py-10 hover:border-neutral-400 `

const linkDivs = `flex items-center gap-x-3 mx-2 text-2xl`

const ClientspersonalInfo = () => {
  const { formData, setFormData } = useGlobalState();
  const [fullProfileImage, setFullProfileImage] = useState(false);
  const PersonalInfoRef = useRef(null)
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
  return (
    <div className=" font-josefin">
      {fullProfileImage && (
        <div className="absolute inset-0 flex items-center justify-center z-30 backdrop-blur-2xl">
          <div className="relative h-auto w-full max-w-screen-md p-4">
            <button onClick={toggleProfileImage} className="absolute top-2 right-2 text-white transform active:rotate-180 transition duration-500 ease-in-out">
              <X />
            </button>
            <div className="flex items-center justify-center ">
              <img src={formData.ProfilePicture} alt="No Profile Photo" className="max-h-[90dvh] w-[90%] rounded-3xl border border-purple-700" />
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col lg:flex-row'>
      <div className={InfoSection}>
        <div onClick={toggleProfileImage}>
        <ImageSelector />
        </div>
        <div className="md:text-2xl lg:text-3xl text-2xl font-bold flex gap-2">
          {formData.firstName && formData.lastName ? (
            <div>
              <h1>{formData.firstName}</h1>
              <h1>{formData.lastName}</h1>
            </div>
          ) : (
            <p>
              User Name
            </p>
          )}
        </div>
        <div className="text-sm my-3 md:my-5 text-center max-w-72 md:max-w-96">
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
           <a href={formData.LinkedIn? formData.LinkedIn : 'https://www.linkedin.com/'} target='_blank' rel="noopener noreferrer">
            <LinkedinIcon/>
           </a>
           <a href={formData.Facebook? formData.Facebook : 'https://www.facebook.com/'} target='_blank' rel="noopener noreferrer">
            <FaFacebook/>
           </a>
           <a href={formData.Twitter? formData.Twitter : 'https://www.x.com/'} target='_blank' rel="noopener noreferrer">
            <BsTwitterX/>
           </a>
          </div>
        </div>
        <div className="mt-10" onClick={ScrollToPersonalInfo}>
        <Buttons value={'Edit profile'}/>
      </div>
      </div>
      <div className={InfoSection}>
      Info As Client
      </div>
     <div className={InfoSection}>
        Info As freelancer
      </div>
      </div>
      <form className="flex flex-col w-[90%] border border-purple-700 rounded-3xl mx-auto py-10 mt-2 px-5 h-auto" ref={PersonalInfoRef}>
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
        <div className="flex sm:flex-row flex-col gap-y-8 justify-around lg:w-1/2 w-full mx-auto items-center">
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
      </form>
    </div>
  );
};

export default ClientspersonalInfo;
