
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import React, { useEffect, useRef, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ApodCard from '../components/ApodCard';
import { useAuth } from '../services/AuthContext';
import Mars from "../assets/Mars.jpg";


const EarthImagery = () => {

  const  navigate  = useNavigate();
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  const dateRef = useRef();
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let todayIsoDate = `${today.getFullYear()}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;
  const [Latitude, setLatitude] = useState("");
  const [Longitude, setLongitude] = useState("");

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
      const response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2018-01-01&dim=0.15&api_key=gkc3ViyuVbRcpzpy2WjEZlCeyOMaTLJkAW80qE5F`);
      const data = await response.json();
      dateRef.current.value = "";
      setPhotos(data);
      setLoading(false);
      console.log(data);


      
    }
  
    async function getSearchData(date) {

      try {
        console.log(Latitude, Longitude,date);
        const response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${Longitude}&lat=${Latitude}&date=${date}&dim=0.15&api_key=gkc3ViyuVbRcpzpy2WjEZlCeyOMaTLJkAW80qE5F`);
        const data = await response.json();
        console.log(data);
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
    <h2 class="text-stone-700 text-xl font-bold">NASA's Earth Imagery</h2>
    <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">

    <div class="flex flex-col">
        <label for="manufacturer" class="text-stone-600 text-sm font-medium">Longitude</label>
        <input type="text" value={Longitude} onChange={(e)=>setLongitude(e.target.value)} step="any" id="manufacturer" class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
      </div>

    <div class="flex flex-col">
        <label for="manufacturer" class="text-stone-600 text-sm font-medium">Latitude</label>
        <input type="text" value={Latitude} onChange={(e)=>setLatitude(e.target.value)} oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  step="any" id="manufacturer" class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
      </div>
    
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
   <div className='flex justify-center' >
  
<Backdrop
  sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
>
  <CircularProgress color="inherit" />
</Backdrop>





{
    !photos || loading ?  (
    
<div className='flex justify-center h-40 mb-3' role="status">

</div>

    ) :  (<>
    
    
<img class="h-auto max-w-full mb-5" src={photos.url} alt="Image loading......" />

<div className='flex justify-center h-40 mb-3 mt-3' role="status">

</div>

    
    
    </>)
  
    } 




  

  
</div>

   </div>

   </>
  )
}

export default EarthImagery