import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import EarthImagery from './pages/EarthImagery.jsx';
import AstronomyPictureDay from './pages/AstronomyPictureDay.jsx';
import MarsRoverPhotos from './pages/MarsRoverPhotos.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import { AuthProvider } from './services/AuthContext.jsx';





const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/mars-rover-photos",
        element: <MarsRoverPhotos />,
      },
      {
        path: "/astronomy-picture-day",
        element: <AstronomyPictureDay />,
      },
      {
         
        path: "*",
        element: <div>404</div>

      },
      {
        path:"/earth-imagery",
        element:<EarthImagery/>
      },
      {
        path:"/login",
        element:<LoginPage/>
      },
      {
        path:"/signup",
        element:<SignupPage/>
      }
      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


<AuthProvider> {/* Wrap your RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>

  
  </React.StrictMode>
)
