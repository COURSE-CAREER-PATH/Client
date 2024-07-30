import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useGlobalState } from './GlobalStateProvider';

const StarRating = ({ totalStars = 5 }) => {
    const { formData, setFormData } = useGlobalState();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
  
    const handleRatingChange = (newRating) => {
      setRating(newRating);
      setFormData({ ...formData, rating: newRating }); // Update formData
    };
  
    return (
      <div className="flex space-x-1 items-center">
        <h1 className="text-xs mt-1 tracking-tighter">skill level:</h1>
        {[...Array(totalStars)].map((_, index) => {
          const starRating = index + 1;
          return (
            <Star
              key={index}
              className={`w-4 h-4 cursor-pointer transition-colors duration-200 ${
                (hoverRating || rating) >= starRating ? "text-yellow-500" : "text-gray-500"
              }`}
              onClick={() => handleRatingChange(starRating)}
              onMouseEnter={() => setHoverRating(starRating)}
              onMouseLeave={() => setHoverRating(0)}
            />
          );
        })}
      </div>
    );
  }

export default StarRating;
