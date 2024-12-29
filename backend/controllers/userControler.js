import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler'


// create user
const createUser = asyncHandler(async(req,res,next)=>{
     const { username , email ,phone ,password } = req.body;

     if( !username || !email || !phone || !password)
     {
         res.status(400)
         return next(new Error('Please provide Username ,Email,Phone,Password'))
     }
     const userExists = await User.findOne({email})
     if(userExists)
     {
        res.status(400)
        return next(new Error("Email is already registered ,please use Different email"))
     }
     const user = await User.create({username,email,phone,password})
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
         return next(new Error("User created place Problem"))
     }
})




//login user

const loginUser =  asyncHandler(async(req,res,next)=>{
              const { email , password } = req.body
              const user = await User.findOne({email})

              if(user && user.checkPassword(password))
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
                 return  next(new Error('Login user Error'))
              }
})




//Home
const  userhome =  asyncHandler(async(req,res,next)=>{
        const id  = req.params.id
        const user = await User.findOne({_id:id})
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
             return next(new Error('User Home Error'))
        }
})

// logout

const logout =  asyncHandler(async(req,res)=>{
    res.status(201).json({message:"Logged out"})
})





export { createUser  , loginUser , userhome ,logout }