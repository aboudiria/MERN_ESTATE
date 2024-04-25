const express=require("express");
const DB=require("./database");

const authControlers =require('./controlers/AuthControlers.js');

DB();
 
const app = express();
app.use(express.json());
app.use('/api/auth',authControlers.SignIn);
app.use('/api/auth',authControlers.Signup);
app.use((err,req,res,next)=>{ 
     const statusCode=err.statusCode || 500;
     const message=err.message ||"Internal server error";
     return res.status(statusCode).json({
          success: false,
          statusCode,
          message,
     });
});
app.listen(process.env.PORT,()=>{
  
     console.log("server is running on port 3000");  
})
