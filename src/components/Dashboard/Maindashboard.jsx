import React, { useState, useEffect } from 'react';
import { User, Briefcase, Bell, Menu, Handshake, X, Info, Sun, Moon, FileSearch, Search } from 'lucide-react';
import ProfilePage from './ProfilePage';
import { enablePageScroll, disablePageScroll } from 'scroll-lock';
import JopApplicationPage from './JopApplicationPage';
import JobPostingPage from './JobPostingPage';
import NotificationPage from './NotificationPage';
import { Buttons, ButtonsTwo, LoadingScreen } from '../Buttons';
import { Auth } from '../config/firebase';
import { getAuth, signOut, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { useGlobalState } from '../Forms/ClientsFolder/GlobalStateProvider';
import Loading from "../../assets/icons/ccplogo2.png"
import { useNavigate } from 'react-router';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineDevices } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { MdOutlineDangerous } from "react-icons/md";
import { Link } from 'react-router-dom';
import UtilityNavBar from './UtilityNavBar';




const navItems = [
  { id: 'apply', icon: <Briefcase />, label: 'Jobs' },
  { id: 'offer', icon: <Handshake />, label: 'Offer a Job' },
  { id: 'profile', icon: <User />, label: 'Profile' },
  { id: 'notification', icon: <Bell />, label: 'Notification' },
  { id: 'menu', icon: <Menu />, label: 'Menu' }, // This is the Menu button
];

const HeaderdivStyles = `
  flex gap-2 cursor-pointer hover:animate-pulse transition duration-500 ease-in-out
`;

const H1styles = `
  hidden md:flex
`;



