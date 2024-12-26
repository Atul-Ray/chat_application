import React from "react";
import { useThemeStore } from "../store/useThemeStore.js";
import {THEME} from '../constants/index.js'

function SettingPage() {
  const { theme, setTheme } = useThemeStore();

  function handleTheme(e){

 setTheme(e.target.value)
  }

  return (
    <div className="flex flex-col w-full h-screen justify-around items-center">
<div>click on themes to change themes</div>
<div className=" border p-4 grid md:grid-cols-8 sm:grid-cols-6 gap-2 rounded-lg w-full overflow-hidden ">
    
   
{
THEME.map((t)=>{
 return  <div className=" rounded-lg"
 data-theme={t}
 >
  <button
  className="p-2"
  value={t}
  onClick={(e)=>handleTheme(e)}
  >{t}</button>
 </div>
})

}

   
    </div>


   <div className={`flex  border max-h-80 rounded-lg justify-center p-8 w-auto ${theme}`}>
     <div >Preview</div>
     <div className="  p-2 max-w-80 rounded-lg">
    <div className="chat chat-start ">
        <div className="chat-bubble">
          It's over Anakin,
          <br />I have the high ground.
        </div>
      </div>
      
      <div className="chat chat-end">
        <div className="chat-bubble">You underestimate my power!</div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default SettingPage;
