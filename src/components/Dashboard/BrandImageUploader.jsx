import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../Forms/ClientsFolder/GlobalStateProvider';
import { FaCamera } from 'react-icons/fa';
import { IoPersonOutline } from 'react-icons/io5';
import Compressor from 'compressorjs';

const BrandImageUploader = () => {
  const { formData, setFormData } = useGlobalState();
  const [brandSelectedImage, setBrandSelectedImage] = useState(null);

  useEffect(() => {
    if (formData.companyLogo) {
      setBrandSelectedImage(formData.companyLogo);
    }
  }, [formData.companyLogo]);

  const compressImage = (file, quality, resolve) => {
    new Compressor(file, {
      quality: quality,
      success: (compressedFile) => {
        if (compressedFile.size <= 800 * 1024 || quality <= 0.1) {
          resolve(compressedFile);
        } else {
          compressImage(file, quality - 0.1, resolve);
        }
      },
      error: (err) => {
        console.error("Image compression failed:", err.message);
      },
    });
  };

  const handleBrandImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      new Promise((resolve) => {
        compressImage(file, 0.7, resolve);  // Start with a quality of 0.7
      }).then((compressedFile) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataUrl = reader.result;
          setBrandSelectedImage(imageDataUrl);
          setFormData({ ...formData, companyLogo: imageDataUrl });
        };
        reader.readAsDataURL(compressedFile);
      });
    }
  };

  return (
    <div className="">
      <div className="flex flex-col mb-5">
        <div className="relative">
          {brandSelectedImage ? (
            <img
              src={brandSelectedImage}
              alt="Selected brand profile"
              className="w-44 h-44 transition active:scale-95 cursor-pointer border border-purple-700 rounded-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-44 h-44 rounded-full border-2 border-purple-700">
              <IoPersonOutline className="text-purple-600" size={100} />
              <div className="">
                <p>Company logo</p>
              </div>
            </div>
          )}
          <label
            htmlFor="brand-file-input"
            className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 transition active:scale-125 cursor-pointer"
          >
            <FaCamera size={30} />
          </label>
        </div>
        <input id="brand-file-input" type="file" accept="image/*" onChange={handleBrandImageChange} className="hidden" />
      </div>
    </div>
  );
};

export default BrandImageUploader;
