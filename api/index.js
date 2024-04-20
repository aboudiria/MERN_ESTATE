const express=require("express");
const DB=require("./database");
 
const AuthControlers=require('./controlers/AuthControlers');

DB();

const app = express();
app.use(express.json());
app.use('/api/auth',AuthControlers);
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
  
     console.log("server is runnig on port 3000");  
})