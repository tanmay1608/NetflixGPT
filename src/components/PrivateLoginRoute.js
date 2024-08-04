import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateLoginRoute = () => {
    const userInfo = localStorage.getItem('user');
    
    return userInfo ? <Navigate to={"/browse"}/> : <Outlet/>
}

export default PrivateLoginRoute
