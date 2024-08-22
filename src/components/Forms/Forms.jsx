const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 100px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
  font-family: "Montserrat", sans-serif;
  margin: 1%;
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props => props.signinIn !== true ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` : null}
`;

const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;

const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 20px;
`;

const Button = styled.button`
  border-radius: 20px;
  border: none;
  background: -webkit-linear-gradient(to left, #6A1B9A, #1976D2);
  background: linear-gradient(to left, #6A1B9A, #1976D2);
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  &:active {
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;

const SignInGhostButton = styled.button`
  background-color: #1976D2;
  border-radius: 20px;
  border: none;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  &:active {
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;

const SignUpGhostButton = styled.button`
  border-color: #ffffff;
  border-radius: 20px;
  border: none;
  background-color: #6A1B9A;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  &:active {
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;

const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  border-radius: 100px;
  ${props => props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

const Overlay = styled.div`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #6A1B9A, #1976D2);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => props.signinIn !== true ? `transform: translateX(50%);` : null}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transition: transform 0.6s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EyeIcon, EyeOff, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

import { useGlobalState } from './ClientsFolder/GlobalStateProvider';
import facebookIcon from '../../assets/icons/facebook.png';
import googleIcon from '../../assets/icons/google.png';
import { Auth } from '../config/firebase';

function Forms() {
  const [signIn, toggle] = React.useState(true);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasswordTwo, setSignupPasswordTwo] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [firstPasswordDisplay, setFirstPasswordDisplay] = useState(false)
  const [secondPasswordDisplay, setSecondPasswordDisplay] = useState(false)
  const [loginPasswordDisplay, setLoginPasswordDisplay] = useState(false)
  const { formData, setFormData, saveDataToFirestore, updateFormData } = useGlobalState();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Use useEffect to listen for auth state changes and update formData.Email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setFormData((prevState) => ({
          ...prevState,
          Email: user.email,
        }));
        console.log('User email set in formData:', user.email);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setFormData]);

  const handleInputChange = (name, e) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(Auth, provider);
      const user = result.user;
      const displayName = user.displayName;
      setFormData((prevData) => ({
        ...prevData,
        userName: displayName || '',
      }));
      setMessage('Google Sign-In successful. Welcome ' + displayName);
      navigate('/dashboard');
      updateFormData();
      saveDataToFirestore();
    } catch (err) {
      console.error(err.message);
      setMessage('Error with Google Sign-In: ' + err.message);
    }
  };

  const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(Auth, provider);
      setMessage('Facebook Sign-In successful');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.message);
      setMessage('Error with Facebook Sign-In: ' + err.message);
    }
  };

  const createAcc = async (e) => {
    e.preventDefault();
    if (signupPassword !== signupPasswordTwo) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(Auth, signupEmail, signupPassword);
      setMessage('New account created successfully! Please verify your email.');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setMessage('Error creating account: ' + err.message);
    }
    setSignupEmail('');
    setSignupPassword('');
    setSignupPasswordTwo('');
  };

  const logintoAcc = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(Auth, loginEmail, loginPassword);
      setMessage('Login successful! Welcome back.');
      navigate('/dashboard');
    } catch (err) {
      console.log(err.message);
      setMessage('Error logging in: ' + err.message);
    }
    setLoginEmail('');
    setLoginPassword('');
  };

  const toggleFirstPasswordDisplay = () => {
    setFirstPasswordDisplay(!firstPasswordDisplay);
  };

  const toggleSecondPasswordDisplay = () => {
    setSecondPasswordDisplay(!secondPasswordDisplay);
  };

  const toggleLoginPasswordDisplay = () => {
    setLoginPasswordDisplay(!loginPasswordDisplay);
  };

  return (
    <div className="block">
      <Main>
        <Container>
          <SignUpContainer signinIn={signIn}>
            <Form className="text-neutral-600" onSubmit={createAcc}>
              <Title className="text-3xl text-purple-700 py-3 font-Ubuntu">Create Account</Title>
              <div className="">
              <Input
                type="text"
                placeholder="User Name"
                required
                value={formData.userName}
                onChange={(e) => handleInputChange('userName', e)}
              />
              </div>
              <div className="">
              <Input
                type="email"
                placeholder="Email"
                required
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              </div>
              <div className="relative">
              <Input
                type={firstPasswordDisplay? 'text': 'password'}
                placeholder="Password"
                required
                value={signupPassword}
                className='text-neutral-600'
                onChange={(e) => setSignupPassword(e.target.value)}
              />
                 <span className='absolute right-3 bottom-5 scale-75' onClick={toggleFirstPasswordDisplay}>
                {
                  firstPasswordDisplay ? 
                  (
                    <p>
                      <EyeIcon/>
                    </p>
                  )
                  : (
                    <p>
                      <EyeOff/>
                    </p>
                  )
                }
              </span>
              </div>
              <div className="relative">
              <Input
                type={secondPasswordDisplay? 'text': 'password'}
                placeholder="Re enter Password"
                required
                value={signupPasswordTwo}
                onChange={(e) => setSignupPasswordTwo(e.target.value)}
              />
               <span className='absolute right-3 bottom-5 scale-75' onClick={toggleSecondPasswordDisplay}>
                {
                  secondPasswordDisplay ? 
                  (
                    <p>
                      <EyeIcon/>
                    </p>
                  )
                  : (
                    <p>
                      <EyeOff/>
                    </p>
                  )
                }
              </span>
              </div>
              <Button>Sign Up</Button>
              {message && <p>{message}</p>}
            </Form>
          </SignUpContainer>

          <SignInContainer signinIn={signIn} className="text-neutral-600">
            <Form onSubmit={logintoAcc}>
              <Title className="text-3xl text-purple-700 py-3 font-Ubuntu">Log In</Title>
              <div className="">
              <Input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              </div>
              <div className="relative">
              <Input
                type={loginPasswordDisplay? 'text': 'password'}
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <span className='absolute right-3 bottom-5 scale-75' onClick={toggleLoginPasswordDisplay}>
                {
                  loginPasswordDisplay ? 
                  (
                    <p>
                      <EyeIcon/>
                    </p>
                  )
                  : (
                    <p>
                      <EyeOff/>
                    </p>
                  )
                }
              </span>
              </div>
              <Link to={'/dashboard'}>Forgot your password?</Link>
              <Button>Log In</Button>

              {message && <p>{message}</p>}
            </Form>
          </SignInContainer>

          <OverlayContainer signinIn={signIn}>
            <Overlay signinIn={signIn}>
              <LeftOverlayPanel signinIn={signIn}>
                <Title className="text-3xl text-neutral-200 py-3 font-Ubuntu">Welcome Back!</Title>
                <Paragraph>To Stay up to date with our daily updates and more please Log in</Paragraph>
                <SignInGhostButton onClick={() => toggle(true)}>Log In</SignInGhostButton>
              </LeftOverlayPanel>

              <RightOverlayPanel signinIn={signIn}>
                <Title className="text-3xl text-neutral-200 py-3 font-Ubuntu">Welcome</Title>
                <Paragraph>Enter your details To begin your adventure with us.</Paragraph>
                <SignUpGhostButton onClick={() => toggle(false)}>Sign Up</SignUpGhostButton>
              </RightOverlayPanel>
            </Overlay>
          </OverlayContainer>
        </Container>
        <p className="mt-3">Or use other sign in options</p>
        <div className="flex gap-x-5 my-5 flex-col gap-y-3 md:flex-row">
          <div
            className="py-2 px-4 rounded-2xl border border-purple-700 hover:border-neutral-500 transition active:translate-y-1 flex items-center gap-x-2 cursor-pointer"
            onClick={googleSignIn}
          >
            <img src={googleIcon} alt="googleIcon" className="w-8" />
            Continue with Google
          </div>

          <div
            className="py-2 px-4 rounded-2xl border border-purple-700 hover:border-neutral-500 transition active:translate-y-1 flex items-center gap-x-2 cursor-pointer"
            onClick={facebookSignIn}
          >
            <img src={facebookIcon} alt="googleIcon" className="w-8" />
            Continue with Facebook
          </div>
        </div>
        <Link to={'/'}>
          <div className="flex gap-3">
            <p className="text-neutral-200 hover:text-neutral-500 transition">return home</p>
            <Home className="text-purple-500 transition hover:text-purple-700" />
          </div>
        </Link>
      </Main>
    </div>
  );
}

export default Forms;
