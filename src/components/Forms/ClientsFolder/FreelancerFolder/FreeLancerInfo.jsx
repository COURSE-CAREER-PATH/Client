import React, { useState } from 'react';
import { Buttons, ButtonsTwo } from '../../../Buttons';
import { useGlobalState } from '../GlobalStateProvider';
import { ImLocation } from 'react-icons/im';
import StarRating from '../StarRating';
import ImagePortfolio from '../Portfolio/ImagePortfolio';
import DisplayProjects from '../Portfolio/DisplayProjects';
import { ArrowDown, ArrowUp, Eye } from 'lucide-react';
import { ArrowSmallDownIcon } from '@heroicons/react/20/solid';
import Testimonial from './Testimonial';


const FreelancerInfo = () => {
  const { formData } = useGlobalState();
  const Skills = Array.isArray(formData.Jobs) ? formData.Jobs : [];

  return (
    <>
      <div className=" py-8 h-auto">
      <div className="flex border-b  px-6 p-10 border-neutral-500 hover:border-purple-700">
        <div className=''>
          <h1 className=" font-bold text-2xl md:text-4xl">
            {
              formData.firstName && formData.lastName && formData.middleName? (
                <p className='flex gap-3 flex-wrap  lg:gap-1'>
                  <b>
                    {formData.firstName}
                  </b>
                  <b>
                    {formData.middleName}
                  </b>
                     {formData.lastName}
                </p>
              ): <p>
                Full Name
              </p>
            }
          </h1>
          <p className="text-sm">{formData.Email? formData.Email : (
            <b>
              No Added Email
            </b>
          )}</p>
          <p className="">{formData.mobileNumber? formData.mobileNumber :(
            <b>
              No added Mobile Number 
            </b>
          )}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-xl mt-8 px-6">
            {formData.Profession? formData.Profession : (
              <b>
               No Profession
              </b>
            )}
          </p>
      <div className="mt-2 px-6">
        <h2 className="text-2xl font-bold">Describe Work History And Profession</h2>
        <span className=" mt-2">{formData.Overview? formData.Overview : (
          <p>
            No added description
          </p>
        )}</span>
      </div>

      {/* Skills */}
      <div className="mt-8 px-6 border-b border-purple-700 hover:border-neutral-500">
  <h2 className="text-2xl font-bold">Skills</h2>
  <div className="flex flex-wrap my-5">
    {Skills.length > 0 ? (
      Skills.map((skill, index) => (
        <div key={index} className="mr-4 mb-2">
          <div className="rounded-full px-4 py-2 border border-purple-700  cursor-pointer">
            <div className="" key={index}>
            {skill.label}
            <StarRating totalStars={5} index={index}/>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No added skill</p>
    )}
  </div>
</div>
          <div >
            {/* Portfolio */}
            <div className="mt-10 px-6">
              <h2 className="text-2xl font-bold">Portfolio </h2>
              <div className=" border-b border-purple-700 flex items-center w-full h-64 relative pb-8">
                  <ImagePortfolio/>
              </div>
            </div>

            <div className="mt-8 px-6">
              <h2 className="text-2xl font-bold">Testimonial </h2>
              <div className=" border-b border-purple-700  flex items-center w-full h-64 ">
               <Testimonial/>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default FreelancerInfo;
