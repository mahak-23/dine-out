import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const errorInfo = useRouteError();
  console.log(errorInfo);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Oops! Something Went Wrong!!
      </h1>
      <h2 className="text-lg md:text-xl font-semibold">
        {errorInfo.status}: {errorInfo.statusText}
      </h2>
      <h3 className="text-base text-gray-600 mt-2">{errorInfo.data}</h3>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-[#e46f20] hover:bg-[#ff8c00] text-white rounded-lg transition-all"
      >
        Back Home
      </Link>
    </div>
  );
};

export default Error;
