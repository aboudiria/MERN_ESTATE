const express= require("express");
const { Signup, SignIn } = require("../controlers/AuthControlers");
const router=express.Router();

router.post("/signin", SignIn);
router.post("/signup", Signup);

module.exports=router;
