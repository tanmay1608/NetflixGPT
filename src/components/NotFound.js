import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  
   

    return (
        <div className='w-full h-screen bg-black text-white flex justify-center items-center  sm:text-2xl  '>
            <div className='  '>
        <h1 className='text-center p-2'>404 - Page Not Found</h1>
       <p className='p-2 text-center'>The page you are looking for doesn't exist or has been moved.</p>
       <Link to="/browse" className='flex justify-center p-2'>
       <p className='text-center sm:text-xl px-4 py-2 text-black bg-white rounded-3xl'>
       Go back to Home
        </p></Link>
      </div>
        </div>
      
    )
}

export default NotFound;
