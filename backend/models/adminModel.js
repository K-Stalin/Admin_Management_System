import mongoose from "mongoose";


const adminSchema = mongoose.Schema({ 
    email:{
         type:String,
         required:true,
         unique:true
     },
     password:{
         type:String,
         required:true
     }
})


adminSchema.methods.checkPassword = function(enteredpassword){
     return  this.password === enteredpassword;
}

const Admin = mongoose.model('Admin',adminSchema)

export default Admin