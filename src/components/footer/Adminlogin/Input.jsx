import React from 'react'

const Input = () => {
  return (
    <div>
          <div className="relative w-[80%] lg:w-[100%] lg:mx-3 m-auto">
        <input
          type="password"
          id="floating_outlined"
          className="lg:mt-36 mt-20 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1  appearance-none dark:text-white dark:border-gray-600 focus:ring-0 focus:border-blue-600 peer outline-blue-700 border border-blue-700 "
          placeholder=" "
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Enter An Admin Password
        </label>
    </div>
    </div>
  )
}

export default Input