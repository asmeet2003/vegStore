import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import {FaRegEye } from 'react-icons/fa'
import {FaRegEyeSlash} from 'react-icons/fa'
import loginSingupImage from "../assest/login-animation.gif"
import {toast} from 'react-hot-toast'
const Signup = () => {
  const [showPassword,setshowPassword]=useState(false);
  const navigate = useNavigate();
  const [showconPassword,setshowconPassword]=useState(false);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmpassword:"",
   });
  const handleShowconPassword=()=>{
    setshowconPassword(preve=>!preve)
  }
  const handleShowPassword=()=>{
    setshowPassword(pre=>!pre)
  }
  const handleOnChange = (e) => {
    const { name, value } = e.target; // Use object destructuring here
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(process.env.REACT_APP_SERVER_DOMAIN)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { firstName, email, confirmpassword, password } = data; // Access properties directly
    if (firstName && email && confirmpassword && password) {
      if (password === confirmpassword) {
        const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}\signup`,{
          method:"post",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(data)
        })
        const dataRes=await fetchData.json()
        console.log(dataRes)
        // alert(dataRes.message);
        toast(dataRes.message)
        if (dataRes.alert) {
          navigate("/login");
        }
        
      } else {
        alert("Password and confirm password do not match");
      }
    } else {
      alert("Please enter required fields");
    }
  };
  
  return (
    <div className='p-3 md:p-4'> 
        <div className='w-full max-w-md shadow-lg m-auto flex items-center flex-col p-2 bg-white rounded-lg mt-3 pt-3'>
            {/* <h1 className=' flex justify-center text-3xl font-bold'>Sign Up</h1> */}
            <div className='w-16 overflow-hidden rounded-full drop-shadow-md  bg-slate-50'>
                <img src={loginSingupImage} className='w-full'/>
            </div>
            <form className='w-full mt-2 flex flex-col 'onSubmit={handleSubmit}>
                <label htmlFor='firstName '>First Name</label>
                <input type={"text"} id='firstName' name='firstName' className='w-full bg-slate-300 px-2 py-1 rounded-md mt-2' value={data.firstName} onChange={handleOnChange}/>
                <label htmlFor='lastName '>Last Name</label>
                <input type={"text"} id='lastName' name='lastName'className='w-full bg-slate-300 px-2 py-1 rounded-md mt-2' value={data.lastName} onChange={handleOnChange}/>
                <label htmlFor='email'>Email</label>
                <input type={'email'} id='email' name='email' className='w-full bg-slate-300 px-2 py-1 rounded-md mt-2'value={data.email} onChange={handleOnChange}/>
                <label htmlFor='email'>Password</label>
                <div className='flex px-2 py-1 bg-slate-300 rounded mt-1 mb-2'>
                <input type={showPassword ?'text':'password'} id='password' name='password' className='w-full bg-slate-300'value={data.password} onChange={handleOnChange}/>
                <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <FaRegEye />:<FaRegEyeSlash />}</span>
                </div>
                <label htmlFor='email'>Conform Password</label>
                <div className='flex px-2 py-1 bg-slate-300 rounded mt-1 mb-2'>
                <input type={showconPassword ?'text':'password'} id='confirmpassword' name='confirmpassword' className='w-full bg-slate-300'value={data.confirmpassword} onChange={handleOnChange}/>
                <span className=' flex text-xl cursor-pointer' onClick={handleShowconPassword}>{showconPassword ? <FaRegEye />:<FaRegEyeSlash />}</span>
                </div>
                <button className='mt-3 mb-3 max-w-[120px] m-auto w-full bg-blue-500 hover:bg-red-500 cursor-pointer rounded-lg shadow-md font-serif font-bold border'>Sign up</button>
            </form>
            <p>Already Register? <Link to={'/login'} className='text-red-800 ' >Login</Link></p>
        </div>
    </div>
  )
}

export default Signup