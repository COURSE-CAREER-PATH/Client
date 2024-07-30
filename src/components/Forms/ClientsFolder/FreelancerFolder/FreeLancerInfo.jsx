import React, { useState } from 'react';
import { Buttons, ButtonsTwo } from '../../../Buttons';
import { useGlobalState } from '../GlobalStateProvider';
import { ImLocation } from 'react-icons/im';
import StarRating from '../StarRating';


const FreelancerInfo = () => {
  const { formData } = useGlobalState();
  const Skills = Array.isArray(formData.Jobs) ? formData.Jobs : [];
  const [seeMore, setSeeMore] = useState(false);

  const toggleSeeMore = () => {
    setSeeMore(!seeMore);
  };

  const freelancer = {
    personalInfo: {
      name: 'John Doe',
      title: 'Full-Stack Developer',
      location: 'New York, USA',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      profilePicture: formData.ProfilePicture,
      bio: 'Experienced developer with a passion for building scalable web applications and working across the full stack.'
    },
    portfolio: [
      {
        title: 'Project One',
        description: 'A full-stack web application for managing tasks.',
        imageUrl: 'path/to/project1.jpg',
        link: 'https://example.com/project1'
      },
      {
        title: 'Project Two',
        description: 'A mobile app for tracking fitness activities.',
        imageUrl: 'path/to/project2.jpg',
        link: 'https://example.com/project2'
      }
    ],
    testimonials: [
      {
        name: 'Client One',
        feedback: 'John was amazing to work with. He delivered the project on time and exceeded our expectations.',
        company: 'Company One'
      },
      {
        name: 'Client Two',
        feedback: 'John’s expertise in full-stack development is unparalleled. Highly recommend!',
        company: 'Company Two'
      }
    ],
  };

  return (
    <>
      <h1 className='tracking-widest text-3xl'>
        Info As Freelancer
      </h1>
      <div className="mx-auto p-8">
      <h1>
        
      </h1>
      <div className="flex ">
        {/* <div className="relative w-32 h-32 rounded-full overflow-hidden flex items-center border border-purple-700 hover:scale-110 transition">
        <img src={freelancer.personalInfo.profilePicture} alt='Add Image' className='mx-auto'/>
        </div> */}
        <div>
          <h1 className="text-4xl font-bold">
            {
              formData.firstName && formData.lastName && formData.middleName? (
                <p className='flex gap-3'>
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
          <p className="text-xl text-gray-600">
            {formData.Profession? formData.Profession : (
              <b>
                Profession
              </b>
            )}
          </p>
          <div className="text-gray-600">
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
          <p className="text-gray-600">{formData.Email? formData.Email : (
            <b>
              No Added Email
            </b>
          )}</p>
          <p className="text-gray-600">{formData.mobileNumber? formData.mobileNumber :(
            <b>
              No added Mobile Number 
            </b>
          )}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Deescribe Work History And Profession</h2>
        <span className="text-gray-700 mt-2">{formData.Overview? formData.Overview : (
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
          <div className="rounded-full px-4 py-2 border border-purple-700 text-neutral-300  cursor-pointer">
            <div className="">
            {skill.label}
            <StarRating/>
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

      <div className="">
        {seeMore && (
          <>
            {/* Portfolio */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                {freelancer.portfolio.map(project => (
                  <div key={project.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="text-gray-700 mt-2">{project.description}</p>
                      <a href={project.link} className="text-blue-500 mt-4 inline-block">View Project</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold">Testimonials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                {freelancer.testimonials.map(testimonial => (
                  <div key={testimonial.name} className="bg-white rounded-lg shadow-lg p-4">
                    <p className="text-gray-700">{testimonial.feedback}</p>
                    <p className="text-gray-800 font-bold mt-2">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.company}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold">Contact</h2>
              <div className="flex space-x-4 mt-4">
                
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
