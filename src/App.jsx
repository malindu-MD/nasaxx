import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import './index.css'
import './App.css'
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"


function App() {
  
   const auth = localStorage.getItem('user');

  return (
    <>
       <Navbar />
        
        

       <Outlet />

       <Toaster/>
       <Footer/>
     

    </>
  )
}

export default App
