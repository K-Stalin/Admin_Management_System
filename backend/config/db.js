import mongoose from "mongoose";


const connectDB = async ()=>{
     try {
         const connect = await mongoose.connect(
           "mongodb+srv://stalinkumanan:mMwiDPh8q73U9zzs@admin.gcspi.mongodb.net/"
         );
         console.log('MongoDB connected Successfuly!')
     } catch (error) {
         console.log(error)
         process.exit(1) //  Terminate the process
     } 
}

export default connectDB;


// stalinkumanan;
// mMwiDPh8q73U9zzs;