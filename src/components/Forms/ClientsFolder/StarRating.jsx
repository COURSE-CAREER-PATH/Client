import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useGlobalState } from './GlobalStateProvider';

const StarRating = ({ totalStars = 5, index }) => { // Accept index or id as a prop
    const { formData, setFormData } = useGlobalState();
    const [rating, setRating] = useState(formData.ratings[index] || 0); // Get initial rating from formData
    const [hoverRating, setHoverRating] = useState(0);
  
    const handleRatingChange = (newRating) => {
      setRating(newRating);

      // Create a copy of the ratings array and update the rating at the current index
      const updatedRatings = [...formData.ratings];
      updatedRatings[index] = newRating;

      setFormData({ ...formData, ratings: updatedRatings }); // Update formData with the updated array
    };
  
    return (
      <div className="flex space-x-1 items-center">
        <h1 className="text-xs mt-1 tracking-tighter">Skill level:</h1>
        {[...Array(totalStars)].map((_, i) => {
          const starRating = i + 1;
          return (
            <Star
              key={i}
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
