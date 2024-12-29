import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import router from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'


connectDB()
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

// router
app.use("/user", router);
app.use("/admin",adminRouter)
//Middleware
app.use(notFound);
app.use(errorHandler)

app.listen(4000,()=>{
      console.log('http://localhost:4000')
})