// Notfound Middleware
const notFound = (req,res,next) =>{
     const error =  new Error(`Not found- ${req.originalUrl}`)
     res.status(400)
     next(error)
}






// Error handling middleware
const errorHandler =  (err,req,res,next) =>{
     let statusCode = res.statusCode == 200 ? 500 : res.statusCode
     let message = err.message;

     res.status(statusCode).json({
        message,
        stack:process.env.NODE_ENV = 'production' ? null : err.stack
     })
}


export { notFound , errorHandler }