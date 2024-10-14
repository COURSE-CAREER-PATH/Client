

import React, { useState, useEffect } from "react";
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
import { Buttons, ButtonsTwo, Input } from "../Buttons";



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
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordTwo, setSignupPasswordTwo] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
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



  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(Auth, provider);
      setMessage("Google Sign-In successful. Welcome ");
      navigate("/dashboard");
      updateFormData();
      saveDataToFirestore();
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
     alert("Passwords do not match.", toastOptions);
      return;
    }
    console.log(signupEmail, signupPassword);

    try {
      // Create user with email and password (Firebase Auth)
      const userCredential = await createUserWithEmailAndPassword(
        Auth,
        formData.Email,
        formData.Password
      );
      // const user = userCredential.user;
      console.log("User signed up:", userCredential.user.uid);
      console.log("auth value:", userCredential.user.Auth);

      // Register user in the backend (MongoDB)
      const response = await axios.post(`${serverName}user/register`, {
        uid: userCredential.user.uid,
        userName: formData.UserName,
        Email: formData.Email,
        Password: formData.Password,
      });
    
      
      
      // Store tokens and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("userAuth", true);

      toast(`Your email is being verified, ${userName}.`);
      // setMessage("New account created successfully! Please verify your email.");
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
    if (!formData.Email || !formData.Password) {
      alert('Please enter both email and password.');
      return;
    }
    
    try {
      console.log('Email:', formData.Email);
      console.log('Password:', formData.Password); 
      await signInWithEmailAndPassword(Auth, formData.Email, formData.Password);
      navigate("/dashboard");

      // const response = await axios.post(`${serverName}user/authenticate`, {
      //   Email: loginEmail,
      //   Password: loginPassword,
      // });

      // Store tokens and user data
      // localStorage.setItem("token", response.data.token);
      // localStorage.setItem("userId", response.data._id);
      // localStorage.setItem("userAuth", true);

      // alert(`Welcome ${response.data.userName}`);
      // setTimeout(() => {
      //   const route = `/dashboard`;
      //   window.location.href = route;
      // }, 5000);
      // if (response.data.verified) {
      // } else {
      //   toast(response.message);
      // }
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

    const [login, setLogin] = useState(false)
    const ToggleLoggin = ()=>{
      setLogin(!login)
    }
    const handleInputChange = (name, value) => {
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  return (
      <>
      <div>
      <div className="w-[80%] md:w-[50%] h-[auto] py-10 border absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-2xl border-purple-700 text-center px-4">
        <div>
          {
            !login && (
              <div >
              <form className="" onSubmit={createAcc}>
                <h1 className="text-3xl py-3 font-Ubuntu">
                  Create Account
                </h1>
                <div className="flex flex-col md:flex-row justify-around gap-3 my-3 ">
             <div className="w-full md:w-1/2">      
                  <Input
                    type="text"
                    Labelvalue={'User Name'}
                    required
                    value={formData.userName}
                    onChange={(value) =>
                      handleInputChange("userName", value)}
                  />
                  </div>
                  <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    Labelvalue={'Email'}
                    required
                    value={formData.Email}
                    onChange={(value) =>
                      handleInputChange("Email", value)}
                  />
                  </div>
                </div>
                <div className="flex  flex-col gap-3 md:flex-row justify-around my-6">
                  <div className="relative w-full md:w-1/2">
                  <Input
                    Password={firstPasswordDisplay ? false : true}
                    Labelvalue={'Password'}
                     required
                     value={formData.Password}
                     onChange={(value) =>
                      handleInputChange("Password", value)}
                  />
                  <span
                    className="absolute right-3 bottom-3 scale-75"
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
                    
                  <div className="relative w-full md:w-1/2  ">
                  <Input
                  Password={secondPasswordDisplay ? false : true}
                    Labelvalue={'Password'}
                     required
                     value={formData.PasswordTwo}
                     onChange={(value) =>
                      handleInputChange("PasswordTwo", value)}
                  />
                  <span
                    className="absolute right-3 bottom-3 scale-75"
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
                </div>
                    <Buttons value={'Sign Up'} click={createAcc} />
                    <p className="my-3 text-xs hover:underline cursor-pointer" onClick={ToggleLoggin}><span className="text-purple-600">Login</span> if you already own an account</p>
              </form>
            </div>
            )
          }

          {
            login && (
              <div  className="">
              <form onSubmit={logintoAcc}>
                <h1 className="text-3xl py-3 font-Ubuntu">
                  Log In
                </h1>
                <div className="w-full">
                  <Input
                    type="text"
                    Labelvalue={'User Name'}
                    required
                    value={formData.Email}
                    onChange={(value) =>
                      handleInputChange("Email", value)}
                  />
                  </div>
                  <div className="relative w-full my-8">
                  <Input
                    Password={loginPasswordDisplay ? true : false}
                    Labelvalue={'Password'}
                     required
                     value={formData.Password}
                     onChange={(value) =>
                      handleInputChange("Password", value)}
                  />
                  <span
                    className="absolute right-3 bottom-3 scale-75"
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
                <ButtonsTwo value={'Login'} click={logintoAcc} />
                <p className="my-3 text-xs hover:underline cursor-pointer" onClick={ToggleLoggin}>Dont have an account? <span className="text-purple-600">Sign Up</span></p>
              </form>
            </div>
            )
          }
        </div>
        <div className="">
          <div className="flex justify-center items-center gap-4 w-[80%] mx-auto">
            <span className="w-1/2 h-[1px] border-gray-800 border"></span>
        <p className="my-3 text-sm ">OR</p>
            <span className="w-1/2 h-[1px] border border-gray-800"></span>
          </div>
        <div className="flex flex-col gap-4 my-5 ">
          <div
            onClick={googleSignIn}
            className="flex items-center justify-evenly border rounded-2xl py-1  hover:scale-95 cursor-pointer transition hover:border-purple-700 md:w-1/3 w-full mx-auto"
          >
            <img src={googleIcon} alt="googleIcon" className="w-8" />
            <p className="text-xs">
              Sign Up with Google
            </p>
          </div>

          <div
            onClick={facebookSignIn}
            className="flex items-center justify-evenly border rounded-2xl py-1  hover:scale-95 cursor-pointer transition hover:border-purple-700 md:w-1/3 w-full mx-auto"
          >
            <img src={facebookIcon} alt="googleIcon" className="w-8" />
            <p className="text-xs">
              Sign Up with Facebook
            </p>
          </div>
        </div>
        <Link to={"/"}>
          <div className="flex gap-3 justify-center">
            <p className=" hover: transition">
              return home
            </p>
            <Home className="text-purple-500 transition hover:text-slate-950" />
          </div>
        </Link>
    </div>
        </div>
      </div>
      </>
  );
}

export default Forms;
