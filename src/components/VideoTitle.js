import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import {useSelector} from "react-redux";
import lang from "../utils/languageConstants";
import {Link} from "react-router-dom"

const VideoTitle = ({title,overview,id}) => {

  const langKey = useSelector((store) => store.config?.lang);
  return (
    <div className='hidden sm:block absolute  md:pt-[17%] sm:pt-[10%]  md:px-24 sm:px-12 sm:bg-gradient-to-r sm:from-black w-screen sm:aspect-video z-10'>
      <h1 className='hidden sm:block text-3xl w-[400px] md:text-5xl font-bold text-white md:w-[600px]'>{title}</h1>
      <p className=' hidden sm:block text-base py-6 text-white w-[400px] md:w-[600px] '>{overview}</p>
      <div className='flex '>
        <Link to={"/browse/"+id}>
        <button className='bg-white text-black font-bold py-2 px-4  mr-2 rounded-md mb-2 hover:bg-opacity-80 flex justify-center items-center'>{
            <FontAwesomeIcon className='pr-2 text-xl ' icon={faPlay} />} {lang[langKey].play}</button>
        </Link>
       
       <Link to={"/browse/"+id}>
       <button className='bg-gray-400 text-white font-bold py-2 px-4 ml-2 rounded-md mb-2 bg-opacity-80 hover:bg-opacity-50 flex justify-center items-center'>
       {<FontAwesomeIcon className='pr-2 text-xl' icon={faCircleInfo} />}{lang[langKey].moreInfo}</button>
       </Link>
       
      </div>
    </div>
  )
}

export default VideoTitle
