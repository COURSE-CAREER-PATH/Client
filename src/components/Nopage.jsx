import React from 'react'
import { Link } from 'react-router-dom'
import { Buttons } from './Buttons'


const Nopage = () => {
  return (
    <div>
        <h1 className='text-center mt-60 font-extrabold text-2xl'>
            Error 404: Page not found
        </h1>
        <p className='text-center'>
            We are currently working on this page please check back in a while.
        </p>
        <Link to={'/'} className='flex justify-center align-middle my-5'>
        <Buttons value={'Home'}/>
        </Link>
    </div>
  )
}

export default Nopage