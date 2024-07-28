import  {Link} from "react-router-dom";
import React, { useState } from "react";
import { X, MenuIcon } from "lucide-react";
import dropdownBg from '../assets/img/img2.jpg';
import Logo from '../assets/img/Ccp logo .png';
import { Buttons, ButtonsTwo } from "./Buttons";


const MdNavStylesLi = `border-neutral-600 px-5 py-5`
const LgNavStylesLi = `border-r border-neutral-600 px-5  w-28`
const MdNavStylesA = `font-bold text-neutral-100 hover:text-neutral-300`
const LgNavStylesA = `font-bold text-neutral-100 hover:text-neutral-400`


const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNav = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <div className="">
      <nav className="fixed w-full -top-1 z-50 backdrop-blur-xl border-b border-neutral-80 flex items-center justify-between lg:gap-8 px-5">
        <div className="flex">
            <div className="w-20  left-11 -top-[0.5rem]">
              <Link to={'/'}>
              <img src={Logo} alt="" />
              </Link>
            </div>
          <h1 className="text-2xl">
            <span className="text-6xl text-purple-700 font-mono">C</span>
            CP
          </h1>
        </div>
        <ul className="lg:flex hidden justify-between gap-4">
          <Link to={'/dept'}>
           <li className={`${LgNavStylesLi} lg:border-l border-neutral-600`}>
            <a href="" className={LgNavStylesA}>
              Job Listing
            </a>
           </li>
          </Link>
          <Link to={'/*'}>
           <li className={LgNavStylesLi}>
            <a href="" className={LgNavStylesA}>
              Post A Job
            </a>
           </li>
          </Link>
          <Link to={'/*'}>
           <li className={LgNavStylesLi}>
            <a href="" className={LgNavStylesA}>
              Career Advice
            </a>
           </li>
          </Link>
          <Link to={'/*'}>
           <li className={LgNavStylesLi}>
            <a href="" className={LgNavStylesA}>
              Help/Faq
            </a>
           </li>
          </Link>
        </ul>
        
        <div className="hidden lg:flex  items-center justify-center lg">
     <Link to={'/dept'} className=''>
            <Buttons value={'Log in'} className='px-20'/>
            </Link>
            <Link to={'*'} >
            <ButtonsTwo value={'Sign Up'}/>
            </Link>
     </div>
        <div className="block lg:hidden">
          <button onClick={toggleNav}>
            {mobileDrawerOpen ? <X className="transform active:rotate-180 transition duration-500 ease-in-out"/> : <MenuIcon className="transform active:animate-ping transition duration-500 ease-in-out"/>}
          </button>
        </div>
      </nav>

      {mobileDrawerOpen && (
        <div className="fixed flex flex-col backdrop-blur-lg border-b border-neutral-700/80 w-full items-center justify-center py-10 lg:hidden md:flex top-10 z-20 
        ">
          <ul>
          <Link to={'/dept'}>
           <li className={`${MdNavStylesLi}`}>
            <a href="" className={MdNavStylesA}>
              Job Listing
            </a>
           </li>
          </Link>
          <Link to={'/*'}>
           <li className={MdNavStylesLi}>
            <a href="" className={MdNavStylesA}>
              Post A Job
            </a>
           </li>
          </Link>
          <Link to={'/*'}>
           <li className={MdNavStylesLi}>
            <a href="" className={MdNavStylesA}>
              Career Advice
            </a>
           </li>
          </Link>
          <Link to={'/*'}>
           <li className={MdNavStylesLi}>
            <a href="" className={MdNavStylesA}>
              Help/Faq
            </a>
           </li>
          </Link>
          <div className="lg:hidden flex items-center justify-center">
     <Link to={'/login'} className=''>
            <Buttons value={'Log In'}/>
            </Link>
            <Link to={'/login'} >
            <ButtonsTwo value={'Sign Up'}/>
            </Link>
     </div>
          </ul>
         
          <div className="absolute -z-10 overflow-hidden">
            <img src={dropdownBg} alt="" width={900} height={850} className="opacity-15" />
          </div>

        </div>
      )}
    </div>
  );
};

export default Navbar;
