// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './Routes/routes.js';
// import bodyParser from 'body-parser';
import adminRouter from './Routes/adminRoute.js';
import productRouter from './Routes/productRoute.js';


dotenv.config();

// Create Express app
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes for user 
app.use('/api/users', authRouter);
app.use('/api/users', productRouter);

// Routes for admin operations
app.use('/api/admin', adminRouter);

// Connect to MongoDB database
mongoose.connect(process.env.DB)
  .then(() => console.log('DB connected'))
  .catch(error => console.log(error));

const PORT = process.env.PORT || 7000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
