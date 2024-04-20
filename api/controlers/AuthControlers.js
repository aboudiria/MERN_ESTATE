const User = require("../models/UserSchema.js"); // Importing UserSchema model directly
const bcryptjs =require('bcryptjs');

 const Signup = async (req, res) => {

   console.log("req body",req.body)
    const { username, email, password } = req.body;
    const saltrounds=10;
   //  mn wen ijet he pass?he 3m tji mn frontend show me where b thdid plz lma 3m n3bi lform w nwdi
   //  ka an 3m y5d he password undefined fina njrb test lal api backend 3m ycht8l correctly  sure bt3rf ech bdna b req body? bdna ne5d mna form data .. li hiye username w email w password?ee

   // lzm nl2e tari2a te yst3ml _password w nchil pass hl2 3mlt error pass mne zyda wla mtr7 brki b userSchema
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
