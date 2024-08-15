import React, { useState, useEffect, useCallback } from 'react';
import { useGlobalState } from '../GlobalStateProvider';
import { ImagePlus, Trash } from 'lucide-react';
import { Auth, Storage, dataBase } from '../../../config/firebase'; // Ensure dataBase is initialized
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore methods
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'; // Import Storage methods

const ImagePortfolio = () => {
  const { setFormData, formData } = useGlobalState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading
  const user = Auth.currentUser; // Get the current user

  // Function to fetch user's images from dataBase
  const fetchUserImages = useCallback(async () => {
    if (user) {
      setLoading(true); // Show loading animation
      try {
        const userImagesRef = doc(dataBase, 'userInfo', user.uid);
        const docSnap = await getDoc(userImagesRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSelectedImages(data.Portfolio || []);
          setFormData(prevFormData => ({
            ...prevFormData,
            Portfolio: data.Portfolio || [],
          }));
        }
      } catch (error) {
        console.error("Error fetching user images: ", error);
      } finally {
        setLoading(false); // Hide loading animation
      }
    }
  }, [user, setFormData]);

  useEffect(() => {
    fetchUserImages();
  }, [fetchUserImages]); // Only run the effect if fetchUserImages changes

  // Upload images to Firebase Storage and save their URLs in dataBase
  const handleImagesUploaded = async (event) => {
    const files = event.target.files;
    const imageFiles = Array.from(files);

    setLoading(true); // Show loading animation

    try {
      const uploadPromises = imageFiles.map(async (file) => {
        const storageRef = ref(Storage, `userInfo/${user.uid}/portfolio/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      });

      const imagesDataURLs = await Promise.all(uploadPromises);
      const updatedImages = [...selectedImages, ...imagesDataURLs];

      setSelectedImages(updatedImages);
      setFormData(prevFormData => ({
        ...prevFormData,
        Portfolio: updatedImages,
      }));

      // Save the URLs to dataBase
      if (user) {
        const userImagesRef = doc(dataBase, 'userInfo', user.uid);
        await setDoc(userImagesRef, { Portfolio: updatedImages }, { merge: true });
      }

      console.log("Images successfully uploaded:", imagesDataURLs);
    } catch (error) {
      console.error("Error uploading images: ", error);
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  // Handle image deletion
  const handleDeleteImage = async (index) => {
    const imageUrl = selectedImages[index];
    const updatedImages = selectedImages.filter((_, i) => i !== index);

    setLoading(true); // Show loading animation

    try {
      setSelectedImages(updatedImages);
      setFormData(prevFormData => ({
        ...prevFormData,
        Portfolio: updatedImages,
      }));

      // Update dataBase after deletion
      if (user) {
        const userImagesRef = doc(dataBase, 'userInfo', user.uid);
        await setDoc(userImagesRef, { Portfolio: updatedImages }, { merge: true });
      }

      // Delete the image from Firebase Storage
      const storageRef = ref(Storage, imageUrl);
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error deleting image: ", error);
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  return (
    <div className='relative'>
      <label htmlFor="img-upload" className='text-center absolute z-40 text-neutral-300 active:animate-spin hover:text-purple-700 top-0 cursor-pointer transition'>
        <ImagePlus />
      </label>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="w-16 h-16 border-4 border-t-4 border-b-purple-700 border-l-purple-700  border-gray-200 rounded-full animate-spin animation-delay-1200" role="status"></div>
        </div>
      )}
      {selectedImages.length > 0 ? (
        <div className='grid grid-cols-2 gap-4 h-64 overflow-y-scroll rounded-3xl scrollbar-none py-4 px-2'>
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
        <h1 className='mt-5 px-10 text-3xl'>No portfolio added</h1>
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
