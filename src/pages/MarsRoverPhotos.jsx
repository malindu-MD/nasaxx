import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import axios from "axios";

import toast, { Toaster } from 'react-hot-toast';

import React, { useEffect, useRef, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ApodCard from '../components/ApodCard';
import { useAuth } from '../services/AuthContext';


const MarsRoverPhotos = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  const dateRef = useRef();
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let todayIsoDate = `${today.getFullYear()}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;

  const data = [
    { name: 'Front Hazard Avoidance Camera', value: 'FHAZ', /* other properties */ },
    { name: 'Rear Hazard Avoidance Camera', value: 'RHAZ', /* other properties */ },
    { name: 'Navigation Camera', value: 'NAVCAM', /* other properties */ },
    { name: 'Mast Camera', value: 'MAST', /* other properties */ },
    { name: 'Chemistry and Camera Complex', value: 'CHEMCAM', /* other properties */ }
    // Add more data as needed
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('You must be logged in to access this page');
      navigate('/login');
    }
    fetchRoverPhotos(selectedOption); // Pass selectedOption here
  }, []);

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchRoverPhotos(selectedOption) {
    try {
      setLoading(true);
      let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=ffbveoU6FIL6zg9dfcJr7JWq5P3M31xb5YD4yMGZ`;
      if (selectedOption) {
        url += `&camera=${selectedOption}`;
      }
      const response = await axios.get(url);
      setPhotos(response.data.photos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rover photos:", error);
    }
  }

  const handleCameraChange = () => {
    fetchRoverPhotos(selectedOption);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [selectedOption, setSelectedOption] = useState('');

  async function allphotos() {
    setSelectedOption('');
    await fetchRoverPhotos(); // Wait for fetchRoverPhotos to complete
    console.log('All Photos');
  }

  return (
    <>
      <div className='flex'>
        <Toaster />
        <div className='px-4 py-20 mx-auto'>
          <div className='text-black text-center'>
            <div class="m-2 max-w-screen-md">
              <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <h2 class="text-stone-700 text-xl font-bold">Mars Rover Photos</h2>
                <div class="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1">
                  <div class="flex flex-col">
                    <label for="date" class="text-stone-600 text-sm font-medium">Select and Search according to Camera</label>
                  </div>
                  <div class="flex flex-col">
                    <div>
                      <select
                        id="status"
                        className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        onChange={handleDropdownChange}
                        value={selectedOption}
                      >
                        <option value="">Select an option</option>
                        {data.map(item => (
                          <option key={item.value} value={item.value}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div class="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                  <button onClick={allphotos} class="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90">All Photo</button>
                  <button onClick={handleCameraChange} class="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto '>
        <div className='flex justify-center'>
          <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-11'>
            <Backdrop
              sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {loading ? (<>
            
              <div className='flex justify-center h-40 mb-3 mt-3' role="status">

</div>
            </>):( photos.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.1, boxShadow: "8px 8px 8px rgb(100,100,100)" }}
                className="bg-transparent border-2 border-gray-600 rounded-xl p-3 text-center text-semibold text-black mb-2"
              >
                <img src={photo.img_src} alt={`Mars Rover Photo - Sol ${photo.sol}`} className="w-full h-64 object-cover mb-2" />
                <p className="text-xs">Rover Name  : {photo.rover.name}</p>
                <p className="text-xs">Earth Date : {photo.earth_date}</p>
                <p className="text-xs">Rover Landing Date : {photo.rover.landing_date}</p>
                <p className="text-xs">Rover Launch Date : {photo.rover.launch_date}</p>
                <p className="text-xs">Camera Name : {photo.camera.full_name}</p>
              </motion.div>
            )))}
          </div>
        </div>
      </div>
    </>
  )
}

const CameraOption = ({ name, onClick, isSelected }) => (
  <button
    className={`py-2 px-4 mx-2 text-sm rounded ${isSelected ? 'bg-amber-600 text-white' : 'bg-transparent text-white'} hover:bg-amber-600 hover:text-black`}
    onClick={onClick}
  >
    {name}
  </button>
);

export default MarsRoverPhotos;
