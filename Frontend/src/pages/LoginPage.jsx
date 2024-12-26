import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import {Mail , Lock} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import bgr from '../assets/bgr.jpg'


function LoginPage() {
  const [formData , setFormData]=useState({
  
    email:"",
    password:"",
  });

  const {login } = useAuthStore();

  const validateForm = () => {
   
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }
    if (!formData.password.trim()) {
      return toast.error("Password is required");
    }
   
    return true;
  }
  

  const handleSubmit=(e)=>{
    e.preventDefault()

    const success = validateForm();
    if(success===true){
      login(formData)
    }
  }

  return (
<div className='max-h-screen relative overflow-hidden'>
  <img className='bg-cover rounded-lg -z-10 lg:blur-sm absolute max-sm:hidden'
  src={bgr}
  alt="Background"
  ></img>
    <div className='min-h-screen grid  lg:grid-cols-2 max-[600px]:flex justify-center items-center p-32'>
<div className='flex flex-col justify-center  items-center p-6 shadow-xl rounded-lg sm:p-12 '>
<div className='w-full max-w-md space-y-8 mb-2'>

<h1 className='text-center mb-2 text-2xl font-bold text-white max-[600px]:text-gray-600'>Login</h1>
</div>

{/* {Form} */}
<form className='grid gap-2' onSubmit={handleSubmit}>

<label className="input input-bordered flex items-center gap-2">
  <Mail/>
  <input type="email" 
  className="grow"
   placeholder="email"
   value={formData.email}
   onChange={(e)=>setFormData({...formData , email:e.target.value})}
    />
</label>

<label className="input input-bordered flex items-center gap-2">
  <Lock/>
  <input type="password" 
  className="grow"
   placeholder="password"
   value={formData.password}
   onChange={(e)=>setFormData({...formData , password:e.target.value})}
    />
  
</label>

    
    <button type='submit'
    className='btn btn-neutral'
    >login</button>
</form>


<div className='mt-4 font-bold text-white'>dont have an account
   <Link to='/signup'
   className='link link-primary pl-1'
   >
   signup</Link></div>
</div>

    </div>

    </div>
  )
}

export default LoginPage
