import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

const ImageSelector = () => {
    
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col  mb-5">
      <div className="relative">
        {selectedImage ? (
          <ImagePreview src={selectedImage} alt="Selected profile" className='w-44 h-44 md:w-72 md:h-72'/>
        ) : (
          <div className="flex items-center justify-center w-36 h-36  rounded-full border-2 border-purple-700 md:w-72 md:h-72">
            <CgProfile className='text-purple-600' size={50}/>
          </div>
        )}
        <Label htmlFor="file-input" className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
          <FaCamera size={15} />
        </Label>
      </div>
      <Input id="file-input" type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageSelector;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: white;
  border-radius: 50%;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ccc;
`;
