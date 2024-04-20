const express=require("express");
const DB=require("./database.js").connect_DB;

DB();

const app = express();
app.use(express.json());
app.listen(3000,()=>{
  
     console.log("server is runnig on port 3000");  
})