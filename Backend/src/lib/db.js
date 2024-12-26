import mongoose from 'mongoose';

export const connectDB = async()=>{
try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected ${con.connection.host}`);
    
} catch (error) {
    console.log("mongoDB connection error :" , error);
    
}

}