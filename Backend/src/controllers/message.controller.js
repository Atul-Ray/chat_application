import User from "../models/user.model.js";
import Message from '../models/message.model.js'
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId ,io} from "../lib/socket.js";

export const  getUserForSidebar=async(req , res)=>{
try {
    const loggedInUserId= req.user._id;
    const filteredUser=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
    res.status(200).json(filteredUser)
} catch (error) {
    console.error("error in getUserForSidebar" , error.message);
    res.status(500).json({error:"Internal server error"})
    
}

}

export const  getMessage=async(req, res)=>{
    try {
        const {id:userTochat}=req.params;
        const senderId=req.user._id
       const message = await Message.find({
        $or:[
            {
                senderId:senderId,
                receiverId:userTochat
            },
            {
                senderId:userTochat,
                receiverId:senderId
            }
        ]
       })
       res.status(200).json(message)
    } catch (error) {
        
    }
}

export const sendMessage=async(req , res)=>{
    try {
        
        const {text , image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

    let imageUrl;

    if(image){
        const uploadRes=await cloudinary.uploader.upload(image);
        imageUrl=uploadRes.secure_url;

    }

    const newMessage =new Message({
     senderId,
     receiverId,
     text,
     image:imageUrl,
    })

    await newMessage.save();

   const receiverSocketId = getReceiverSocketId(receiverId);

   if(receiverSocketId){
    io.to(receiverSocketId).emit('newMessage' , newMessage);
   }

    res.status(200).json(newMessage)

    } catch (error) {
        console.error("error in send message controller" , error.message);
     res.status(500).json({message:"internal server error"})   
    }
}