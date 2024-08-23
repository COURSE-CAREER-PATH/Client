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
  ${(props) =>
    props.signinIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
      : null}
`;

const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}
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
  background: -webkit-linear-gradient(to left, #6a1b9a, #1976d2);
  background: linear-gradient(to left, #6a1b9a, #1976d2);
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
  background-color: #1976d2;
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
  background-color: #6a1b9a;
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
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

const Overlay = styled.div`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #6a1b9a, #1976d2);
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
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
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
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EyeIcon, EyeOff, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import { useGlobalState } from "./ClientsFolder/GlobalStateProvider";
import facebookIcon from "../../assets/icons/facebook.png";
import googleIcon from "../../assets/icons/google.png";
import { Auth } from "../config/firebase";
import axios from "axios";

// Import the ToastContainer component and the toast function
import { ToastContainer, toast } from "react-toastify";

function Forms() {
  //variables
  const serverName = import.meta.env.VITE_SERVER_NAME;
  const navigate = useNavigate();
  //style options for the toast message
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [signIn, toggle] = React.useState(true);
  const [signupEmail, setSignupEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordTwo, setSignupPasswordTwo] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [firstPasswordDisplay, setFirstPasswordDisplay] = useState(false);
  const [secondPasswordDisplay, setSecondPasswordDisplay] = useState(false);
  const [loginPasswordDisplay, setLoginPasswordDisplay] = useState(false);
  const { formData, setFormData, saveDataToFirestore, updateFormData } =
    useGlobalState();
  const [message, setMessage] = useState("");

  // Use useEffect to listen for auth state changes and update formData.Email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setFormData((prevState) => ({
          ...prevState,
          Email: user.email,
        }));
        console.log("User email set in formData:", user.email);
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
    setUserName(e.target.value);
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(Auth, provider);
      const user = result.user;
      const userName = user.displayName;
      const Email = user.email;
      const uid = user.uid;
      // Send this data to your backend to check and store in MongoDB
      const response = await axios.post(`${serverName}user/googleSignup`, {
        userName,
        Email,
        uid,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("userAuth", true);

      if (response.status === 200) {
        console.log("User signed in successfully!");
        // Handle successful sign-in (e.g., redirect to dashboard)
      } else if (response.status === 201) {
        console.log("New user created and signed in!");
        // Handle new user creation (e.g., show welcome screen)
      }
      setFormData((prevData) => ({
        ...prevData,
        userName: userName || "",
      }));
      setMessage("Google Sign-In successful. Welcome " + userName);
      navigate("/dashboard");
      updateFormData();
      saveDataToFirestore();
    } catch (err) {
      console.error(err.message);
      setMessage("Error with Google Sign-In: " + err.message);
    }
  };

  const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(Auth, provider);
      setMessage("Facebook Sign-In successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.message);
      setMessage("Error with Facebook Sign-In: " + err.message);
    }
  };

  const createAcc = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!emailRegex.test(signupEmail)) {
      toast.error("Please provide a valid email.", toastOptions);
      return;
    }

    // Validate password length
    if (signupPassword.length <= 7) {
      toast.error("Password must be at least 8 characters.", toastOptions);
      return;
    }

    // Validate password match
    if (signupPassword !== signupPasswordTwo) {
      toast.error("Passwords do not match.", toastOptions);
      return;
    }
    console.log(signupEmail, signupPassword);

    try {
      // Create user with email and password (Firebase Auth)
      const userCredential = await createUserWithEmailAndPassword(
        Auth,
        signupEmail,
        signupPassword
      );
      const user = userCredential.user;
      console.log("User signed up:", userCredential.user.uid);

      // Register user in the backend (MongoDB)
      const response = await axios.post(`${serverName}user/register`, {
        uid: user.uid,
        userName,
        Email: signupEmail,
        Password: signupPassword,
      });

      // Store tokens and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("userAuth", true);

      toast(`Your email is being verified, ${userName}.`);
      setMessage("New account created successfully! Please verify your email.");

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      handleRegistrationErrors(error);
    }
  };

  // Error handling function
  const handleRegistrationErrors = (error) => {
    // Firebase Authentication Error Handling
    if (error.code) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error(
            "This email is already associated with an account. Please log in."
          );
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address. Please enter a valid email.");
          break;
        case "auth/weak-password":
          toast.error(
            "Password is too weak. Please choose a stronger password."
          );
          break;
        case "auth/operation-not-allowed":
          toast.error(
            "Account creation is currently disabled. Please try again later."
          );
          break;
        default:
          toast.error("An unexpected error occurred. Please try again.");
          break;
      }
      return; // Exit after handling Firebase error
    }

    // HTTP Error Handling
    if (!error.response) {
      // Network error
      toast.error("Network error. Please try again later.", toastOptions);
      return;
    }

    const errorMessages = {
      400: "User already exists. Please log in.",
      401: "Unauthorized. Please log in.",
      403: "Forbidden. You do not have permission to perform this action.",
      404: "Not found. The requested resource could not be found.",
      408: "Request timeout. Please try again later.",
      409: "Conflict. The resource already exists.",
      413: "Payload too large. Please reduce the size of the request.",
      429: "Too many requests. Please slow down and try again later.",
      500: "Internal server error. Please try again later.",
      502: "Bad gateway. Please try again later.",
      503: "Service unavailable. Please try again later.",
      504: "Gateway timeout. Please try again later.",
    };

    const message =
      errorMessages[error.response.status] || `Error: ${error.message}`;
    toast.error(message, toastOptions);
  };


  const logintoAcc = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error('Please enter both email and password.');
      return;
    }
    
    try {
      console.log('Email:', loginEmail);
      console.log('Password:', loginPassword); 
      await signInWithEmailAndPassword(Auth, loginEmail, loginPassword);


      const response = await axios.post(`${serverName}user/authenticate`, {
        Email: loginEmail,
        Password: loginPassword,
      });

      // Store tokens and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("userAuth", true);

      toast.success(`Welcome ${response.data.userName}`);
      setTimeout(() => {
        const route = `/dashboard`;
        window.location.href = route;
      }, 5000);
      if (response.data.verified) {
      } else {
        toast(response.message);
      }
    } catch (error) {
      handleAuthenticationErrors(error);
    }
  };

  const handleAuthenticationErrors = (error) => {
    // Firebase Authentication Error Handling
    if (error.code) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No user found with this email. Please sign up first.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address. Please enter a valid email.");
          break;
        case "auth/user-disabled":
          toast.error(
            "This account has been disabled. Please contact support."
          );
          break;
        case "auth/too-many-requests":
          toast.error(
            "Too many failed login attempts. Please try again later."
          );
          break;
        default:
          toast.error("An unexpected error occurred. Please try again.");
          break;
      }
      return; // Exit after handling Firebase error
    }

    // HTTP Error Handling
    if (!error.response) {
      // Network error
      toast.error("Network error. Please try again later.");
      return;
    }

    const errorMessages = {
      400: "Bad request. Please check your input.",
      401: "Unauthorized. Please check your credentials.",
      403: "Forbidden. You do not have permission to perform this action.",
      404: "Not found. The requested resource could not be found.",
      408: "Request timeout. Please try again later.",
      409: "Conflict. The resource already exists.",
      413: "Payload too large. Please reduce the size of the request.",
      429: "Too many requests. Please slow down and try again later.",
      500: "Internal server error. Please try again later.",
      502: "Bad gateway. Please try again later.",
      503: "Service unavailable. Please try again later.",
      504: "Gateway timeout. Please try again later.",
    };

    const message =
      errorMessages[error.response.status] || `Error: ${error.message}`;
    toast.error(message);
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
              <Title className="text-3xl text-purple-700 py-3 font-Ubuntu">
                Create Account
              </Title>
              <div className="">
                <Input
                  type="text"
                  placeholder="User Name"
                  required
                  value={formData.userName}
                  onChange={(e) => handleInputChange("userName", e)}
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
                  type={firstPasswordDisplay ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={signupPassword}
                  className="text-neutral-600"
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <span
                  className="absolute right-3 bottom-5 scale-75"
                  onClick={toggleFirstPasswordDisplay}
                >
                  {firstPasswordDisplay ? (
                    <p>
                      <EyeIcon />
                    </p>
                  ) : (
                    <p>
                      <EyeOff />
                    </p>
                  )}
                </span>
              </div>
              <div className="relative">
                <Input
                  type={secondPasswordDisplay ? "text" : "password"}
                  placeholder="Re enter Password"
                  required
                  value={signupPasswordTwo}
                  onChange={(e) => setSignupPasswordTwo(e.target.value)}
                />
                <span
                  className="absolute right-3 bottom-5 scale-75"
                  onClick={toggleSecondPasswordDisplay}
                >
                  {secondPasswordDisplay ? (
                    <p>
                      <EyeIcon />
                    </p>
                  ) : (
                    <p>
                      <EyeOff />
                    </p>
                  )}
                </span>
              </div>
              <Button onClick={createAcc}>Sign Up</Button>
              {message && <p>{message}</p>}
            </Form>
          </SignUpContainer>

          <SignInContainer signinIn={signIn} className="text-neutral-600">
            <Form onSubmit={logintoAcc}>
              <Title className="text-3xl text-purple-700 py-3 font-Ubuntu">
                Log In
              </Title>
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
                  type={loginPasswordDisplay ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <span
                  className="absolute right-3 bottom-5 scale-75"
                  onClick={toggleLoginPasswordDisplay}
                >
                  {loginPasswordDisplay ? (
                    <p>
                      <EyeIcon />
                    </p>
                  ) : (
                    <p>
                      <EyeOff />
                    </p>
                  )}
                </span>
              </div>
              <Link to={"/dashboard"}>Forgot your password?</Link>
              <Button>Log In</Button>

              {message && <p>{message}</p>}
            </Form>
          </SignInContainer>

          <OverlayContainer signinIn={signIn}>
            <Overlay signinIn={signIn}>
              <LeftOverlayPanel signinIn={signIn}>
                <Title className="text-3xl text-neutral-200 py-3 font-Ubuntu">
                  Welcome Back!
                </Title>
                <Paragraph>
                  To Stay up to date with our daily updates and more please Log
                  in
                </Paragraph>
                <SignInGhostButton onClick={() => toggle(true)}>
                  Log In
                </SignInGhostButton>
              </LeftOverlayPanel>

              <RightOverlayPanel signinIn={signIn}>
                <Title className="text-3xl text-neutral-200 py-3 font-Ubuntu">
                  Welcome
                </Title>
                <Paragraph>
                  Enter your details To begin your adventure with us.
                </Paragraph>
                <SignUpGhostButton onClick={() => toggle(false)}>
                  Sign Up
                </SignUpGhostButton>
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
        <Link to={"/"}>
          <div className="flex gap-3">
            <p className="text-neutral-200 hover:text-neutral-500 transition">
              return home
            </p>
            <Home className="text-purple-500 transition hover:text-purple-700" />
          </div>
        </Link>
      </Main>
      <ToastContainer />
    </div>
  );
}

export default Forms;
