import React from 'react'
import { motion } from "framer-motion"


const MarsCard = ({photo}) => {
  return (
    <>
    
    <motion.div
                            key={photo.id}
                            whileHover={{ scale: 1.1, boxShadow: "8px 8px 8px rgb(100,100,100)" }}
                            className="bg-transparent border-2 border-gray-600 rounded-xl p-3 text-center text-semibold text-white"
                        >
                            <img src={photo.img_src} alt={`Mars Rover Photo - Sol ${photo.sol}`} className="w-full h-64 object-cover mb-2" />
                            <p className="text-xs">Rover Name  : {photo.rover.name}</p>
                            <p className="text-xs">Earth Date : {photo.earth_date}</p>
                            <p className="text-xs">Rover Landing Date : {photo.rover.landing_date}</p>
                            <p className="text-xs">Rover Launch Date : {photo.rover.launch_date}</p>
                            <p className="text-xs">Camera Name : {photo.camera.full_name}</p>
                        </motion.div>


    </>
  )
}

export default MarsCard