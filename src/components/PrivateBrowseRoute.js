import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateBrowseRoute = () => {
  const userInfo = localStorage.getItem("user");

  return userInfo ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateBrowseRoute;
