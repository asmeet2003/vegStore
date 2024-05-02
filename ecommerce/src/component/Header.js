import React, { useState } from 'react'
import logo1 from '../assest/logo1.png'
import { Link } from 'react-router-dom';
import {FaUser} from "react-icons/fa";
import { FaOpencart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-hot-toast'
import { logoutRedux } from "../redux/userSlice";

export const Header = () => {
  const [showMenu,setshowMenu]=useState(false);
  const userData=useSelector((state)=>state.user)
  console.log(userData.email)
  const dispatch =useDispatch()
  const handleShowMenu=()=>{
    setshowMenu(preve=> !preve)
  }
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };
  console.log(process.env.REACT_APP_ADMIN_EMAIL)
  const cartItemNumber = useSelector((state)=>state.product.cartItem)

  return (
    <header className='flexed showdow-md w-full h-16 px-2 md:px-4 z-50' >
        {/* desktop */}
        <div className='flex items-center h-full justify-between'>
        <Link to={""}>
         <div className='h-12'>
            <img src={logo1}className='h-full'/>
         </div>
         </Link>
         <div className='flex items-center gap-10 md:gap-7'>
            <nav className='flex gap-4 md:gap-6 text-base md:text-xl font-medium md:flex  '>
            <Link to={""}>Home</Link>
            <Link to={"menu/662d1f3e00b868199153f748"}>Menu</Link>      
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
            
            
            </nav>
            <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
            <FaOpencart />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center ">
              {cartItemNumber.length}
            </div>
          </Link>
        </div>
            <div className='text-2xl text-slate-600  'onClick={handleShowMenu}>
              <div className='border-2 border-solid border-slate-600 p-1 rounded cursor-pointer '><FaUser /></div>
             { 
             showMenu && (<div className='absolute right-2 bg-white py-3 px-2 shadow drop-shadow-md flex flex-col '>
              {
                userData.email===process.env.REACT_APP_ADMIN_EMAIL &&
             <Link to={"/newproduct"} className='whitespace-nowrap cursor-pointer'>New Product</Link>
              }
            {
              userData.email ?( <p
                className="cursor-pointer text-white px-2 bg-pink-500"
                onClick={handleLogout}
              >
                Logout ({userData.firstName}){" "}
              </p>
            ) :(
              <Link to={"/login"} className='whitespace-nowrap cursor-pointer'>Login </Link>
            )
            } 
            <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/662d1f3e00b868199153f748"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
           </div>)
             }
            
            </div>
         </div>
         </div>
    </header>
  )
}
export default Header;
