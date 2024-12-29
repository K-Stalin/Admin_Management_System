import Admin from "../models/adminModel.js";
import   asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";


// Createadmin
const createAdmin = asyncHandler(async(req,res,next)=>{
    const {email ,password , name } = req.body
    
    if(!email || !password)
    {
        return next(new Error("Please provide Email , Password"))
    
    } 
    const adminExist = await Admin.findOne({email})
    if(adminExist)
    {  
        res.status(400)
        return next(new Error('Email is already registered Please use different one')) 
    }
   //  create admin
   const admin =  await Admin.create({email,password,name})
   if(admin)
   {
      return res.status(201).json({
           _id:admin._id,
           adminame:admin.name,
           email:admin.email,
           password:admin.password
      })
   }
   else{
     return next(new Error('Admin Created Problem'))
   }
})


// adminLogout
const adminLogout = asyncHandler(async(req,res)=>{
    res.status(201).json({message:"Logged out"})
})

//adminHome

const adminHome = asyncHandler(async (req,res,next)=>{
       const user =  await User.find();
       res.status(201).json(user)
})

// adminLogIn

const adminLogin =  asyncHandler(async(req,res,next)=>{
        const { email ,password } = req.body
        const admin =  await Admin.findOne({email})
        if(admin && admin.checkPassword(password) )
        {
            return res.status(201).json({
                   _id:admin._id,
                   email:admin.email,
                   password:admin.password
            })
        }else
        {
             return  next(new Error('Admin Login Problem'))
        }
})

// addUser
const  addUser =  asyncHandler(async(req,res,next)=>{
         const { username , email ,phone ,password } = req.body;
         // Input Check
         if( !username || !email || !phone || !password)
         {
              return next(new Error('Please provide Username,Email,Phone,Password'))
         }
         // user Exist
         const userExist = await User.findOne({email})
         if(userExist)
         {
             return next(new Error('Email is already registered'))
         }
         // create User
         const  user =  await User.create({username , email ,phone ,password})
         if(user)
         {
             return res.status(201).json({
                 _id:user._id,
                 username:user.username,
                 email:user.email,
                 phone:user.phone,
                 password:user.password
             })
         }
         else{
             return next(new Error('Add user Problem'))
         }

})

// edituser

const edituser = asyncHandler(async(req,res,next)=>{
       const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
       if(updateUser)
       {
          return res.status(201).json(updateUser)
       }else{
          return next(new Error('User update Problem'))
       }
}) 

// delelteuser

const deleteuser = asyncHandler(async(req,res,next)=>{
      const deleteuser = await User.findByIdAndDelete(req.params.id)
      if(deleteuser)
      {
         return res.status(200).json('Delete Successfuly')
      }
      else{
         return next(new Error('Delete user Problem'))
      }
})

export { createAdmin ,adminLogout , adminHome ,adminLogin , addUser,edituser , deleteuser }