import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { Send ,ImagePlus ,X} from 'lucide-react';

function MessageInput() {
 const [text , setText] = useState("");
 const [imagePrev , setImagePrev] = useState(null);
 const fileInputRef = useRef(null);
 const {sendMessage} = useChatStore();

 const handleImgChange = (e) => { 
  const file = e.target.files[0];
 
   if (file) {
     const reader = new FileReader(); 
     reader.onloadend = () => { 
      setImagePrev(reader.result);
     }; 
     reader.readAsDataURL(file); } };

 const removeImage = (e)=>{
setImagePrev(null);
if (fileInputRef.current) fileInputRef.current.value = "";
 };

 const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!text.trim() && !imagePrev) return;

  try {
    await sendMessage({
      text: text.trim(),
      image: imagePrev,
    });

    // Clear form
    setText("");
    setImagePrev(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};


  return (
    <div className='w-full p-2 rounded bg-base-300'>
          {imagePrev&& (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePrev}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

   <form 
   onSubmit={(e)=>handleSendMessage(e)}
   className='flex items-center gap-2 '
   >
     <div className='w-full p-1 '>
     <input 
         type='text'
         placeholder='Type a message...'
         value={text}
         onInput={(e)=>setText(e.target.value)}
         className='w-full rounded-lg border input input-bordered input-sm  p-1'
         />
        
     </div>
       
       <input
          type='file'
          className='hidden'
          ref={fileInputRef}
          onChange={handleImgChange}
          >
          </input>
            
     <button
    
     onClick={()=>fileInputRef.current?.click()}
     >
       <ImagePlus size={20}/>
     </button>
          
          <button
          type='submit'
          
           >

         <Send size={20}/>
          </button>
   </form>
   </div>
  )
}

export default MessageInput