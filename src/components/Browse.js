
import Header from "./Header";
import {useNowplayingMovies} from "../hooks/useNowplayingMovies"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import SearchPage from "./SearchPage";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import Footer from './Footer'

const Browse = () =>{

  const showGPTSearch=useSelector((store)=> store.gpt?.showGPTSearch);
  const isDropdownVisible=useSelector((store)=> store.config?.showDropdown);
 
  

  useNowplayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  

  return (
    <div className="relative  h-screen bg-black overflow-x-scroll scrollbar-none scrollbar-hide">
      <Header/>
      {
        isDropdownVisible && <Dropdown/>
      }
     
      {
        showGPTSearch ? <SearchPage/> :<>
        <MainContainer/>
        <SecondaryContainer/></>
      }
      {/*Mobile View */}
      <Footer/>
      
    
    </div>
  )
}

export default Browse
