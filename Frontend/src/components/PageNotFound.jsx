import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center" style={{height:'65vh'}}>
      <h1 className="text-6xl font-bold text-blue-500 mb-4 work">404</h1>
      <h2 className="text-2xl text-white mb-6">Oops! Page not found.</h2>
      <p className="text-gray-300 mb-8">The page you are looking for might have been removed or is temporarily unavailable.</p>
      <Link to="/home" className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-700 rounded-lg shadow-md transition work">
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
