const express= require("express");
const Signup=require("../controlers/AuthControlers");
const router=express.Router();

router.post("/signup",Signup);
module.exports=router;
