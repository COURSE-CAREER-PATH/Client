import React from "react"
import { ScrollParallax, MouseParallax } from 'react-just-parallax';
import  whatwedo  from "."
import Photography from '../assets/img/img19.jpg'
import Architechture from '../assets/img/img16.jpg'
import Programming from '../assets/img/img6.jpg'
import Copywriting from '../assets/img/img14.jpg'
import CAD from '../assets/img/img5.jpg'
import Fitness from '../assets/img/img13.jpg'
import Gym from '../assets/img/img17.jpg'
import EState from '../assets/img/img12.jpg'
import Learning from '../assets/img/img11.jpg'
import VR from '../assets/img/img7.jpg'
import Interior from '../assets/img/img28.jpg'
import Pet from '../assets/img/img26.jpg'
import Ui from '../assets/img/img9.jpg'



export const Subhero = () => {
  return (
    <div className="">
        <div className="lg:mt-20 mt-[20rem]  mb-[5rem] border-b border-neutral-700  lg:border-t lg:pt-24">
            <h1 className="uppercase text-center pb-10 font-Ubuntu text-xl lg:text-3xl text-neutral-400">
                What We Do
            </h1>
            <ul>
                {whatwedo.map((item, index)=>(
                  <>
                  <div className="flex items-center  px-2 mx-auto max-w-screen-xl lg:px-6 lg:even:flex-row-reverse lg:flex-row flex-col gap-10 mt-10 pb-10  border-b" key={index}>
                    <div className="w-1/2">
                      <h1 className="text-center uppercase font-extrabold text-neutral-300 lg:text-xl text-lg mb-10">
                        {item.title}
                      </h1>
                      <h3 className="font-Ubuntu text-sm lg:text-lg text-neutral-400 text-center">
                        {item.text}
                      </h3>
                    </div>
                    <div className="w-1/2">
                      <img src={item.image} alt="" className="rounded-3xl border border-purple-700 hover:scale-95 transition"/>
                    </div>
                  </div>
                  </>
                ))}
            </ul>
        </div>
        <h1 className="uppercase text-center pb-10 font-Ubuntu text-xl lg:text-3xl text-neutral-400">
          Some of the many jobs we offer
        </h1>
        <div className=" px-2 mx-auto max-w-screen-xl lg:px-6 -z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
          <div className="col-span-2 sm:col-span-1 md:col-span-2  h-auto md:h-full flex flex-col">
            <p className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
              <img src={Architechture} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Architechture</h3>
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-2 ">
            <p className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4">
              <img src={Programming} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Programming</h3>
            </p>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
              <p className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
                <img src={Copywriting} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Copywriting</h3>
              </p>
              <p className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
                <img src={CAD} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">CAD designer</h3>
              </p>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
            <p className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
              <img src={Photography} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
             
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Photography</h3>
            </p>
          </div>
        </div>
      <div className="columns-1 md:columns-2 xl:columns-3 gap-7 my-2 md:my-4">
      <div className=" break-inside-avoid mb-8 overflow-hidden rounded-lg">
      <h3 className="mx-5 text-neutral-200 text-3xl z-10 absolute">GYM Instructors</h3>
      <img className="h-auto max-w-full  hover:scale-105 transition-transform duration-500 ease-in-out rounded-lg" src={Gym} alt="Gallery image" />
      </div>
      <div className=" break-inside-avoid  mb-8 overflow-hidden rounded-lg">
      <h3 className="mx-5 text-neutral-200 text-3xl z-10 absolute">Fitness Trainer</h3>
      <img className="h-auto max-w-full rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out" src={Fitness} alt="Gallery image" />
      </div>
      <div className=" break-inside-avoid mb-8 overflow-hidden rounded-lg">
      <h3 className="mx-5 text-neutral-200 text-3xl z-10 absolute ">Real Estate</h3>
      <img className="h-auto max-w-full rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out" src={EState} alt="Gallery image" />
      </div>
      <div className=" break-inside-avoid  mb-8 overflow-hidden rounded-lg">
      <h3 className="mx-5 text-neutral-200 text-3xl z-10 absolute">Virtual Reality</h3>
      <img className="h-auto max-w-full rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out" src={VR} alt="Gallery image" />
      </div>
      <div className=" break-inside-avoid  mb-8 overflow-hidden rounded-lg">
      <h3 className="mx-5 text-neutral-300 text-3xl z-10 absolute">UI/UX Designer</h3>
      <img className="h-auto max-w-full rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out" src={Ui} alt="Gallery image" />
      </div>
      <div className=" break-inside-avoid  mb-8 overflow-hidden rounded-lg">
      <h3 className="mx-5 text-neutral-500 text-3xl z-10 absolute">Pet Care Specialist</h3>
      <img className="h-auto max-w-full rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out" src={Pet} alt="Gallery image" />
      </div>
      <div className=" break-inside-avoid  mb-8 overflow-hidden rounded-lg">
      <h3 className="mx-5 text-neutral-500 text-3xl z-10 absolute">Interior Designer</h3>
      <img className="h-auto max-w-full rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out" src={Interior} alt="Gallery image" />
      </div>
      <div className=" break-inside-avoid  mb-8 overflow-hidden rounded-lg">
      <h3 className="mx-5 text-neutral-200 text-3xl z-10 absolute">E Tutor</h3>
      <img className="h-auto max-w-full rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out" src={Learning} alt="Gallery image" />
      </div>
      </div>
      </div>
        </div>
  )
}
