
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import React, { useEffect, useRef, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ApodCard from '../components/ApodCard';
import { useAuth } from '../services/AuthContext';


const AstronomyPictureDay = () => {
  const  navigate  = useNavigate();
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  const dateRef = useRef();
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let todayIsoDate = `${today.getFullYear()}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;

  useEffect(() => {
    if (!isLoggedIn) {
        toast.error('You must be logged in to access this page');
      navigate('/login');
    
    }
    getData();
  }, []);

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
   
  
  async function getData() {
      setLoading(true);
      const response = await fetch(`https://api.nasa.gov/planetary/apod?count=20&thumbs=True&api_key=gkc3ViyuVbRcpzpy2WjEZlCeyOMaTLJkAW80qE5F`);
      const data = await response.json();
      dateRef.current.value = "";
      setPhotos(data);
      setLoading(false);
      console.log(data);


      
    }
  
    async function getSearchData(date) {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?start_date=${date}&api_key=gkc3ViyuVbRcpzpy2WjEZlCeyOMaTLJkAW80qE5F`);
        const data = await response.json();
        setPhotos(data);
  
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }


    const searchDate = () => {
      if (dateRef.current.value !== "") {
        setLoading(true);
        getSearchData(dateRef.current.value);
      }
    }  

   

  return (
    <>
    <div className='flex'>
    <Toaster/>
    <div className='px-4 py-20 mx-auto'>
    <div className='text-black text-center'>
    
    <div class="m-2 max-w-screen-md">
  <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
    <h2 class="text-stone-700 text-xl font-bold">NASA's Astronomy Photo of the Day</h2>
    <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1">
    
      <div class="flex flex-col">
        <label for="date" class="text-stone-600 text-sm font-medium">Enter a start date to search!</label>
        <input placeholder='YYY-MM-DD' max={todayIsoDate} ref={dateRef} type="date" id="date" class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
      </div>

     
    </div>

    <div class="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
      <button onClick={getData} class="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90">Reset</button>
      <button  onClick={searchDate} class="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90">Search</button>
    </div>
  </div>
</div>

     
    </div>
</div>
   

    </div>

    
   <div className='max-w-7xl mx-auto '>
   <div className='flex justify-center'>
   <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-11'>

<Backdrop
  sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
>
  <CircularProgress color="inherit" />
</Backdrop>



{
    !photos || loading ?  (
    
<div className='flex justify-center h-40' role="status">

</div>

    ) :  ( photos.map((pic, index) => {
        return (
       
          <ApodCard pic={pic} key={index} />
       
        );


      }))
  
    } 




  

  
</div>
</div>
   </div>

   </>
  )
}

export default AstronomyPictureDay