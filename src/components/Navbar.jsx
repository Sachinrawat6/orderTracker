import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="flex md:text-2xl py-4 relative justify-center items-center px-4 container mx-auto">
            <h2>Delhivery Status</h2>
            <img 
            className='w-20 '
            src="logo.png" alt="" />
        </nav>
        <hr  className='text-gray-200 container mx-auto'/>
    </div>
  )
}

export default Navbar