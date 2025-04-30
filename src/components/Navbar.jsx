import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-white ">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-center">
        <div className="flex items-center  space-x-4">
          <img 
            className="w-12 h-12 object-contain" 
            src="logo.png" 
            alt="Delhivery Logo" 
          />
          <h1 className="text-2xl font-bold  text-gray-800">
            Delhivery Status
          </h1>
        </div>
        
        {/* You can add navigation links here if needed */}
        {/* <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Tracking</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
        </div> */}
      </nav>
      <div className="border-b border-gray-200"></div>
    </header>
  );
};

export default Navbar;