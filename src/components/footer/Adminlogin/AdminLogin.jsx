import React from 'react'
import Styles from './Adminstyle.module.css'
import Input from './Input'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { ButtonsTwo } from '../../Buttons'

const AdminLogin = () => {
  return (
        <section className="flex flex-wrap bottom-0 top-0 gap-0">
            <div className="absolute self-center w-1/3 bg-white lg:h-[40dvh] h-[60dvh] m-auto inset-0 rounded-3xl flex lg:flex-row flex-col border lg:items-stretch items-center">
                <div className="lg:w-1/2 bg-gradient-to-tr from-blue-700 to-purple-700 rounded-3xl flex flex-col">
                    <h1 className='text-center py-5 text-2xl font-bold'>
                        WELCOME, ADMIN
                    </h1>
                    <h3 className='text-center  py-5 font-semibold'>
                       
                    </h3>
                </div>
                <div className=" justify-center items-center">
                    <Input/>
                        <div className="ml-16 my-2">
                        <ButtonsTwo value={'Submit'}/>
                        </div>
                </div>
                <Link to={'/'}>
                <h3 className='text-purple-700 text-center text-sm pt-8 hover:text-neutral-500 absolute '>
                    <Home/>
                </h3>
                </Link>
            </div>
        </section>
  )
}

export default AdminLogin