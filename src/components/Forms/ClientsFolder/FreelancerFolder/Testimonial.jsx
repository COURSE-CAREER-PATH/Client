import React from 'react'
import TestimonialVector from '../../../../assets/icons/testimonialvector.png' 

const Testimonial = () => {
  return (
    <div className='h-64'>
         <h1 className='text-center text-xs'>
            Clients commendations will appear here and will be visible in your profile when other visit it 
        </h1>
    <div className='w-1/2 md:w-1/4 mx-auto'>
        <img src={TestimonialVector} alt="Testimonial" />
    </div>
    </div>
  )
}

export default Testimonial