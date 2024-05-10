import React from 'react'
import apod from "../assets/apod.jpg";
import Earth from "../assets/Earth.png";
import Mars from "../assets/Mars.jpg";



const BlogCards = () => {
  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-11'>

<div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <a href="#">
            <img className="rounded-t-lg" src={apod} alt=""/>
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">Astronomy Picture of the Day</h5>
            </a>
            <p className="font-normal text-gray-700 mb-3">One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds; but generally help with discoverability of relevant imagery
</p>
            <a className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="https://api.nasa.gov/#browseAPI">
                Read more
            </a>
        </div>
    </div>


    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <a href="#">
            <img className="rounded-t-lg" src={Earth} alt=""/>
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">Earth Imagery</h5>
            </a>
            <p className="font-normal text-gray-700 mb-3">Landsat imagery is provided to the public as a joint project between NASA and USGS. A recent industry report on landsat satellite imagery data estimates that total annual value to the economy of $2.19 billion, far exceeding the multi-year total cost of building, launching, and managing Landsat satellites and sensors. The value is derived from consumers use of the data. The objective of this endpoint is to give you an easy to use taste of what Landsat imagery data can provide. There are more complicated APIs available if you want to build models on top of satellite imagery, apply machine-learning, or minimize clouds in your image. NASA's Earth Science Devision has a variety of Earth imagery APIs for developers, which you can find out about in the Earthdata Developer Portal. Specifically, the GIBS (Global Imagery Browse Services) API may be of interest. The Google Earth </p>
            <a className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="#https://api.nasa.gov/#browseAPI">
                Read more
            </a>
        </div>
    </div>

    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <a href="#">
            <img className="rounded-t-lg" src={Mars} alt=""/>
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">Mars Rover Photos</h5>
            </a>
            <p className="font-normal text-gray-700 mb-3">Each rover has its own set of photos stored in the database, which can be queried separately. There are several possible queries that can be made against the API. Photos are organized by the sol (Martian rotation or day) on which they were taken, counting up from the rover's landing date. A photo taken on Curiosity's 1000th Martian sol exploring Mars, for example, will have a sol attribute of 1000. If instead you prefer to search by the Earth date on which a photo was taken, you can do that, too. </p>
            <a className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="https://api.nasa.gov/#browseAPI">
                Read more
            </a>
        </div>
    </div>

    </div>
  )
}

export default BlogCards