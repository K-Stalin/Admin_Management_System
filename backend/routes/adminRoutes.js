import express from 'express'
import {  addUser, adminHome, adminLogin, adminLogout, createAdmin, deleteuser, edituser } from '../controllers/adminControler.js';

const adminRouter = express.Router();


adminRouter.post("/",createAdmin)
adminRouter.post("/logout",adminLogout)
adminRouter.get("/user",adminHome)
adminRouter.post("/login",adminLogin)
adminRouter.post("/adduser",addUser)
adminRouter.put("/edituser/:id",edituser)
adminRouter.delete("/deleteuser/:id",deleteuser)


export default adminRouter;