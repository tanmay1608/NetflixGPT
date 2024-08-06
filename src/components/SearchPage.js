import React from 'react'
import SearchBar from './SearchBar'
import MovieSuggestions from './MovieSuggestions'
import {BG_URL} from "../utils/constants"


const SearchPage = () => {
  return (
    <div className='w-full relative z-30 h-full bg-black'>
      <SearchBar/>
      <MovieSuggestions/>
      
    </div>
  )
}

export default SearchPage
