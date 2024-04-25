const User = require("../models/UserSchema.js");
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const saltrounds = 10;

const Signup = async (req, res, next) => {
    try {
        // Extract data from request body
        const { username, email, password } = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }
         debugger
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(401).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, saltrounds);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({ message: "User created" });
    } catch (error) {
        // Handle errors
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            // Duplicate key error (e.g., email already exists)
            return res.status(400).json({ message: "Email already exists" });
        }
        // Other errors
        console.error("Signup error:", error);
        errorHandler(error, req, res); // Handle error using custom error handler
    }
};




const SignIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));

        // Compare passwords
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(404, 'Email or password is incorrect'));

        // Generate JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        // Send user object without password in the response
        const { password: pass, ...rest } = validUser._doc;
        // Set token in cookie and send user data in response
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ user: rest });

    } catch (err) {
        // Pass errors to the error handling middleware
        next(err);
    }
};

module.exports = {Signup,SignIn};
