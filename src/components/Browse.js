
import Header from "./Header";
import {useNowplayingMovies} from "../hooks/useNowplayingMovies"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GPTSearchPage from "./GPTSearchPage";
import { useSelector } from "react-redux";

const Browse = () =>{

  const showGPTSearch=useSelector((store)=> store.gpt?.showGPTSearch);
  

  useNowplayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  

  return (
    <div className="relative">
      <Header/>
      {
        showGPTSearch ? <GPTSearchPage/> :<>
        <MainContainer/>
        <SecondaryContainer/></>
      }
      
    
    </div>
  )
}

export default Browse
