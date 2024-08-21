import React, { useState } from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { Buttons, Input } from '../../Buttons';

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            setMessage('Password updated successfully!');
          })
          .catch((error) => {
            setMessage(`Error updating password: ${error.message}`);
          });
      })
      .catch((error) => {
        setMessage(`Re-authentication failed: ${error.message}`);
        setCurrentPassword('');
        setNewPassword('')
        setConfirmPassword('')
      });
      setCurrentPassword('');
      setNewPassword('')
      setConfirmPassword('')
  };

  return (
    <div className='mx-auto w-[80%] flex flex-col gap-4'>
      <Input
        Labelvalue={'Current Password'}
        value={currentPassword}
        onChange={(value) => setCurrentPassword(value)}
      />
      <Input
        Labelvalue={'New Password'}
        value={newPassword}
        onChange={(value) => setNewPassword(value)}
      />
      <Input
        Labelvalue={'Confirm Password'}
        value={confirmPassword}
        onChange={(value) => setConfirmPassword(value)}
      />
      <Buttons value={'Change'} click={handlePasswordChange} />
      {message && <p className='tracking-wider text-xs'>{message}</p>}
    </div>
  );
};

export default ResetPassword;
