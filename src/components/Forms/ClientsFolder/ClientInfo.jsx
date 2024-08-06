import React from 'react'
import BrandImageSelector from '../../Dashboard/BrandImageUploader'
import { useGlobalState } from './GlobalStateProvider'
import { ImLocation } from 'react-icons/im'
import { BsTwitterX } from 'react-icons/bs'
import { FaFacebook, FaPhoneAlt } from 'react-icons/fa'
import { LinkedinIcon } from 'lucide-react'
import { IoIosLink } from 'react-icons/io'

const ClientInfo = () => {
  const {formData} = useGlobalState()
  return (
    <div className='flex flex-col items-start px-8 gap-y-5'>
      <div className="">
        <BrandImageSelector/>
      </div>
      <div className="">
        {formData.companyName? (
          <h1 className='text-3xl font-bold text-neutral-200'>
            {formData.companyName}
          </h1>
        ) : (
          <h1 className='text-5xl font-bold text-neutral-200'>
            No added Company Name
          </h1>
        )}
      </div>
        <div className="">
          {formData.companySize ? (
            <div className='flex items-center'>
              <p className='text mr-3'>
                Company Size:
              </p>
              {formData.companySize}
              <p className='mx-1 text-xl'>
                employees
              </p>
            </div>
          ) : (
            <p>
              Add Company size
            </p>
          )}
        </div>
        <div className="">
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
        </div>
        <div className="">
          {formData.companyAddress? (
            <p>
              {formData.companyAddress}
            </p>
          ):(
            <p>
              No added company address
            </p>
          )}
        </div>
        <div className="">
          {formData.companyDescription? (
            <p>
              {formData.companyDescription}
            </p>
          ):(
            <p>
              No added company description
            </p>
          )}
        </div>
        <div className="mt-5">
          <h1 className='mb-3'>
            Company Links
          </h1>
          <div className="flex items-center text-2xl justify-around gap-5">
           <a href={formData.companyLinkedIn? formData.companyLinkedIn : '/*'} target='_blank' rel="noopener noreferrer">
            <LinkedinIcon/>
           </a>
           <a href={formData.companyFacebook? formData.companyFacebook : '/*'} target='_blank' rel="noopener noreferrer">
            <FaFacebook/>
           </a>
           <a href={formData.companyTwitter? formData.companyTwitter : '/*'} target='_blank' rel="noopener noreferrer">
            <BsTwitterX/>
           </a>
           <a href={formData.companyWebsite? formData.companyWebsite : '/*'} target='_blank' rel="noopener noreferrer">
            <IoIosLink/>
           </a>
          </div>
          <div className="my-5">
          <h1 className='mb-2'>
            Office Phone
          </h1>
           <a href={`tel: ${formData.companyPhone? formData.companyPhone : '/*'}`} target='_blank' rel="noopener noreferrer" className='text-xl'>
            <FaPhoneAlt/>
           </a>
          </div>
        </div>
    </div>
  )
}

export default ClientInfo