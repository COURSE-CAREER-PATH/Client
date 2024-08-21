import React, { useState } from 'react';
import ChangeEmail from './ChangeEmail';
import ResetPassword from './ResetPassword';
import DeleteAccount from './DeleteAccount';

const AccountSettings = () => {
  const [toggleChangeEmail, setToggleChangeEmail] = useState(false)
  const [toggleChangePassword, setToggleChangePassword] = useState(false)
  const [toggleDeleteAccount, setToggleDeleteAccount] = useState(false)

  const changeEmail = ()=>{
    setToggleChangeEmail(!toggleChangeEmail)
    setToggleChangePassword(!toggleChangePassword? toggleChangePassword : !toggleChangePassword)
    setToggleDeleteAccount(!toggleDeleteAccount? toggleDeleteAccount : !toggleDeleteAccount)
  }
  const changePassword = ()=>{
    setToggleChangePassword(!toggleChangePassword)
    setToggleDeleteAccount(!toggleDeleteAccount? toggleDeleteAccount : !toggleDeleteAccount)
    setToggleChangeEmail(!toggleChangeEmail? toggleChangeEmail : !toggleChangeEmail)
  }
  const deleteAccount = ()=>{
    setToggleDeleteAccount(!toggleDeleteAccount)
    setToggleChangePassword(!toggleChangePassword? toggleChangePassword : !toggleChangePassword)
    setToggleChangeEmail(!toggleChangeEmail? toggleChangeEmail : !toggleChangeEmail)

  }
  return (
    <>
    <div>
      <div className="w-[50%] md:w-[50%] h-[auto] border absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-2xl border-purple-700 text-center">
        <h1 className=' text-xl md:text-3xl mt-3'>
        Account Settings
        </h1>
        <div className="h-full flex flex-col justify-evenly gap-10 py-10">
          <div className="border-b border-neutral-600 pb-4">
          <p onClick={changeEmail} className='cursor-pointer'>Change Email</p>
          <div  className={`overflow-hidden transition-all duration-1000 cursor-pointer ${
        toggleChangeEmail ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
            <ChangeEmail/>
          </div>
            </div>            
          <div className="border-b pb-4 border-neutral-600">
          <p onClick={changePassword} className='cursor-pointer'>Change Password</p>
          <div className={`overflow-hidden transition-all duration-1000 cursor-pointer ${
        toggleChangePassword ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
            <ResetPassword/>
          </div>
            </div>            
          <div className="border-b pb-4 border-neutral-600">
          <p onClick={deleteAccount} className='cursor-pointer'>Delete Account</p>
          <div className={`overflow-hidden transition-all duration-1000 cursor-pointer ${
        toggleDeleteAccount ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
            <DeleteAccount/>
          </div>
            </div>            
           
        </div>
      </div>
    </div>
    </>
  );
}

export default AccountSettings;
