const User = require("../models/UserSchema.js");
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const jwt = require('jsonwebtoken');

const Signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const saltrounds = 10;

    const hashedPassword = bcryptjs.hashSync(password, saltrounds);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json("user created");
    } catch (err) {
        console.log(err);
        next(err);
        if (err.code === 11000 && err.keyPattern && err.keyValue) {
          // Duplicate key error
          return res.status(400).json({ message: "Email already exists" });
      };

    };
};
   
const SignIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(404, 'Email or password is incorrect'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.cookie('access_token', token, { httpOnly: true})
            .status(200)
            .json({ token }); // Send token in the response
    } catch (err) {
        next(err);
        console.log(err);
    }
};

module.exports = { Signup, SignIn };
