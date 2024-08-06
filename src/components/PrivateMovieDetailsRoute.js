import React from 'react'

const PrivateMovieDetailsRoute = () => {
    const userInfo = localStorage.getItem('user');
    return userInfo ? <Outlet/> : <Navigate to={"/"}/>
}

export default PrivateMovieDetailsRoute

