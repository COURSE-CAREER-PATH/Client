import React, { useState } from 'react';


const classesOne = `px-3 border  rounded-lg py-1 mx-3 border-purple-800 bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 hover:border-collapse hover:text-purple-100 flex items-center gap-2 justify-center mx-auto`;
const classesTwo = `px-3 py-1 bg-gradient-to-tr from-purple-700 to-blue-700 rounded-lg hover:from-black hover:to-neutral- hover:text-purple-300 hover:border hover:border-purple-700 rounded flex items-center gap-2 justify-center mx-auto`;

export const Buttons = ({ value, valueTwo, click, icon }) => { 
    return (
        <div>
            <button className={`${classesOne} ${valueTwo? 'px-5 py-1 md:px-10 md:py-4 text-xl transform active:animate-ping transition duration-500 ease-in-out':''}`} onClick={click}>
            <span>{value}</span>
            <span>{icon}</span>
            </button>
        </div>
    );
};

export const ButtonsTwo = ({ value, valueTwo, click, icon }) => {
    return (
        <div>
            <button className={`${classesTwo} ${valueTwo? 'px-5 py-1 md:px-10 md:py-4 text-xl transform active:animate-pulse transition duration-500 ease-in-out':''}`} onClick={click}>
            <span>{value}</span>
            <span>{icon}</span>
            </button>
        </div>
    );
};
 
export const Input = ({ Labelvalue, Number, width, value, onChange, Password }) => {
    const handleChange = (event) => {
      onChange(event.target.value);
    };
  
    return (
      <div className="relative">
        <input
          type={`${Number ? 'number' : Password ? 'password' : 'text'}`}
          id="floating_outlined"
          className={`'block px-2.5 pb-2.5 pt-4 text-sm bg-transparent  border-gray-300 appearance-none dark:text-white dark:focus:border-neutral-300 focus:outline-none focus:ring-0 focus:border-purple-700 peer border-b w-full py-2 transition duration-1000 ${width ? 'w-full' : ''}`}
          placeholder=" "
          required
          value={value}
          onChange={handleChange}
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-4 scale-75 top-2 origin-[0]  px-0 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ml-2 -z-10"
        >
          {Labelvalue}
        </label>
      </div>
    );
  };

  export const TextArea = ({labelValue, value, onChange})=>{
    const handleChange = (event) => {
      onChange(event.target.value);
    };
    return(
      
    <div className="relative w-full md:mx-auto h-auto">
    <textarea
      id="floating_outlined"
      className={`'block px-2.5 pb-2.5 pt-4 text-sm bg-transparent  border-gray-300 appearance-none dark:text-white dark:focus:border-neutral-300 focus:outline-none focus:ring-0 focus:border-purple-700 peer border-b w-full py-2 transition duration-1000`}
      placeholder=""
      required
      value={value}
      onChange={handleChange}
      >
      </textarea>
    <label
      htmlFor="floating_outlined"
      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-4 scale-75 top-2 origin-[0]  px-0 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ml-2 -z-10"
    >
      {labelValue}
    </label>
  </div>
    )
  }



  export const LoadingScreen = () => {
    return (
      <div className="flex justify-center items-center ">
        <div className="md:w-8 md:h-8 w-6 h-6  border-4  border-t-purple-700 border-r-purple-700 rounded-full animate-spin animation-delay-0" role="status"></div>
        <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-r-purple-700 border-b-purple-700  border-gray-200 rounded-full animate-spin animation-delay-200" role="status"></div>
        <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-b-purple-700 border-l-purple-700  border-gray-200 rounded-full animate-spin animation-delay-400" role="status"></div>
        <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-l-purple-700 border-t-purple-700  border-gray-200 rounded-full animate-spin animation-delay-600" role="status"></div>
        <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-t-purple-700 border-r-purple-700  border-gray-200 rounded-full animate-spin animation-delay-800" role="status"></div>
        <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-r-purple-700 border-b-purple-700  border-gray-200 rounded-full animate-spin animation-delay-1000" role="status"></div>
        <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-b-purple-700 border-l-purple-700  border-gray-200 rounded-full animate-spin animation-delay-1200" role="status"></div>
      </div>
    );
  }
  
  
import { XIcon, AlertOctagon, Info } from 'lucide-react'; // Assuming you're using lucide-react for icons
import { useGlobalState } from './Forms/ClientsFolder/GlobalStateProvider';

export const StaticToastNotification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { formData, setFormData, saveDataToFirestore, updateFormData } = useGlobalState();

  const toggleEmployerStatus = () => {
    setFormData(prevFormData => {
      const updatedFormData = {
        ...prevFormData,
        EmployerStatus: !prevFormData.EmployerStatus // Toggle status
      };
  
      // Save the updated form data after the state change
      saveToDB(updatedFormData);
      
      return updatedFormData;
    });
  };
  
  const saveToDB = async (updatedFormData) => {
    try {
      // Ensure the updatedFormData is passed correctly and saved to Firebase
      await updateFormData(updatedFormData); // Pass updated form data to update Firestore
      await saveDataToFirestore(updatedFormData); // Actually save to Firestore
      console.log("Data successfully updated!");
    } catch (error) {
      console.error("Error updating employer status:", error);
    }
  };

  const toggleNotification = ()=>{
    setIsVisible(!isVisible)
  }

  return (
    isVisible && (
      <div className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400 absolute z-50" role="alert">
        <div className="flex">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
            <AlertOctagon className="w-4 h-4" />
            <span className="sr-only">Info icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Disable Employer Status</span>
            <div className="mb-2 text-sm font-normal">Disabling your employer status will block job postings and related activities. Are you sure you want to proceed?</div> 
            <div className="grid grid-cols-2 gap-2">
              <div>
                <button 
                  onClick={toggleEmployerStatus} 
                  className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                  Sure
                </button>
              </div>
              <div>
                <button 
                  onClick={toggleNotification} 
                  className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  Not now
                </button> 
              </div>
            </div>    
          </div>
          <button 
            type="button" 
            onClick={toggleNotification}
            className="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <XIcon className="w-3 h-3" />
          </button>
        </div>
      </div>
    )
  );
};




import 'css-doodle';

export const CssDoodleComponent = () => {
  return (
    <div style={containerStyle}>
      <css-doodle>
        {`
          :doodle {
            @grid: 20 / 60vmin;
          }
          background: @pick(cyan, magenta, orange, green, blue);
          border-radius: 50%;
          scale: 0;
          opacity: 0;
          animation: m 4s linear infinite, spin 8s linear infinite, pulse 10s ease-in-out infinite;

          animation-delay: calc(
            -1s/@I * @i * @sin(@i)
          );

          @keyframes m {
            0%, 50%, 90% { scale: 1; opacity: 1; }
            25%, 75%, 100% { scale: 0; opacity: 0; }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.8; }
          }
        `}
      </css-doodle>
    </div>
  );
};

const containerStyle = {
  padding: 0,
  display: 'grid',
  placeContent: 'center',
  borderRadius: '50%', // Fully rounded corners
};
