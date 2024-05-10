import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ApodCard = ({pic}) => {

   


    

  return (
  <>
    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
              <a href="#">
                    <LazyLoadImage className="rounded-t-lg" src={pic.url} alt={pic.title}/>
                  
              </a>
              <div className="p-5">
                  <a href="#">
                      <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{pic.title}</h5>
                  </a>
                  <p className="font-normal text-gray-700 mb-3">{pic.explanation}</p>
                  <a className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="#">
                      Read more
                  </a>
              </div>
          </div>
  </>
  )
}

export default ApodCard