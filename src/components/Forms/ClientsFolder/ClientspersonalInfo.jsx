import React, { useState } from 'react';
import { Buttons, Input } from '../../Buttons';
import CountriesList from './CountriesList';
import { Link } from 'react-router-dom';
import ImageSelector from '../../Dashboard/ImageSelector';

const Divheader = 'text-center pb-2';


 const ClientspersonalInfo = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    aditionalAddress: '',
    zipCode: '',
  }
);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);

  return (
    <div className="">
       <div className='h-screen flex flex-col items-center '>
       <ImageSelector />
       <div >
        {formData.userName? <h1 className="md:text-2xl lg:text-3xl text-xl font-bold">
          {formData.userName}
        </h1> : <p className='font-thin text-lg'>
          Scroll down to add  User Name
          </p>}
       </div>
    </div>
      <div className="flex flex-col w-[90%] border border-purple-700 rounded-3xl mx-auto py-10 mt-2 px-5 h-auto">
        <h1 className="text-3xl font-Ubuntu text-neutral-400 text-center mb-10">
          Personal Information
        </h1>
        <form className="flex flex-col gap-4 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="w-full md:w-auto">
            <h1 className={Divheader}>
              First Name
            </h1>
            <Input 
              Labelvalue="First Name" 
              value={formData.firstName} 
              onChange={(value) => handleInputChange('firstName', value)} 
            />
          </div>
          <div className="w-full md:w-auto">
            <h1 className={Divheader}>
              Middle Name
            </h1>
            <Input 
              Labelvalue="Middle Name" 
              value={formData.middleName} 
              onChange={(value) => handleInputChange('middleName', value)} 
            />
          </div>
          <div className="w-full md:w-auto md:mb-0">
            <h1 className={Divheader}>
              Last Name
            </h1>
            <Input 
              Labelvalue="Last Name" 
              value={formData.lastName} 
              onChange={(value) => handleInputChange('lastName', value)} 
            />
          </div>
          <div className="w-full md:w-auto mb-10 md:mb-0">
            <h1 className={Divheader}>
              Mobile Number
            </h1>
            <Input 
              Labelvalue="Mobile Number" 
              Number="number" 
              value={formData.mobileNumber} 
              onChange={(value) => handleInputChange('mobileNumber', value)} 
            />
          </div>
          </div>
          <CountriesList/>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="col-span-3">
                <p className="font-semi-bold">
                  Aditional  Address
                </p>
                    <Input Labelvalue={'Additional address'} width={'full'} value={formData.aditionalAddress} onChange={(value)=> handleInputChange('aditionalAddress', value)}/>
            </div>
            <div className="">
                <p className="font-semi-bold ">
                    Zip Code
                </p>
                    <Input Labelvalue={'Zip Code'} width={'full'} Number={'number'} value={formData.zipCode} onChange={(value)=>handleInputChange('zipCode', value)}/>
            </div>
                </div>
          <Link to={'/profile'}>
            <Buttons value={'Next'} />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ClientspersonalInfo;
