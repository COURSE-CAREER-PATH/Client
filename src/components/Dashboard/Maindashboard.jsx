import React from 'react'
import { User, Briefcase, Bell, Menu, Handshake } from 'lucide-react'
import ProfilePage from './ProfilePage'

const HeaderdivStyles = `
flex gap-2 border-l px-2 cursor-pointer hover:text-neutral-400 border-neutral-500 transition active:animate-ping transition duration-500 ease-in-out 
`
const Icons = `
text-center
`
const H1styles = `
    hidden md:flex
`
const Maindashboard = () => {
  return (
    <div className=''>
        <nav className=" text-center items-center justify-around flex w-full border-b border-neutral-500 h-16 py-10 px-4 text-neutral-300 backdrop-blur-sm mb-16 fixed z-30">
            <div className={HeaderdivStyles}><span>
                <User/>
                </span>
                    <h1 className={H1styles}>
                    Profile    
                    </h1>                
                </div>
            <div className={HeaderdivStyles}><span>
                <Briefcase/>
                </span>
                    <h1 className={H1styles}>
                    Apply for Job    
                    </h1>                
                </div>

            <div className={HeaderdivStyles}>
                <span>
                    <Handshake/>
                </span>
                    <h1 className={H1styles}>
                    Offer a job
                    </h1>
                </div>
            <div className={HeaderdivStyles}>
                <span>
                    <Bell/>
                </span>
                    <h1 className={H1styles}>
                    Notification
                    </h1>
                </div>
            <div className={HeaderdivStyles}
            >
                <span>
                    <Menu/>
                </span>
                <h1 className={H1styles}>
                Menu
                </h1>
                </div>
        </nav>

        <ProfilePage/>
    </div>
  )
}

export default Maindashboard