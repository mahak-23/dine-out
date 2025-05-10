import React from "react";

const Shimmer = ({ type = "card", count = 4 }) => {
  if (type === "menu") {
    return (
      <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen px-4 md:px-0">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 md:p-6 animate-pulse space-y-6">
          {/* Restaurant Header Shimmer */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-48 h-32 bg-gray-300 rounded-md"></div>
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-4 bg-gray-300 rounded w-12"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>

          {/* Menu Items Shimmer */}
          <div className="space-y-4">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 space-y-2 w-full">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                      <div className="h-4 bg-gray-300 rounded w-12"></div>
                    </div>
                  </div>
                  <div className="w-full md:w-24 h-20 bg-gray-300 rounded"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  } else if (type === "profile") {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-4xl animate-pulse">
        {/* Left Profile Shimmer */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-6 bg-gray-300 rounded"></div>
          <div className="w-40 h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Right Profile Shimmer */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-126px)] py-[20px] bg-gray-100 w-[100%]">
      {/* Search and Filter Shimmer */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mb-6 w-[100%] px-4">
        {/* Search Box */}
        <div className="flex w-full md:w-[50%] justify-center items-center h-12 bg-gray-200 rounded-md animate-pulse"></div>
        {/* Filter Toggle */}
        <div className="flex items-center gap-[6px]">
          <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-14 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Restaurant Cards Shimmer */}
      <div className="flex flex-wrap justify-center items-center gap-[20px] w-[85%]">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="w-[280px] h-[350px] bg-white rounded-[8px] shadow-md overflow-hidden animate-pulse"
            >
              {/* Image Shimmer */}
              <div className="w-full h-[60%]  bg-gray-200 rounded-t-lg"></div>
              <div className="p-3 space-y-3">
                {/* Title Shimmer */}
                <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                {/* Cuisines and Location */}
                <div className="w-4/5 h-3 bg-gray-200 rounded-md pb-1"></div>
                <div className="w-4/5 h-3 bg-gray-200 rounded-md pb-1"></div>
                {/* Ratings and Cost */}
                <div className="flex justify-between items-center my-1">
                  <div className="w-1/4 h-3 bg-gray-200 rounded-md"></div>
                  <div className="w-1/4 h-3 bg-gray-200 rounded-md"></div>
                  <div className="w-1/4 h-3 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shimmer;
