import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
         type:String,
         required:true,
         unique:true
    },
    phone:{
         type:Number,
         required:true
    },
    password:{
         type:String,
         required:true
    }
})

userSchema.methods.checkPassword = function (enteredPassword){
      return this.password === enteredPassword
}


const User =  mongoose.model('User', userSchema )

export default User;