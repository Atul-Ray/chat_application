import React from 'react';
import { useChatStore } from '../store/useChatStore';
import  {useAuthStore} from '../store/useAuthStore';
import bgr from '../assets/defaultPic.png'


function ChatHeader() {
const {selectedUser }= useChatStore();
const {onlineUsers}=useAuthStore();

  return (
    <div className=' h-12 bg-base-300  flex justify-between '>
     <div className='flex items-center gap-1'>
      <img src={selectedUser.profilePic || bgr} 
      alt="" 
      className='size-10'
      />
      <div className='font-bold'>{selectedUser.fullName}</div>
     </div>
     <div></div>
    </div>
  )
}

export default ChatHeader