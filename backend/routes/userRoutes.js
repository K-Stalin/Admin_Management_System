import express from 'express'
import { createUser, loginUser, logout, userhome } from '../controllers/userControler.js'

const router = express.Router()


router.post("/",createUser)
router.post("/login",loginUser)
router.get("/home/:id",userhome)
router.post('/logout',logout)

export default router;