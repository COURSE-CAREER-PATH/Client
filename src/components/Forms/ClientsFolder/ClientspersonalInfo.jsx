// ClientspersonalInfo.js
import React, { useRef, useState, useEffect } from "react";
import { Buttons, ButtonsTwo, Input, TextArea } from "../../Buttons";
import ImageSelector from "../../Dashboard/ImageSelector";
import { useGlobalState } from "./GlobalStateProvider";
import { ImLocation } from "react-icons/im";
import { DownloadIcon, Edit, LinkedinIcon, Trash } from "lucide-react";
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";
import { X } from "lucide-react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import FreelancerInfo from "./FreelancerFolder/FreeLancerInfo";
import ClientInfo from "./ClientInfo";
import { doc, updateDoc } from "firebase/firestore";
import { dataBase } from "../../config/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const InfoSection = `mt-28 h-auto flex flex-col  items-start lg:w-[33%] mx-4 my-3 border border-purple-700 rounded-3xl py-10 hover:border-neutral-400`;


const ClientspersonalInfo = () => {
  //variables
  const serverName = import.meta.env.VITE_SERVER_NAME;
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  //style options for the toast message
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const divRef = useRef(null);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (divRef.current) {
  //       divRef.current.scrollIntoView({ behavior: "mdooth" });
  //     }
  //   };

  //   // Attach the event listener for window resize
  //   window.addEventListener("resize", handleResize);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const { formData, setFormData, saveDataToFirestore, updateFormData } =
    useGlobalState();
  const [fullProfileImage, setFullProfileImage] = useState(false);
  const PersonalInfoRef = useRef(null);
  const freeLanceInfoRef = useRef(null);
  const ClientInfoRef = useRef(null);
  const topRef = useRef(null);
  const toggleProfileImage = () => {
    setFullProfileImage(!fullProfileImage);
    if (fullProfileImage) {
      enablePageScroll();
    } else {
      disablePageScroll();
    }
  };



  const ScrollToFreelanceInfo = () => {
    freeLanceInfoRef.current.scrollIntoView({
      behavior: "mdooth",
      block: "start",
    });
  };
  const ScrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: "mdooth" });
  };
  const ScrollToClientInfo = () => {
    ClientInfoRef.current.scrollIntoView({ behavior: "mdooth" });
  };
  const finishUp = () => {
    updateFormData();
    saveDataToFirestore();
    ScrollToTop();
  };
  const saveProfile = async () => {
    ScrollToFreelanceInfo();
    updateFormData();
    saveDataToFirestore();
    try {
      const response = await axios.post(`${serverName}user/register`, {
        uid: formData.uid,
        userName: formData.userName,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        additionalAddress: formData.aditionalAddress,
        Email: formData.Email,
        zipCode: formData.zipCode,
        Country: formData.Country,
        State: formData.State,
        ProfilePicture: formData.ProfilePicture,
        Language: formData.Language,
        Bio: formData.Bio,
        LinkedIn: formData.LinkedIn,
        Facebook: formData.Facebook,
        Twitter: formData.Twitter,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("userAuth", true);

      ScrollToFreelanceInfo();
    } catch (error) {
      console.log("error uploading :", error);
      toast.error("could not update profile ", error, toastOptions);
    }
  };
  
  const deleteProfilePicture = async () => {
    try {
      const userId = formData.uid; // Ensure that `formData` contains the user's ID

      if (!userId) {
        throw new Error("User ID is missing from formData.");
      }

      // Reference to the user's document in Firestore
      const userDocRef = doc(dataBase, "userInfo", userId);

      // Remove the ProfilePicture field from the document
      await updateDoc(userDocRef, {
        ProfilePicture: "", // Set it to an empty string or you can use firebase.firestore.FieldValue.delete() to completely remove the field
      });

      // Update the local state to remove the profile picture
      setFormData((prevFormData) => ({
        ...prevFormData,
        ProfilePicture: "",
      }));

      console.log(`Profile picture removed for user: ${userId}`);
    } catch (error) {
      console.error("Error removing profile picture: ", error);
    }
  };
  const EditUserinfo = ()=>{
    navigate('/edituserinfo')
    updateFormData();
    saveDataToFirestore();
  }

    const [showMore, setShowMore] = useState(false);
  
    // Helper function to split the bio into words
    const getBioWords = (bio) => bio.split(' ');
  
    // Calculate the number of words and limit to 10
    const bioWords = formData.Bio ? getBioWords(formData.Bio) : [];
    const isLongBio = bioWords.length > 10;
  
    // Show full text if `showMore` is true or limit to 10 words otherwise
    const displayedBio = isLongBio && !showMore
      ? bioWords.slice(0, 10).join(' ') + '...'
      : formData.Bio;
 
  return (
    // main div
    <div className="w-full md:w-[80%]  mx-auto">
   
    <div className=" font-josefin w-[30%]" ref={divRef}>
      {/* Profile photo full view */}
      {fullProfileImage && (
        <div className="absolute inset-0 flex items-center justify-center z-30 backdrop-blur-2xl w-[25%]">
          <div className="absolute h-auto w-full max-w-screen-md p-4 top-24">
            <button
              onClick={toggleProfileImage}
              className="absolute top-2 right-2 text-white  flex flex-col gap-8"
            >
              <X className="transform active:rotate-180 transition duration-500 ease-in-out" />
              <a
                href={formData.ProfilePicture}
                download="profileimage.jpg"
                className="transform active:animate-bounce transition duration-500 ease-in-out"
              >
                <DownloadIcon />
              </a>
              <span>
                <Trash onClick={deleteProfilePicture} />
              </span>
            </button>
            <div className="flex items-center justify-center ">
              <img
                src={formData.ProfilePicture}
                alt="No Profile Photo"
                className="max-h-[80dvh] w-[90%] rounded-3xl border border-purple-700 object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>

        <div className="flex flex-col md:flex-row mt-16 border rounded-2xl border-purple-700 hover:border-neutral-500">
        <div className="md:w-[50%] lg:w-[35%] w-full h-auto border-neutral-500 hover:border-purple-700 md:border-r flex flex-col py-4 items-center">
            <ImageSelector/>
            <h1 className="text-2xl md:text-4xl">
            {
              formData.userName ? (
                <span >
                     {formData.userName}
                </span>
              ): <span>
                User Name
              </span>
            }
          </h1>
          <span className="flex flex-wrap mx-16 px-2 text-md my-5 pb-6 border-b border-purple-700 hover:border-neutral-500 w-full justify-center">
            <span className="text-2xl">
            <ImLocation/>
            </span>
            <span>
            {
              formData.Country
            }-
            </span>
           <span>
           {
              formData.State
            }.
           </span>
            <span>
            {
              formData.City
            }.
            </span>
          </span>

          <span className="mt-5 w-[80%] mx-10">
            <h2 className="font-bold text-xl">
              Language
            </h2>
            <p className="flex text-lg">
            {
              formData.Language ? (
                <h3 className="font-semibold">
                  {
                    formData.Language
                  }
                </h3>
              ) : 'Select your fluently spoken language'
            }
            </p>
          </span>
          <span className="mt-5 w-[80%] mx-10">
      <h2 className="font-bold text-xl">Bio</h2>
      <p className="flex text-md">
        {formData.Bio ? (
          <h3 className="font-semibold">
            {displayedBio}
          </h3>
        ) : 'Write Something about yourself'}
      </p>

      {isLongBio && (
        <button
          className="text-blue-500 hover:underline mt-2"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'See Less' : 'See More'}
        </button>
      )}
    </span>
              <div className="w-full">
            <h1 className="font-bold text-xl w-full mx-10">
              Links
            </h1>
            <span className="w-[80%] h-64 mx-auto rounded-2xl bg-gray-900 flex flex-col justify-evenly">
              <a href={formData.LinkedIn? formData.LinkedIn : '/*'} target='_blank' rel="noopener noreferrer" className="flex flex-row gap-3 items-center mx-auto hover:text-neutral-500 hover:underline transition duration-500">
              <p>
                {
                  <LinkedinIcon/>
                }
              </p>
              <p>LinkedIn</p>
              </a>
              <a href={formData.Facebook? formData.Facebook : '/*'} target='_blank' rel="noopener noreferrer" className="flex flex-row gap-3 items-center mx-auto hover:text-neutral-500 hover:underline transition duration-500">
              <p>
                {
                  <FaFacebook/>
                }
              </p>
              <p>Facebook</p>
              </a>
              <a href={formData.Twitter? formData.Twitter : '/*'} target='_blank' rel="noopener noreferrer" className="flex flex-row gap-3 items-center mx-auto hover:text-neutral-500 hover:underline transition duration-500">
              <p>
                {
                  <BsTwitterX/>
                }
              </p>
              <p>Twitter</p>
              </a>
            </span>
          </div>
          <span className="mt-5">
                <Buttons value={'Edit Profile'} icon={(<CiEdit/>)} click={EditUserinfo}/>
          </span>
          </div>
          <div className="md:w-[50%] lg:w-[65%] w-full">
          <FreelancerInfo/>
          </div>
        </div>
      <ToastContainer />
    </div>
  );
};

export default ClientspersonalInfo;
