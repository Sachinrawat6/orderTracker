import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="flex md:justify-evenly gap-4 md:text-2xl py-4 justify-between px-4 items-center">
            <h2>Order Tracking</h2>
            <img 
            className='w-20'
            src="https://qurvii.com/cdn/shop/files/Qurvii_Logo_400X400_Pixels.jpg?v=1731629640&width=400" alt="" />
        </nav>
        <hr  className='text-gray-200'/>
    </div>
  )
}

export default Navbar