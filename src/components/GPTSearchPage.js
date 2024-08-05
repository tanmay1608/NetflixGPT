import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestions from './GPTMovieSuggestions'
import {BG_URL} from "../utils/constants"

const GPTSearchPage = () => {
  return (
    <div className='w-full  relative z-30 bg-black'>
      <GPTSearchBar/>
      <GPTMovieSuggestions/>
    </div>
  )
}

export default GPTSearchPage
