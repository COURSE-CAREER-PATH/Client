// import { Hero } from "."
import React from 'react';
import Herobg from '../assets/videos/vid1.mp4'
import Herobg2 from '../assets/img/img8.jpg'
import { Buttons,  ButtonsTwo } from "./Buttons";
import { Link } from 'react-router-dom';


const Herosection = () => {
  return (
    <div className=''>
     <div className="mt-44  z-20 font-Ubuntu">
      <h1 className='text-purple-700 text-2xl lg:mt-80 lg:text-7xl lg:mb-5 md:mb-2 font-bold w-1/2 ml-10 uppercase'>
       Elevate your career with <span className='text-neutral-100 text-4xl lg:text-8xl '>
        CCP
        </span> today
      
      </h1>
     
      <h2 className=' text-neutral-100 ml-10 font-mono w-1/2'>
        Journey with us into establishing an out standing career best suitatable for you
      </h2>
     </div>
     <div className="absolute left-[55%] bottom-[20%] w-1/3 -z-10 border border-purple-500 rounded-2xl">
   <video src={Herobg} className='md:flex hidden w-full rounded-2xl'
   autoPlay
   loop
   muted
   />
    </div>
     <div className="absolute bottom-0 -z-10">
     <img src={Herobg2} alt="" className='lg:hidden flex'/>
     </div>
     <div className="flex flex-row items-center mt-20 justify-center">
     <Link to={'/dept'} className=''>
            <Buttons value={'Find a Job'} valueTwo={true}/>
            </Link>
            <Link to={'*'} >
            <ButtonsTwo value={'Offer a Job'} valueTwo={true}/>
            </Link>
     </div>
    </div>
  )
}

export default Herosection