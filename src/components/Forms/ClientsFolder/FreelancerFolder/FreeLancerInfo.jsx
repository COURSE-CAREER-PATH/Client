import React, { useState } from 'react';
import { Buttons, ButtonsTwo } from '../../../Buttons';
import { useGlobalState } from '../GlobalStateProvider';
import { ImLocation } from 'react-icons/im';
import StarRating from '../StarRating';
import ImagePortfolio from '../Portfolio/ImagePortfolio';
import DisplayProjects from '../Portfolio/DisplayProjects';


const FreelancerInfo = () => {
  const { formData } = useGlobalState();
  const Skills = Array.isArray(formData.Jobs) ? formData.Jobs : [];
  const [seeMore, setSeeMore] = useState(false);

  const toggleSeeMore = () => {
    setSeeMore(!seeMore);
  };

 
  return (
    <>
      <div className=" p-8">
      <div className="flex ">
        <div className=''>
          <h1 className=" font-bold text-2xl md:text-4xl">
            {
              formData.firstName && formData.lastName && formData.middleName? (
                <p className='flex gap-3  lg:gap-1'>
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
          <p className="text-xl ">
            {formData.Profession? formData.Profession : (
              <b>
                Profession
              </b>
            )}
          </p>
          <div className="">
          <b className='flex gap-1 text-xs my-1 md:my-2'>
          <p>
            <ImLocation/>
          </p>
          <p>
            {formData.Country},
          </p>
          <p>
            {formData.State},
          </p>
          <p>
            {formData.City}.
          </p>
        </b>
            </div>
          <p className="">{formData.Email? formData.Email : (
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
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Deescribe Work History And Profession</h2>
        <span className=" mt-2">{formData.Overview? formData.Overview : (
          <p>
            No added description
          </p>
        )}</span>
      </div>

      {/* Skills */}
      <div className="mt-8">
  <h2 className="text-2xl font-bold">Skills</h2>
  <div className="flex flex-wrap my-5">
    {Skills.length > 0 ? (
      Skills.map((skill, index) => (
        <div key={index} className="mr-4 mb-2">
          <div className="rounded-full px-4 py-2 border border-purple-700   cursor-pointer">
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


      <span onClick={toggleSeeMore}>
        {!seeMore ? (
          <Buttons value={'See More'} />
        ) : (
          <ButtonsTwo value={'See Less'} />
        )}
      </span>
      <div className="mt-8">
              <h2 className="text-2xl font-bold">Portfolio </h2>
              <div className=" border border-purple-700 rounded-3xl flex items-center w-full h-64 relative">
                  <ImagePortfolio/>
              </div>
            </div>

      <div className="">
        {seeMore && (
          <>
            {/* Portfolio */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Project Links </h2>
              <div className=" border border-purple-700 rounded-3xl flex items-center w-full h-64 ">
              <DisplayProjects/>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default FreelancerInfo;
