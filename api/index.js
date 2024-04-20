const express=require("express");
const DB=require("./database").connect_DB;

DB();
 
const app = express();
app.use(express.json());
app.listen(300,()=>{
  
     console.log("server is runnig on port 3000");  
})