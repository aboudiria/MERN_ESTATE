const express=require("express");
const test=require("../controlers/UserControlers.js");
//Creates API Routes to interact between client and server side

const router=express.Router();

router.get('/test',test);
module.exports= router;
