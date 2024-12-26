import { LogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

function Navbar() {

  const {logout }=useAuthStore();
  return (
    <div className='w-full justify-between flex  h-10 p-2'>
     <div className='w-1/2'>
<Link to='/'>logo</Link>
     </div>
    
    <div className='w-1/3'>
    <div className='flex  justify-between pr-4'>
      <Link to='/settings'>setting</Link>
      <Link to='/profile'>profile</Link>
      <button 
      onClick={logout}
      >LogOut</button>
      </div>
    </div>
    
      </div>
  )
}
export default Navbar