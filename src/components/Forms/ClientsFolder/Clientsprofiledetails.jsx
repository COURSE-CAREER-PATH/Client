import React from 'react'
import MultiSelectDropdown from './MultiSelectDropdown'
import { Buttons, Input } from '../../Buttons'

const Clientsprofiledetails = () => {
  return (
    <div className='flex flex-col justify-center items-center w-1/2 mx-auto'>
      <div className="">
      <h1 className='text-xl '>
            Job Title
        </h1>
        <Input Labelvalue={'Job'}/>
      </div>
      <div className="">
        <h1 className='text-xl '>
            Services
        </h1>
        <p className=' tracking-tight'>
          What sevice do you need 
        </p>
      <MultiSelectDropdown/>
      </div>
    </div>
  )
}

export default Clientsprofiledetails