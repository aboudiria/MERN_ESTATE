const express=require("express");
const DB=require("./database");
 
const AuthControlers=require('./controlers/AuthControlers');

DB();

const app = express();
app.use(express.json());
app.use('/api/auth',AuthControlers);
app.listen(process.env.PORT,()=>{
  
     console.log("server is runnig on port 3000");  
})