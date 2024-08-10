import React from "react";

const Shimmer = () => {
  return (
    <div className="w-full  bg-gray-400 pb-10 h-full">
      <div className="max-w-screen m-4 mt-0 h-[400px] bg-gray-500 flex items-end">
        <div className="w-full">
          <div className="bg-gray-600 p-4 m-2 w-1/4"></div>
          <div className="bg-gray-600 p-4 m-2 w-2/4"></div>
        </div>
      </div>
      <div className="max-w-screen flex flex-wrap  justify-center ">
        <div className="bg-gray-500 w-36 h-44 m-4"></div>
        <div className="bg-gray-500 w-36 h-44 m-4"></div>
        <div className="bg-gray-500 w-36 h-44 m-4"></div>
        <div className="bg-gray-500 w-36 h-44 m-4"></div>
        <div className="bg-gray-500 w-36 h-44 m-4"></div>
      </div>
    </div>
  );
};

export default Shimmer;
