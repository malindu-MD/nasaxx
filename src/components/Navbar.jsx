import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaXmark } from "react-icons/fa6";
import { useAuth } from '../services/AuthContext';
import toast from 'react-hot-toast';


const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) }

  const { isLoggedIn, logout, user} = useAuth();



  const logoutN = () => {
    // Perform login logic
    // If login is successful:
    logout();
    navigate('/login');
    toast.success('You have been logged out');  

  };


  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Astronomy Picture of the Day', path: '/astronomy-picture-day' },
    { name: 'Mars Rover Photos', path: '/mars-rover-photos' },
    { name: 'Earth Imagery', path: '/earth-imagery' }

  ]  

  return (
    <header className='bg-black text-white fixed top-0 left-0 right-0'>
        <nav className='px-4 py-4 max-w-7xl mx-auto flex justify-between items-center'>
            <a href="/" className="text-xl font-bold text-white">Nasa<span className='text-yellow-600'>X</span></a>
       

        {/* navitem for lg devices */}

        <ul className='md:flex gap-12 text-lg hidden'>
            {
                navLinks.map(({ name, path }) => <li className='text-white' key={path}>
                    <NavLink  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  } to={path} >{name}</NavLink>

                </li>
                )
            }
        </ul>

        {/* Login Button */}

        <div className='text-white lg:flex gap-4 items-center hidden'>
       
        {isLoggedIn && (
        <div className="flex items-center">
          <span className="mr-8 text-yellow-200 ">Hi {user} </span>
          <Link onClick={logoutN} to="/login">
            <button className='bg-yellow-600 px-6 py-2 font-medium rounded hover:bg-white hover:text-yellow-600 transition-all duration-200 ease-in'>Log out</button>
          </Link>
        </div>
      )}
      {!isLoggedIn && (
        <Link to="/login">
          <button className='bg-yellow-600 px-6 py-2 font-medium rounded hover:bg-white hover:text-yellow-600 transition-all duration-200 ease-in'>Log in</button>
        </Link>
      )}

        </div>

        

        {/* Mobile menu btn ,display mobile screen */}

       <div className='md:hidden'>
        <button onClick={toggleMenu} className='cursor-pointer'>
          
          {
            isMenuOpen ? <FaXmark className='w-5 h-5'/> : <FaBars className='w-5 h-5 '/>
          }
          
         </button>
       </div>
       </nav>

       {/* Mobile menu */}
       <div>

       <ul className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${isMenuOpen ? "fixed top-0 left-0 w-full transition-all ease-out duration-150":"hidden"}`}>
            {
                navLinks.map(({ name, path }) => <li className='text-black' key={path}>
                    <NavLink onClick={toggleMenu} to={path} >{name}</NavLink>

                </li>
                )
            }
        </ul>
       </div>
      

    </header>

  )
}

export default Navbar