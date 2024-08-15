import React from 'react';

const classesOne = `px-3 border  rounded-lg py-1 mx-3 text-neutral-100 border-purple-800 bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 hover:border-collapse hover:text-purple-100`;
const classesTwo = `px-3 py-1 bg-gradient-to-tr from-purple-700 to-blue-700 rounded-lg hover:from-black hover:to-neutral- hover:text-purple-300 hover:border hover:border-purple-700`;

export const Buttons = ({ value, valueTwo }) => { 
    return (
        <div>
            <button className={`${classesOne} ${valueTwo? 'px-5 py-1 md:px-10 md:py-4 text-xl transform active:animate-ping transition duration-500 ease-in-out':''}`}>{value}</button>
        </div>
    );
};

export const ButtonsTwo = ({ value, valueTwo }) => {
    return (
        <div>
            <button className={`${classesTwo} ${valueTwo? 'px-5 py-1 md:px-10 md:py-4 text-xl transform active:animate-ping transition duration-500 ease-in-out':''}`}>{value}</button>
        </div>
    );
};
 
export const Input = ({ Labelvalue, Number, width, value, onChange }) => {
    const handleChange = (event) => {
      onChange(event.target.value);
    };
  
    return (
      <div className="relative">
        <input
          type={`${Number ? 'number' : 'text'}`}
          id="floating_outlined"
          className={`'block px-2.5 pb-2.5 pt-4 text-sm text-neutral-300 bg-transparent  border-gray-300 appearance-none dark:text-white dark:focus:border-neutral-300 focus:outline-none focus:ring-0 focus:border-purple-700 peer border-b w-full py-2 rounded-lg ${width ? 'w-full' : ''}`}
          placeholder=" "
          required
          value={value}
          onChange={handleChange}
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-4 scale-75 top-2 origin-[0]  px-0 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-neutral-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ml-2 -z-10"
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
      
    <div className="relative w-full md:w-1/2 md:mx-auto h-auto">
    <textarea
      id="floating_outlined"
      className={`'block px-2.5 pb-2.5 pt-4 text-sm text-neutral-300 bg-transparent  border-gray-300 appearance-none dark:text-white dark:focus:border-neutral-300 focus:outline-none focus:ring-0 focus:border-purple-700 peer border-b w-full py-2 rounded-lg`}
      placeholder=""
      required
      value={value}
      onChange={handleChange}
      >
      </textarea>
    <label
      htmlFor="floating_outlined"
      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-4 scale-75 top-2 origin-[0]  px-0 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-neutral-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ml-2 -z-10"
    >
      {labelValue}
    </label>
  </div>
    )
  }



  export const LoadingScreen = () => {
    return (
      <div className="flex justify-center items-center ">
        <div className="w-8 h-8 border-4  border-t-purple-700 border-r-purple-700 rounded-full animate-spin animation-delay-0" role="status"></div>
        <div className="w-8 h-8 border-4 border-t-4 border-r-purple-700 border-b-purple-700  border-gray-200 rounded-full animate-spin animation-delay-200" role="status"></div>
        <div className="w-8 h-8 border-4 border-t-4 border-b-purple-700 border-l-purple-700  border-gray-200 rounded-full animate-spin animation-delay-400" role="status"></div>
        <div className="w-8 h-8 border-4 border-t-4 border-l-purple-700 border-t-purple-700  border-gray-200 rounded-full animate-spin animation-delay-600" role="status"></div>
        <div className="w-8 h-8 border-4 border-t-4 border-t-purple-700 border-r-purple-700  border-gray-200 rounded-full animate-spin animation-delay-800" role="status"></div>
        <div className="w-8 h-8 border-4 border-t-4 border-r-purple-700 border-b-purple-700  border-gray-200 rounded-full animate-spin animation-delay-1000" role="status"></div>
        <div className="w-8 h-8 border-4 border-t-4 border-b-purple-700 border-l-purple-700  border-gray-200 rounded-full animate-spin animation-delay-1200" role="status"></div>
      </div>
    );
  }
  
  
  