import { Routes , Route, Navigate } from "react-router-dom"
import Navbar from "./component/Navbar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react";
import {Loader} from 'lucide-react'
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js"




function App() {
const {authUser , checkAuth , isCheckingAuth , onlineUsers} = useAuthStore();
const {theme}=useThemeStore();

console.log(onlineUsers);

useEffect(()=>{
  checkAuth()  ;
  console.log("check auth called");
  
}
  
,[checkAuth])

if(isCheckingAuth && !authUser){
  return (
  <div className="h-screen flex justify-center items-center">
 <Loader className="size-10 animate-spin"/>
  </div>
  )
}

  return (
   <div data-theme={theme}>
    {authUser?<Navbar/>:''}
  

   <Routes>
    <Route path="/" element={authUser?<HomePage/>:<Navigate to='/login'/>}/>
    <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
    <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to='/'/>}/>
    <Route path="/settings" element={<SettingPage/>}/>
    <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
   </Routes>

   <Toaster/>

   </div>
  )      
}

export default App
