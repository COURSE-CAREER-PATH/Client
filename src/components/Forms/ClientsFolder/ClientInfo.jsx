import React, { useEffect, useState } from 'react';
import BrandImageSelector from '../../Dashboard/BrandImageUploader';
import { useGlobalState } from './GlobalStateProvider';
import { ImLocation } from 'react-icons/im';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaPhoneAlt } from 'react-icons/fa';
import { LinkedinIcon } from 'lucide-react';
import { IoIosLink } from 'react-icons/io';
import { Buttons, StaticToastNotification } from '../../Buttons';

const ClientInfo = () => {
  const { formData, setFormData, saveDataToFirestore, updateFormData } = useGlobalState();
  const [displayToast, setDisplayToast] = useState(false);
  const [showMore, setShowMore] = useState(false); // State for toggling description

  const toggleDisplayToast = () => {
    setDisplayToast(!displayToast);
  };

  // Helper function to split the description into words
  const getDescriptionWords = (description) => description.split(' ');

  // Calculate the number of words and limit to 20
  const descriptionWords = formData.companyDescription ? getDescriptionWords(formData.companyDescription) : [];
  const isLongDescription = descriptionWords.length > 20;

  // Show full text if `showMore` is true or limit to 20 words otherwise
  const displayedDescription = isLongDescription && !showMore
    ? descriptionWords.slice(0, 20).join(' ') + '...'
    : formData.companyDescription;

  return (
    <div className='flex flex-col items-start relative mt-10 border rounded-3xl pt-5 h-auto mb-72'>
      {displayToast && <StaticToastNotification />}
      
      <div className="flex flex-col sm:flex-row px-4 sm:px-8 items-center justify-between w-full border-b">
        <div className="flex-shrink-0 mb-4 sm:mb-0">
          <BrandImageSelector />
        </div>
        <div className="flex flex-col justify-between gap-4 sm:gap-10 text-center sm:text-left">
          <div>
            {formData.companyName ? (
              <h1 className='text-2xl sm:text-3xl font-bold'>{formData.companyName}</h1>
            ) : (
              <h1 className='text-3xl sm:text-5xl font-bold'>No added Company Name</h1>
            )}
          <div>
            {formData.companyName ? (
              <h1 className='text-xl sm:text-xl'>{formData.companyPosition}</h1>
            ) : (
              <h1 className='text-3xl sm:text-5xl font-bold'>No added Company Position</h1>
            )}
          </div>
          </div>
          <div>
            {formData.companySize ? (
              <div className='flex items-center justify-center sm:justify-start'>
                <p className='text mr-2 sm:mr-3'>Company Size:</p>
                {formData.companySize}
                <p className='mx-1 text-lg sm:text-xl'>employees</p>
              </div>
            ) : (
              <p>Add Company size</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center w-full mt-4 sm:mt-0">
        <div className="w-full sm:w-[60%]">
          <div className="px-4 sm:px-8 w-full border-b h-auto flex flex-col items-center justify-center py-2">
            {formData.companyAddress ? <p>{formData.companyAddress}</p> : <p>No added company address</p>}
          </div>
          <div className="px-4 sm:px-8 h-auto sm:h-52 flex flex-col items-center justify-center py-2 overflow-y-auto">
            {formData.companyDescription ? <p>{displayedDescription}</p> : <p>No added company description</p>}
            {isLongDescription && (
              <button
                className="text-blue-500 hover:underline mt-2"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        </div>
        
        <div className="px-4 sm:px-8 w-full sm:w-[40%] border-t sm:border-l h-auto sm:h-64 mt-4 sm:mt-0">
          <h1 className='mb-3'>Company Links</h1>
          <div className="flex-wrap flex items-center text-2xl justify-around gap-5">
            <a href={formData.companyLinkedIn || '/*'} target='_blank' rel="noopener noreferrer">
              <LinkedinIcon />
            </a>
            <a href={formData.companyFacebook || '/*'} target='_blank' rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href={formData.companyTwitter || '/*'} target='_blank' rel="noopener noreferrer">
              <BsTwitterX />
            </a>
            <a href={formData.companyWebsite || '/*'} target='_blank' rel="noopener noreferrer">
              <IoIosLink />
            </a>
          </div>
          <div className="my-5">
            <h1 className='mb-2'>Office Phone</h1>
            <a href={`tel: ${formData.companyPhone || '/*'}`} target='_blank' rel="noopener noreferrer" className='text-xl'>
              <FaPhoneAlt />
            </a>
          </div>
          <div className='px-4 sm:px-8'>
            <Buttons value={'Disable Employer status'} click={toggleDisplayToast} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
