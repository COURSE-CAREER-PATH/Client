import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useGlobalState } from '../Forms/ClientsFolder/GlobalStateProvider';

const ImageSelector = () => {
  const { formData, setFormData } = useGlobalState();
  const [selectedImage, setSelectedImage] = useState(null);



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setSelectedImage(imageDataUrl);
        // Update the global state with the selected image
        setFormData({
          ...formData,
          ProfilePicture: imageDataUrl,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col mb-5">
        <div className="relative">
          {selectedImage ? (
            <ImagePreview
              src={selectedImage}
              alt="Selected profile"
              className="w-44 h-44 transition active:scale-95 cursor-pointer border border-purple-700"
            />
          ) : (
            <div className="flex items-center justify-center w-44 h-44 rounded-full border-2 border-purple-700">
              <CgProfile className="text-purple-600" size={60} />
            </div>
          )}
          <Label htmlFor="file-input" className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4  
          transition active:scale-125 cursor-pointer
          ">
            <FaCamera size={30} className=''/>
          </Label>
        </div>
        <Input id="file-input" type="file" accept="image/*" onChange={handleImageChange} />
      </div>
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
