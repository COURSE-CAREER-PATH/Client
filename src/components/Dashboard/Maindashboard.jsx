import React, { useState } from 'react';
import { User, Briefcase, Bell, Menu, Handshake } from 'lucide-react';
import ProfilePage from './ProfilePage';

const navItems = [
  { id: 'profile', icon: <User />, label: 'Profile' },
  { id: 'apply', icon: <Briefcase />, label: 'Apply for Job' },
  { id: 'offer', icon: <Handshake />, label: 'Offer a Job' },
  { id: 'notification', icon: <Bell />, label: 'Notification' },
  { id: 'menu', icon: <Menu />, label: 'Menu'},
];

const HeaderdivStyles = `
  flex gap-2 cursor-pointer hover:text-neutral-400 transition duration-500 ease-in-out
`;

const H1styles = `
  hidden md:flex
`;

const Maindashboard = () => {
  const [activeItem, setActiveItem] = useState('profile');

  const handleNavItemClick = (item) => {
    setActiveItem(item.id);
    console.log(item.label); // Log the label of the clicked item
  };

  return (
    <>
      <div className='fixed w-full'>
        <nav className="text-center items-center justify-around flex w-full border-b border-neutral-500 h-16 py-10 px-4 text-neutral-300 backdrop-blur-sm z-50">
          {navItems.map((item, index) => (
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
      <ProfilePage />
    </>
  );
}

export default Maindashboard;
