import { useState } from 'react';
import logo from '../assets/images/logo.png';
import Button from './Button';
import Hamburger from './Hamburger';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

function Header() {

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const toggleUserMenuOpen = () => setUserMenuOpen(!userMenuOpen);

  const [hamMenuOpen, setHamMenuOpen] = useState(false);

  const toggleHamMenu = () => setHamMenuOpen(!hamMenuOpen);

  return (
    <header className="bg-my-white flex justify-center py-2 shadow-md fixed w-full font-Inter text-my-black z-20">
      <div className='flex justify-between px-4 max-w-[1300px] w-full items-center'>
        <a href="">
          <img src={logo} alt="" className='h-7' />
        </a>
        <div className='w-1/2 md:block hidden'>
          <nav>
            <ul className='flex justify-around'>
            <Link className="hover:text-light-wood" to="/">Home</Link>
            <Link className="hover:text-light-wood" to="/about">About</Link>
            <Link className="hover:text-light-wood" to="/about">Shop</Link>
            <Link className="hover:text-light-wood" to="/about">Services</Link>
            <Link className="hover:text-light-wood" to="/about">Portfolio</Link>
            <Link className="hover:text-light-wood" to="/about">Contact</Link>
            </ul>
          </nav>
        </div>
        <div className='flex gap-4 md:gap-8'>
          <div>
            <div className='flex cursor-pointer items-center' onClick={toggleUserMenuOpen}>
              <img src="src/assets/images/user.png" alt="" className='h-6' />
              <motion.div
                animate={{ rotate: userMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <img src="src/assets/images/down-arrow.png" alt="" className='h-4' />
              </motion.div>

            </div>
            {
              userMenuOpen && (
                <div className='absolute top-full bg-my-white w-48 shadow-md'>
                  <ul>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                  </ul>
                </div>
              )
            }
          </div>

          <div>
            <img src="src/assets/images/shopping-cart.png" alt="" className='h-6' />
          </div>
          <div>
            <Hamburger isOpen={hamMenuOpen} toggle={toggleHamMenu} />
            <AnimatePresence>
              {hamMenuOpen && (
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '-100%', opacity: 0 }}
                  transition={{ type: 'tween', duration: 0.5 }}
                  className={`absolute top-full left-0 w-full h-screen bg-my-white md:hidden flex items-center justify-center`
                  }>
                  <ul className='flex flex-col text-lg w-full items-center relative -top-16'>
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full text-center py-4' onClick={toggleHamMenu}>
                      <a href="">Home</a>
                    </li>
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full text-center py-4' onClick={toggleHamMenu}>
                      <a href="">About</a>
                    </li>
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full text-center py-4' onClick={toggleHamMenu}>
                      <a href="">Shop</a>
                    </li>
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full text-center py-4' onClick={toggleHamMenu}>
                      <a href="">Services</a>
                    </li>
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full text-center py-4' onClick={toggleHamMenu}>
                      <a href="">Port-Folio</a>
                    </li>
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full text-center py-4' onClick={toggleHamMenu}>
                      <a href="">Contact</a>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className='md:flex hidden'>
          <Button btnText='Get Started' className='bg-light-wood text-my-white rounded-full' />
        </div>
      </div>
    </header>
  )
}

export default Header;