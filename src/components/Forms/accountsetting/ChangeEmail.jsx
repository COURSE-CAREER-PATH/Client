import React, { useState } from 'react';
import { Buttons, Input } from '../../Buttons';
import { getAuth, updateEmail, reauthenticateWithCredential, EmailAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const auth = getAuth();

  const handleEmailChange = () => {
    setMessage(''); // Clear any previous message
    const user = auth.currentUser;

    if (user) {
      // Check the user's authentication provider
      const providerId = user.providerData[0]?.providerId;
      
      if (providerId === 'password') {
        // If the user signed in with email and password
        const credential = EmailAuthProvider.credential(user.email, password);

        reauthenticateWithCredential(user, credential)
          .then(() => {
            // Update the email
            updateEmail(user, newEmail)
              .then(() => {
                setMessage('Email updated successfully! Please verify your new email.');
              })
              .catch((error) => {
                setMessage(`Error updating email: ${error.message}`);
              });
          })
          .catch((error) => {
            setMessage(`Re-authentication failed: ${error.message}`);
          });
      } else if (providerId === 'google.com') {
        // If the user signed in with Google, reauthenticate using Google
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);

            if (credential) {
              reauthenticateWithCredential(user, credential)
                .then(() => {
                  // Update the email after reauthentication
                  updateEmail(user, newEmail)
                    .then(() => {
                      setMessage('Email updated successfully! Please verify your new email.');
                    })
                    .catch((error) => {
                      setMessage(`Error updating email: ${error.message}`);
                    });
                })
                .catch((error) => {
                  setMessage(`Re-authentication with Google failed: ${error.message}`);
                });
            } else {
              setMessage('Failed to retrieve Google credentials');
            }
          })
          .catch((error) => {
            setMessage(`Error during Google sign-in: ${error.message}`);
          });
      } else {
        setMessage('Unsupported authentication provider');
      }
    } else {
      setMessage('No user is signed in');
    }
  };

  return (
    <div className='mx-auto w-[80%] flex flex-col gap-4'>
      {/* Input for Account Password */}
      <Input
        Labelvalue={'Account Password'}
        value={password}
        onChange={(value) => setPassword(value)}
      />
      
      {/* Input for New Email */}
      <Input
        Labelvalue={'New Email'}
        value={newEmail}
        onChange={(value) => setNewEmail(value)}
      />
      
      {/* Submit Button */}
      <Buttons 
        value={'Submit'} 
        click={handleEmailChange}
      />
      
      {/* Feedback Message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangeEmail;
