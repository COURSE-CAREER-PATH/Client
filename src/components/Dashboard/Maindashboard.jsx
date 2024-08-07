import React, { useState } from 'react';
import { User, Briefcase, Bell, Menu, Handshake, ArrowRight, X } from 'lucide-react';
import ProfilePage from './ProfilePage';
import { enablePageScroll, disablePageScroll } from 'scroll-lock';
import JopApplicationPage from './JopApplicationPage';
import JobPostingPage from './JobPostingPage';
import NotificationPage from './NotificationPage';
import { Buttons, ButtonsTwo } from '../Buttons';

const navItems = [
  { id: 'profile', icon: <User />, label: 'Profile' },
  { id: 'apply', icon: <Briefcase />, label: 'Apply for Job' },
  { id: 'offer', icon: <Handshake />, label: 'Offer a Job' },
  { id: 'notification', icon: <Bell />, label: 'Notification' },
  { id: 'menu', icon: <Menu />, label: 'Menu' }, // This is the Menu button
];

const HeaderdivStyles = `
  flex gap-2 cursor-pointer hover:text-neutral-400 transition duration-500 ease-in-out
`;

const H1styles = `
  hidden md:flex
`;

const Maindashboard = () => {
  const [activeItem, setActiveItem] = useState('profile');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  
  if (isOpen) {
    disablePageScroll();
  } else {
    enablePageScroll();
  }

  const handleNavItemClick = (item) => {
    if (item.id === 'menu') {
      toggleDrawer(); // Toggle the drawer if "Menu" is clicked
    } else {
      setActiveItem(item.id);
      console.log(item.label); // Log the label of the clicked item
    }
  };

  return (
    <>
      <div className='fixed w-[100%] z-40'>
        <nav className="text-center items-center justify-around flex w-full border-b border-neutral-500 h-16 py-10 px-4 text-neutral-300 backdrop-blur-sm">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={HeaderdivStyles}
              onClick={() => handleNavItemClick(item)}
            >
              <span>{item.icon}</span>
              <h1 className={H1styles}>{item.label}</h1>
            </div>
          ))}
        </nav>
        <div
          className='absolute bottom-0 transition-all duration-500 ease-in-out bg-purple-700 h-1 rounded-full'
          style={{
            width: '20%',
            left: `${navItems.findIndex(item => item.id === activeItem) * 20}%`
          }}
        ></div>
      </div>
      
      <div className="overflow-hidden">
      <div 
        className="flex w-[400%] transition-transform duration-500 ease-in-out gap-10" 
        style={{ transform: `translateX(-${navItems.findIndex(item => item.id === activeItem) * 25}%)` }}
      >
        <div className="w-[100%] mx-auto overflow-hidden">
          <ProfilePage />
        </div>
        <div className="w-[100%] mx-auto">
          <JopApplicationPage />
        </div>
        <div className="w-[100%] mx-auto">
          <JobPostingPage />
        </div>
        <div className="w-[100%] mx-auto">
          <NotificationPage />
        </div>
      </div>
      </div>

      {/* Drawer component */}
      <div
        id="drawer-right-example"
        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-x-auto transition-transform backdrop-blur-sm border border-purple-700 rounded-l-3xl w-80 dark:bg-gray-800 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <h5
          id="drawer-right-label"
          className="inline-flex items-center mb-4 text-base font-semibold text-neutral-200 dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <X/>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="flex absolute bottom-3">
         <Buttons value={'Log Out'}/>
         <ButtonsTwo value={'Switch accounts'}/>
        </div>
      </div>
    </>
  );
};

export default Maindashboard;
