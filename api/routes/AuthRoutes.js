const express= require("express");
const { Signup, SignIn } = require("../controlers/AuthControlers");
const router=express.Router();

router.post("/signup", Signup);
router.post("/signin", SignIn);
module.exports=router;
