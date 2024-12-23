import React, { useState, useEffect } from 'react';
import Compressor from 'compressorjs';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useGlobalState } from '../Forms/ClientsFolder/GlobalStateProvider';

const ImageSelector = () => {
  const { formData, setFormData } = useGlobalState();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (formData.ProfilePicture) {
      setSelectedImage(formData.ProfilePicture);
    }
  }, [formData.ProfilePicture]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6, // Adjust the quality as needed (0.6 = 60% quality)
        success: (compressedFile) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageDataUrl = reader.result;
            setSelectedImage(imageDataUrl);
            setFormData({
              ...formData,
              ProfilePicture: imageDataUrl,
            });
          };
          reader.readAsDataURL(compressedFile);
        },
        error(err) {
          console.error("Image compression failed:", err.message);
        },
      });
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-col mb-5">
        <div className="relative">
          {selectedImage ? (
            <ImagePreview
              src={selectedImage}
              alt="Selected profile"
              className="w-44 h-44 transition active:scale-95 cursor-pointer border border-purple-700"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-44 h-44 rounded-full border-2 border-purple-700">
              <CgProfile className="text-purple-600" size={90} />
              <p>Profile Photo</p>
            </div>
          )}
          <Label
            htmlFor="file-input"
            className="absolute bottom-3 left-0 transform translate-x-1/4 translate-y-1/4 transition active:scale-125 cursor-pointer"
          >
            <FaCamera size={30} className="" />
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
