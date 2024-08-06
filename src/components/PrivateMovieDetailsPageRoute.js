import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';


const PrivateMovieDetailsPageRoute = () => {
    const isSearchVisible=useSelector((store)=>store.config?.searchSection);
    
    return isSearchVisible ?  <Navigate to={"/browse"}/> : <Outlet/> ;
}

export default PrivateMovieDetailsPageRoute
