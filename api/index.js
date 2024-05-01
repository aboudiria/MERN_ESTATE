const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/UserRoute.js');
const authRouter = require('./routes/AuthRoute.js');
const listingRouter = require('./routes/ListingRoute.js');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();
// const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}!`);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
