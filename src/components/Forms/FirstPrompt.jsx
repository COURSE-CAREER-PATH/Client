import React from 'react'
import { Link } from 'react-router-dom'
import Client from '../../assets/img/img31.png'
import Freelancer from '../../assets/img/img29.png'
import { Buttons } from '../Buttons'




const DivStyles = `w-1/2 md:w-1/3 h-auto p-10 border-[0.1rem] border-purple-700 m-10 rounded-3xl items-center flex flex-col hover:border-neutral-400`


const FirstPrompt = () => {
  return (
    <div>
    <div className='flex flex-col md:flex-row justify-center items-center'>
        <div className={`${DivStyles}`}>
        <img src={Client} alt=""  className='mb-10 md:mb-5 bg-neutral-300 rounded-3xl'/>
        <Link to={'/dashboard'}>
            <Buttons value={'I Am a Client'}/>
        </Link>
        </div>
        <div className={`${DivStyles}`}>
            <img src={Freelancer} alt="" className='mb-10 md:mb-5 bg-neutral-300 rounded-3xl'/>
            <Buttons value={'I Am a Freelancer'}/>
        </div>
    </div>
    <Link to={'/login'} className='text-center'>
            <Buttons value={'Go back'}/>
        </Link>
    </div>
  )
}

export default FirstPrompt