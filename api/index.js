const express = require("express");
const DB = require("./database");
const dotenv= require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/UserRoutes');
dotenv.config();
DB();

const app = express();


app.use(express.json());
app.use(cookieParser());


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use((err, req, res, next) => {
     const statusCode = err.statusCode || 500;
     const message = err.message || 'Internal Server Error';
     return res.status(statusCode).json({
       success: false,
       statusCode,
       message,
     });
   });
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 3000`);
});
