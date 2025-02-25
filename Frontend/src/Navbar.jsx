import React from 'react'
import {Link} from 'react-router-dom'
import Signin from './components/Signin';
import Login from './components/Login';
const Navbar = () => {
  return (
    <>
      <nav className='sticky top-0 py-6 lg :py-4 sm:py-5 border-b border-neutral-700/80'>
        <div className="container px-4 mx-auto">
          <div className="flex justify-between">
            <div className='flex items-center'>
              <a className='text-2xl' href='\'>😉 Let's Talk</a>
            </div>
            <div className="lg:flex justify-center space-x-10 items-center">
              <Link to={'/signin'} className='border-2 px-3 py-2 rounded-lg'>Sign in</Link>
              <Link to={'/login'} className='border-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-900 '>Log in</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar