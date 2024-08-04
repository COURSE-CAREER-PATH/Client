import React, { useState } from 'react';
import { useGlobalState } from '../GlobalStateProvider';
import { ImagePlus, Trash } from 'lucide-react';

const ImagePortfolio = () => {
  const { setFormData, formData } = useGlobalState();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImagesUploaded = (event) => {
    const files = event.target.files;
    const imageFiles = Array.from(files);
    const imageReaders = imageFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imageReaders).then(imagesDataURLs => {
      const updatedImages = [...selectedImages, ...imagesDataURLs];
      setSelectedImages(updatedImages);
      setFormData({
        ...formData,
        Portfolio: updatedImages,
      });
    });
  };

  const handleDeleteImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    setFormData({
      ...formData,
      Portfolio: updatedImages,
    });
  };
  
  return (
    <div className=''>
       <label htmlFor="img-upload" className='text-center absolute z-40 text-neutral-300 active:animate-spin hover:text-purple-700 top-0 cursor-pointer transition '>
        <ImagePlus/>
      </label>
      {selectedImages.length > 0 ? (
        <div className='grid grid-cols-3 gap-4 h-64 overflow-y-scroll rounded-3xl scrollbar scrollbar-thumb-purple-700 scrollbar-track-purple-300 scrollbar-thumb-rounded-full p-2 '>
          {selectedImages.map((image, index) => (
            <div key={index} className='relative'>
              <Trash 
                className='absolute m-2 w-4 cursor-pointer'
                onClick={() => handleDeleteImage(index)} 
              />
              <img
                src={image}
                alt={`portfolio-${index}`}
                className='w-full h-full object-cover rounded-3xl'
              />
            </div>
          ))}
        </div>
      ) : (
        <h1 className=' mt-5 px-10 text-3xl'>No portfolio added</h1>
      )}
      <input
        id='img-upload'
        type="file"
        onChange={handleImagesUploaded}
        multiple
        accept="image/*"
        className="mt-4 hidden"
      />
    </div>
  );
};

export default ImagePortfolio;
