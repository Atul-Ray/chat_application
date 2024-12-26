import React from 'react'
import { useChatStore } from '../store/useChatStore'
import  Sidebar  from '../component/Sidebar.jsx';
import NoChatSelected from '../component/NoChatSelected.jsx';
import ChatContainer from '../component/ChatContainer.jsx';

function HomePage() {
const {selectedUser} = useChatStore();

  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center px-4 pt-20'>
        <div className='bg-base-100 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]'>
<div className='flex h-full rounded-lg overflow-hidden'>
  <Sidebar/>

  {!selectedUser?<NoChatSelected/>:<ChatContainer/>}

</div>
        </div>

      </div>
      

    </div>
  )
}

export default HomePage