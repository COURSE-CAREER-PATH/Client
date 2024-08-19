import React from 'react';

const AccountSettings = () => {
  return (
    <>
    <div>
      <div className="w-[50%] md:w-[30%] h-[50dvh] border absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-2xl border-purple-700 text-center">
        <h1 className=' text-2xl md:text-3xl mt-3'>
        Account Settings
        </h1>
        <div className="h-full flex flex-col justify-around">
            <p>Change Email</p>
            <p>Reset Password</p>
            <p>Delete account</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default AccountSettings;
