import React, { useState } from 'react'
import { FaUpload } from "react-icons/fa";
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import {toast} from 'react-hot-toast'
const Newproduct = () => {
  const [data,setData]=useState({
    name:"",
    category:"",
    image:"",
    price:"",
    description:"",
  })
  // const handleOnChange=(e)=>{
  //   const [name,value]=e.target
  //   setData((preve)=>{
  //     return {
  //       ...preve
  //       [name]=value
  //     }
  //   })
  // }
  const handleOnChange = (e) => {
    const { name, value } = e.target; // Destructuring e.target
    setData((prev) => ({
      ...prev, // Spread the previous state
      [name]: value // Update the specific field
    }));
  };
  
  const uploadImage= async (e)=>{
     const data=await ImagetoBase64(e.target.files[0])
    // console.log(data)
    setData((preve)=>{
      return{
        ...preve,
        image:data
      }
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(data);
    const {name,image,category,price}=data
    if(name && image &&category &&price){
      const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}uploadProduct`,{
        method: "POST",
        headers : {
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const fetchRes=await fetchData.json()
      console.log(fetchRes);
      toast(fetchRes.message)
      setData(()=>{
        return{
          name:"",
          category:"",
          image:"",
          price:"",
          description:"",
        }
      })
    }
    else{
    toast("enter required fileds")
    }
    }
   
  return (
    <div>
      <div className='p-4'>
      <form className='m-auto w-full max-w-md bg-white my-2 drop-shadow-sm flex flex-col p-3' onSubmit={handleSubmit}>
        <lable htmlFor='name'>Name</lable>
        <input type='{text}' className='bg-slate-100 p-1 my-1' name="name" onChange={handleOnChange} value={data.name}/>
       <label htmlFor='category'>Category</label>
        <select className='bg-slate-100 p-1 my-1' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>Select Category</option>
          <option value={"fruits"}>Fruit</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icecream"}>Icecream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"price"}>Pizza</option>
        </select>
        <label htmlFor='image' >Image
        <div className='h-40 w-full bg-slate-200 cursor-pointer rounded flex items-center justify-center'>
         {
          data.image?<img src={data.image} className='h-full w-full'/>:<span className='text-5xl'><FaUpload /></span>

         }
         
    <input type={'file'} accept='image/*' name='image' id="image" onChange={uploadImage} className='hidden'/>
   </div>
     </label>
    <label htmlFor='price'>Price</label>
 
    <input type={'text'} className='bg-slate-100 p-1 my-1' name='price' onChange={handleOnChange} value={data.price}></input>    
     <label htmlFor='description'>Description</label>
     <textarea rows={3} value={data.description} className='bg-slate-100 p-1 my-1' name='description' onChange={handleOnChange}></textarea>
     <button className='bg-blue-500 font-bold  drop-shadow-xl hover:bg-red-500'>Submit</button>
      </form>
      </div>
    </div>
  )
}

export default Newproduct