const Maindashboard = () => {
const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState('profile');
  const {loading} = useGlobalState();
  const [isOpen, setIsOpen] = useState(false);
  const [topDrawer, setTopDrawer] = useState(false);
  const [theme, setTheme] = useState(false)
  const [chatRoom, setChatRoom] = useState(false)
  const [verified, setVerified] = useState(false)
  const [verificationLoader, setVerificationLoader] = useState(true)

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const toggleChatRoom = () => {
    setChatRoom(!chatRoom);
  };
  const toggleTheme = ()=>{
    setTheme(!theme)
  }

  useEffect(() => {
    // Show the top drawer when the component is mounted
    setTopDrawer(true);
  }, []);

  useEffect(() => {
    if (isOpen ) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  }, [isOpen, topDrawer]);

  const handleNavItemClick = (item) => {
    if (item.id === 'menu') {
      toggleDrawer(); // Toggle the drawer if "Menu" is clicked
    } else {
      setActiveItem(item.id);
      console.log(item.label); // Log the label of the clicked item
    }
  };
  const logOut = async () => {
    try {
      signOut(Auth);
      console.log('user logged out');
    } catch (err) {
      console.error(err);
    }
    navigate('/')
  };
  const themePrompt = ()=>{
    alert('This feature is comming soon')
  }

  const auth = getAuth()
  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        alert('Click on the link sent to your email to be verified');
        await auth.currentUser.reload();
        setVerified(auth.currentUser.emailVerified);
      } catch (error) {
        console.error("Error sending verification email", error);
      }
    } else {
      console.log("No user is logged in");
    }
  };
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=>{
      if (user) {
        if (user.emailVerified) {
          console.log("Email verified.");
        }else{
          console.log("Email is yet to be verified");
          
        }
      }
    })
  },[])

  
  useEffect(() => {
    const checkVerification = async () => {
      const user = Auth.currentUser;
      if (user) {
        await user.reload(); // Refresh the user's data from Firebase
        setVerified(user.emailVerified);
      }
      setVerificationLoader(false);
    };

    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        checkVerification();
      }
    });
  }, [auth]);

  return (
    <>
    <div className="" >
      <div className='fixed w-[100%] z-40'>
        <nav className='backdrop-blur-3xl'>
        <div className='flex items-center justify-between px-4 border-neutral-500 w-[70%] mx-auto'>
          <div>
            <Link to={'./'}>
          <h1 className="text-4xl font-bold">
            <span className="text-6xl text-purple-700 font-mono">C</span>
            CP
          </h1>
            </Link>
          </div>
          <div className='w-1/2'>
            {/* Search Input */}
        <div className="relative w-full transition-all duration-1000  ">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full text-sm text-gray-900 bg-customGray rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 rounded-2xl"
            placeholder="Search..."
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-customBlue rounded-e-lg   focus:outline-none"
          >
            <Search className="w-4 h-4 " />
            <span className="sr-only">Search</span>
          </button>
        </div>
          </div>
        </div>
        </nav>
        <nav className="text-center items-center justify-around flex w-full border-y border-neutral-500 h-12  backdrop-blur-sm">
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
          <div className="w-[100%] mx-auto">
            <JopApplicationPage />
          </div>
          <div className="w-[100%] mx-auto">
            <JobPostingPage />
          </div>
          <div className="w-[100%] mx-auto overflow-hidden">
            <ProfilePage />
          </div>
          <div className="w-[100%] mx-auto">
            <NotificationPage />
          </div>
        </div>
      </div>

      {/* Top Drawer component */}
      <div
        id="drawer-top-example"
        className={`fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform duration-1000 backdrop-blur-xl h-screen flex-col justify-around items-center  ${
          loading  ? 'translate-y-0 translate-x-0' : '-translate-y-full -translate--full'
        } `}
        tabIndex="-1"
        aria-labelledby="drawer-top-label"
      >
        <div className="w-[50%] md:w-[50%] h-[auto]  absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2   text-center">
        <h1 className='text-2xl text-center my-4'>
           Please wait...
        </h1>
        <div className="transition animate-bounce">
    <LoadingScreen/>
        </div>
        </div>
      </div>

      {/* Right Drawer component */}
      <div
        id="drawer-right-example"
        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-x-auto transition-transform backdrop-blur-sm border border-purple-700 rounded-l-3xl w-72 duration-1000 dark:bg-gray-800 flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <h5
          id="drawer-right-label"
          className="inline-flex items-center mb-4 text-base font-semibold dark:text-gray-400 "
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          className="absolute right-5"
        >
          <X className='active:animate-spin transition hover'/>
          <span className="sr-only">Close menu</span>
        </button>

        <div className="h-[70dvh] mx-auto text-center flex flex-col justify-around">
  <div className="relative flex flex-col overflow-hidden px-6 " onClick={toggleTheme}>
    <h1 className="flex items-center gap-3 mx-auto cursor-pointer hover:animate-pulse transition">
      Select theme
      <span>
        {
          theme? <IoIosArrowUp/> : <IoIosArrowDown/>

        }
      </span>
    </h1>
    <div
      className={`flex flex-col justify-between overflow-hidden transition-all duration-1000 gap-y-5 cursor-pointer ${
        theme ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <p className="py-1 pl-5 flex gap-x-2" onClick={themePrompt}>Light theme <span className='text-yellow-400'><Sun/></span></p>
      <p className="py-1 pl-5 flex gap-x-2" onClick={themePrompt}> Dark theme<span><Moon/></span></p>
      <p className="py-1 flex gap-x-2 items-center pl-5"  onClick={themePrompt}>Device default<span><MdOutlineDevices/></span></p>
    </div>
  </div>
  <div>
    <Link to={'/accountsettings'}>
    Account settings
    </Link>
  </div>
  <div>
    {/*Verify Email */}
    <h1 className='w-1/2 flex items-center gap-3 mx-auto cursor-pointer hover:animate-pulse transition flex-col' onClick={sendVerificationEmail}>
      <p>
      Verify Email

      </p>
      {
        verified ? (
          <p className='flex items-center gap-x-1 bg-green ml-4 transition animate-bounce'>
              Verified <span className='bg-green-700 p-1 rounded-full scale-75'><GrStatusGood/></span>
          </p>
        ) : (
          <p  className='flex items-center gap-x-1 bg-green  transition animate-bounce'>
              Unverified <span  className='bg-red-800 p-1 rounded-full scale-75'> <MdOutlineDangerous/></span>
          </p>
        )
      }
    </h1>
  </div>
  <div>Report abuser</div>
  <div>FAQ</div>
</div>


        <div className="flex">
          <span onClick={logOut}>
            <Buttons value={'Log Out'} />
          </span>
          <ButtonsTwo value={'Switch accounts'} />
        </div>
      </div>
      </div>
      <UtilityNavBar/>
    </>
  );
};

export default Maindashboard;
