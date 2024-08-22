import React, { useState } from 'react';
import { ButtonsTwo, Input } from '../../Buttons';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router';


const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const auth = getAuth();
  const user = auth.currentUser;

  const handleDeleteAccount = () => {
    setMessage(''); // Clear previous messages

    if (user && password) {
      // Reauthenticate the user
      const credential = EmailAuthProvider.credential(user.email, password);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          // Delete user account
          deleteUser(user)
            .then(() => {
              setMessage('Your account has been deleted successfully.');
              // Redirect or handle user logout after deletion if necessary
            })
            .catch((error) => {
              setMessage(`Error deleting account: ${error.message}`);
            });
        })
        .catch((error) => {
          setMessage(`Re-authentication failed: ${error.message}`);
        });
    } else {
      setMessage('Please enter your password to proceed.');
    }
    setPassword('')
    navigate('/')
  };

  return (
    <>
      <div className='mx-auto w-[80%] flex flex-col gap-4'>
        {/* Input field for password */}
        <Input
          Labelvalue={'Enter Password'}
          value={password}
          onChange={(value) => setPassword(value)} // Update password state
        />

        {/* Delete Account button */}
        <ButtonsTwo 
          value={'Delete Account'} 
          click={handleDeleteAccount} // Trigger account deletion
        />

        {/* Display message */}
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default DeleteAccount;
