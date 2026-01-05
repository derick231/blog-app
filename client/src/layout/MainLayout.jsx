import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import { ImageKitProvider } from '@imagekit/react'
import ScrollToTop from '../Components/ScrollToTop'
import Footer from '../Components/Footer'

const MainLayout = () => {
  return (
    <ImageKitProvider urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT }>
    <div className='min-h-screen flex flex-col'>
      <ScrollToTop/>
       <main className="flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
    </ImageKitProvider>
  )
}

export default MainLayout