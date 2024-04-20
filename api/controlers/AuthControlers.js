const User = require("../models/UserSchema.js"); // Importing UserSchema model directly
const bcryptjs =require('bcryptjs');

 const Signup = async (req, res) => {

   console.log("req body",req.body)
    const { username, email, password } = req.body;
    const saltrounds=10;
  
    const hashedPassword=bcryptjs.hashSync(req.body.password,saltrounds);
    const newUser = new User({ username, email, password: hashedPassword });
   try{ await newUser.save();
     
    res.status(201).json("user created");
 }catch(err){
    console.log(err);
    next(err);
    
   res.status(500).json(error.message);
 };
}; 
module.exports=Signup;
