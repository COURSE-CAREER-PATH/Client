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
          className={`block px-2.5 pb-2.5 pt-4 text-sm text-neutral-300 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-neutral-300 focus:outline-none focus:ring-0 focus:border-purple-700 peer border w-full py-2 rounded-xl ${width ? 'w-full' : ''}`}
          placeholder=" "
          required
          value={value}
          onChange={handleChange}
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-4 scale-75 top-2 origin-[0] dark:bg-gray-900 px-0 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-neutral-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto backdrop-blur-3xl start-1 ml-2"
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
      className={`block px-2.5 pb-2.5 pt-4 text-sm text-neutral-300 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-neutral-300 focus:outline-none focus:ring-0 focus:border-purple-700 peer border w-full py-2 rounded-xl h-24`}
      placeholder=""
      required
      value={value}
      onChange={handleChange}
      >
      </textarea>
    <label
      htmlFor="floating_outlined"
      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-4 scale-75 top-2 origin-[0] dark:bg-gray-900 px-0 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-neutral-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto backdrop-blur-3xl start-1 ml-2"
    >
      {labelValue}
    </label>
  </div>
    )
  }