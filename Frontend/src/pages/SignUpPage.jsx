import {useState} from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { Mail,  UserRound ,Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import bgr from  '../assets/bgr.jpg'


function SignUpPage() {
  const [formData , setFormData]=useState({
    fullName:"",
    email:"",
    password:"",
  });

  const {signup } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return toast.error("Full name is required");
    }
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }
    if (!formData.password.trim()) {
      return toast.error("Password is required");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must have at least 6 characters");
    }
    return true;
  }
  

  const handleSubmit=(e)=>{
    e.preventDefault()

    const success = validateForm();
    if(success===true){
      signup(formData)
    }
  }

  return (
<div className='max-h-screen relative overflow-hidden '>
<img className='bg-cover rounded-lg -z-10 lg:blur-sm absolute max-sm:hidden '
  src={bgr}
  ></img>
 
    <div className='min-h-screen grid  lg:grid-cols-2 max-[600px]:flex justify-center items-center p-32'>
   
  
<div className='flex flex-col justify-center  items-center p-6 shadow-xl rounded-lg sm:p-12 '>

<div className='w-full max-w-md space-y-8 mb-2'>

<h1 className='text-center mb-2 text-2xl font-bold text-white max-[600px]:text-gray-600'>Create Account</h1>
</div>

{/* {Form} */}
<form className='grid gap-2' onSubmit={handleSubmit}>
<label className="input input-bordered flex items-center gap-2">
  <UserRound/>
  <input type="text" 
  className="grow"
   placeholder="fullName"
   value={formData.fullName}
   onChange={(e)=>setFormData({...formData , fullName:e.target.value})}
    />
</label>
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
    >signup</button>
</form>

<div className='text-center'>
  <p className='text-base-content/60 font-bold text-gray-800 lg:text-white '>
    Already have an account?{""}
    <Link to="/login"
    className='link link-primary'
    >sign in</Link>
  </p>
</div>
</div>



    </div>

    </div>
  )
}

export default SignUpPage