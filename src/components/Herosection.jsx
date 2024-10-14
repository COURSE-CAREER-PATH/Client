// import { Hero } from "."
import React from 'react';
import Herobg from '../assets/videos/vid2.mp4'
import Herobg2 from '../assets/img/img8.jpg'
import { Buttons,  ButtonsTwo, CssDoodleComponent } from "./Buttons";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';


const Herosection = () => {
  return (
    <>
    <div>
      <div className="md:flex flex-row h-screen w-[90%] items-center justify-evenly mx-auto hidden">
        <div className="w-[58%]">
        <h1 className='text-7xl font-bold font-Ubuntu'>
            ELEVATE YOUR CAREER WITH <span className='text-purple-700 text-8xl'>CCP</span><br /> TODAY
          </h1>
          <p className='mr-8 text-sm'>Journey with us into establishing an outstanding career best suited for you.</p>
          <div className="flex flex-row items-center mt-4 justify-start">
          <Link to={'/dept'} className=''> 
            <ButtonsTwo value={`Get started`} icon={(<ArrowRight/>)} valueTwo={true}/>
            </Link>
     </div>
        </div>
          {/* <video src={Herobg} loop autoPlay muted className='w-[40%] border border-purple-700 rounded-2xl'/> */}
          <CssDoodleComponent/>
      </div>






      <div className="md:hidden relative h-screen">
  <img src={Herobg2} alt="" className="w-full object-cover opacity-15 h-screen" />
  
  <div className="absolute top-[25%] w-full text-center px-4">
    <h1 className='text-3xl font-bold font-Ubuntu w-full mx-auto leading-tight'>
      ELEVATE YOUR CAREER WITH <span className='text-purple-700 text-4xl'>CCP</span> <br /> TODAY
    </h1>
    <p className='mt-4 text-sm w-full mx-auto leading-snug'>
      Journey with us into establishing an outstanding career best suited for you.
    </p>
  </div>
  
  <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2">
    <Link to={'/dept'}>
    <ButtonsTwo value={`Get started`} icon={(<ArrowRight/>)} valueTwo={true}/>
    </Link>
  </div>
</div>
</div>
    </>
  )
}

export default Herosection