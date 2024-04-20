const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const  connect_DB=async()=>{
 
     try{
        await mongoose.connect(process.env.MB_URI); 
        console.log("MongoDB connected");
        
     } catch (err) {   
         console.log(err);
         process.exit(1);
     }

};
module.exports =  connect_DB ;
