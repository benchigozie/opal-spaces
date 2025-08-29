import { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo.png';
import Button from './Button';
import Hamburger from './Hamburger';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import accountImage from '../assets/images/account.png';
import ordersImage from '../assets/images/orders.png';
import profileImage from '../assets/images/profile.png';
import logoutImage from '../assets/images/logout.png';
import dashboardImage from '../assets/images/dashboard.png';
import shoppingCartIcon from '../assets/images/shopping-cart.png';
import userIcon from '../assets/images/user.png';
import downChevron from '../assets/images/down-arrow.png';

function Header() {

  const { user, logout } = useAuth();
  const { state } = useCart();
  const userMenuRef = useRef(null);
  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  console.log(user);
  //const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  }
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const toggleUserMenuOpen = () => setUserMenuOpen(!userMenuOpen);

  const [hamMenuOpen, setHamMenuOpen] = useState(false);

  const toggleHamMenu = () => setHamMenuOpen(!hamMenuOpen);

  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !(userMenuRef.current as any).contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

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
              <Link className="hover:text-light-wood" to="/shop">Shop</Link>
              <a href="/#services" className="hover:text-light-wood">Services</a>
              <a href="/#projects" className="hover:text-light-wood">Portfolio</a>
              <Link className="hover:text-light-wood" to="/contact">Contact</Link>
            </ul>
          </nav>
        </div>
        <div className='flex gap-4 md:gap-8'>
          <div ref={userMenuRef}>
            <div className='flex cursor-pointer items-center' onClick={toggleUserMenuOpen}>
              <img src={userIcon} alt="" className='h-6' />
              <motion.div
                animate={{ rotate: userMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <img src={downChevron} alt="" className='h-4' />
              </motion.div>

            </div>
            {
              userMenuOpen && (
                <div className='absolute top-full bg-my-white w-48 shadow-md'>
                  <ul className='flex flex-col text-sm py-2'>
                    <Link className="py-2 px-2 hover:bg-light-wood/40 flex gap-3 items-center" to=""><img src={accountImage} alt="" className="w-6" /><span>{user?.firstName ? user.firstName : 'Account'}</span></Link>
                    {user ? <Link className="py-2 px-2 hover:bg-light-wood/40 flex gap-3 items-center" to="/orders"><img src={ordersImage} alt="" className="w-6" /><span>Orders</span></Link> : null}
                    <Link className="py-2 px-2 hover:bg-light-wood/40 flex gap-3 items-center" to=""><img src={profileImage} alt="" className="w-[22px]" /><span>Profile</span></Link>
                    {user?.role === 'ADMIN' && <Link className="py-2 px-2 hover:bg-light-wood/40 flex gap-3 items-center" to="/admin/dashboard"><img src={dashboardImage} alt="" className="w-6" /><span>Admin dashboard</span></Link>}
                    {user ? <button className="py-2 px-2 hover:bg-light-wood/40 flex gap-3 items-center" onClick={handleLogout}><img src={logoutImage} alt="" className="w-5" /><span>Logout</span></button> : <Link className="py-2 px-2 hover:bg-light-wood/40 flex gap-3 items-center" to="/signin"><img src={logoutImage} alt="" className="w-6" /><span>Sign In</span></Link>}

                  </ul>
                </div>
              )
            }
          </div>

          <Link to="/cart" className='relative'>
            {cartItemCount > 0 &&
              <p className='bg-light-wood text-[9px] w-4 h-4 rounded-full flex justify-center items-center text-my-white absolute -right-1 -top-[6px]'>
                <span>
                  {cartItemCount}
                </span>
              </p>
            }
            <img src={shoppingCartIcon} alt="" className='h-6' />
          </Link>
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
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full h-full text-center' onClick={toggleHamMenu}>
                      <Link className="hover:text-light-wood block w-full h-full py-4" to="/">Home</Link>
                    </li>
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full text-center' onClick={toggleHamMenu}>
                      <Link className="hover:text-light-wood block w-full h-full py-4" to="/about">About</Link>
                    </li>
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full text-center' onClick={toggleHamMenu}>
                      <Link className="hover:text-light-wood block w-full h-full py-4" to="/shop">Shop</Link>
                    </li>
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full text-center' onClick={toggleHamMenu}>
                      <a href="/#services" className="hover:text-light-wood block w-full h-full py-4">Services</a>
                    </li>
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full text-center' onClick={toggleHamMenu}>
                      <a href="/#projects" className="hover:text-light-wood block w-full h-full py-4">Portfolio</a>
                    </li>
                    <li className='hover:text-my-brown hover:cursor-pointer hover:bg-gray-200 w-full text-center' onClick={toggleHamMenu}>
                      <Link className="hover:text-light-wood block w-full h-full py-4" to="/contact">Contact</Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className='md:flex hidden'>
          <Link to="/signin"><Button btnText='Get Started' className='bg-light-wood text-my-white rounded-full' /></Link>

        </div>
      </div>
    </header>
  )
}

export default Header;