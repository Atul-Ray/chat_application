import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import {toast} from 'react-hot-toast';
import {io} from 'socket.io-client';

const BASE_URL='http://localhost:8000'

export const useAuthStore = create((set,get)=>({
authUser:null,
isSigningUp:false,
isLogging:false,
isUpdatingProfile:false,
isCheckingAuth:true,
onlineUsers :[],
socket:null,

checkAuth:async()=>{
    try {
        const res= await axiosInstance.get("/auth/check");
        
        set({authUser:res.data});
        get().connectSocket();
    } catch (error) {
        set({authUser:null})
        console.log("not atth");
        
    }finally{
        set({isCheckingAuth:false})
    }
}
,
signup:async (data)=>{
set({isSigningUp:true});
try {
    const res = await axiosInstance.post("/auth/signup",data);
    toast.success("Account successfully created");
    set({authUser:res.data});
    get().connectSocket();
} catch (error) {
    toast.error(error.response.data.message)
}finally{
    set({isSigningUp:false})
}

}
,
logout:async()=>{
    try {
        await axiosInstance.post("/auth/logout");
        set({authUser:null});
        toast.success("logged out successfully")
        get().disconnectSocket();
    } catch (error) {
        toast.error("something went wrong")
    }
}
,

login:async(data)=>{
set({isLogging:true});
try {
    const res = await axiosInstance.post("/auth/login" , data);
    set({authUser:res.data});
    toast.success("Logged in successfully")
    get().connectSocket();
} catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred during login"; 
    toast.error(errorMessage);
}finally{
    set({isLogging:false})
}
},
updateProfile:async(data)=>{
try {
    const res = await axiosInstance.put('/auth//update-profile' , data);
set({authUser:res.data})
toast.success('profile pic updated')
} catch (error) {
    toast.error('something went wrong')
}
},
connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}))