import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart,FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { logoutRedux } from "../redux/userSlice";
import logo1 from '../assest/logo1.png';


export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const cartItemCount = useSelector((state) => state.product.cartItem.length);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu(prev => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
   
  };

  const handleToggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev);
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white shadow-md z-50 relative">
     
      <Link to="/">
        <img src={logo1} alt="Logo" className="h-10" />
      </Link>

      <nav className="hidden md:flex items-center justify-center space-x-6 text-base font-medium">
        <NavLink to="/">Home</NavLink>
        <NavLink to="menu/662d1f3e00b868199153f748">Menu</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/ordertracking">Track Your Product</NavLink>
      </nav>

      {/* User Authentication and Cart */}
      <div className="flex items-center space-x-6">
    
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-xl text-gray-600 hover:text-gray-800" />
          {cartItemCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              {cartItemCount}
            </div>
          )}
        </Link>

        {/* User Icon and Menu */}
        <div className="relative">
          <FaUser className="text-xl text-gray-600 hover:text-gray-800 cursor-pointer" onClick={handleShowMenu} />
          {showMenu && (
            <div className="absolute top-full right-0 w-36 py-2 px-3 bg-white shadow rounded">
              {userData.email && (
                <p className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer" onClick={handleLogout}>
                  Logout ({userData.firstName})
                </p>
              )}
              {!userData.email && (
                <NavLink to="/login" className="text-sm text-gray-600 hover:text-gray-800">Login</NavLink>
              )}
              {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                <NavLink to="/newproduct" className="text-sm text-gray-600 hover:text-gray-800">New Product</NavLink>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Menu Icon */}
        <FaBars className="text-xl text-gray-600 md:hidden cursor-pointer" onClick={handleToggleMobileMenu} />
      </div>

      {/* Mobile Navigation Links */}
      {showMobileMenu && (
        <nav className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col items-center space-y-4 py-4">
            <NavLink to="/" onClick={handleToggleMobileMenu}>Home</NavLink>
            <NavLink to="menu/662d1f3e00b868199153f748" onClick={handleToggleMobileMenu}>Menu</NavLink>
            <NavLink to="/about" onClick={handleToggleMobileMenu}>About</NavLink>
            <NavLink to="/contact" onClick={handleToggleMobileMenu}>Contact</NavLink>
            <NavLink to="/ordertracking" onClick={handleToggleMobileMenu}>Track</NavLink>
          </div>
        </nav>
      )}
    </header>
  );
};

// Custom NavLink component
const NavLink = ({ to, children, onClick }) => (
  <Link to={to} className="relative text-gray-600 hover:text-gray-800" onClick={onClick}>
    <span className="relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-black after:transition-all after:duration-200 after:ease-in-out after:w-0 hover:after:w-full">
      {children}
    </span>
  </Link>
);

export default Header;
