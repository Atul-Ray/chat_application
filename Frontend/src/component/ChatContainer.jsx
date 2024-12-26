import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useAuthStore } from '../store/useAuthStore';

function ChatContainer() {
const {messages , getMessages, isMessageLoading , selectedUser , subscribeToMessage ,unsubscribeFromMessage} = useChatStore();
const {authUser}=useAuthStore()

useEffect(() => { 
  if (selectedUser?._id) {
     getMessages(selectedUser._id); 
     subscribeToMessage()
     return ()=>unsubscribeFromMessage();
    } 
  }, [selectedUser._id, getMessages , subscribeToMessage ,unsubscribeFromMessage]);

//  useEffect(() => {
//    if (selectedUser?._id && messages.length) {
//      console.log('getMessages called'); 
//      console.log(messages); } 
//     }, [selectedUser, messages]);

if(isMessageLoading) return <div>Loading....</div>

  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader/>
   <div className='flex-1 p-4 overflow-y-auto space-y-4'>

{
 messages.map((message)=>(
    <div
    key={message._id}
    className={`chat ${message.senderId === authUser._id?"chat-end":"chat-start"}`}
    >
{
  message.text&&<p>{message.text}</p>
}

{
  message.image&&<img
  src={message.image}
  className='size-28'
  />
  
}
    </div>
  ))
}
   </div>
     <MessageInput/>
      </div>
  )
}

export default ChatContainer