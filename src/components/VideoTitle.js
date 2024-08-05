import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='absolute pt-[17%]  px-24 bg-gradient-to-r from-black w-screen aspect-video z-10'>
      <h1 className='text-5xl font-bold text-white w-2/4'>{title}</h1>
      <p className='text-base py-6 text-white w-1/4 '>{overview}</p>
      <div className='flex'>
        <button className='bg-white text-black font-bold py-2 px-8 mr-2 rounded-md mb-2 hover:bg-opacity-80'>Play</button>
        <button className='bg-gray-400 text-white font-bold py-2 px-8 ml-2 rounded-md mb-2 bg-opacity-80 hover:bg-opacity-50'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
