import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'

const GPTSearchBar = () => {
    const langKey=useSelector((store)=>store.config?.lang);
    console.log(lang[langKey]);
  return (
    <div className='pt-[10%] '>
        <div className='flex justify-center items-center bg-black '>
        <input type='text' placeholder={lang[langKey].gptSearchPlaceholder}
      className=' h-10 m-4 w-1/4  bg-white border-neutral-400  px-3 py-2 text-sm  placeholder:text-gray-600 '></input>
      <button  className='bg-red-500 py-2 px-4  text-white rounded-lg '>{lang[langKey].search}</button>
        </div>
     
    </div>
  )
}

export default GPTSearchBar
