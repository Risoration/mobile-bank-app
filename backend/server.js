import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON data
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow only this origin
    credentials: true, // Allow cookies, authorization headers, etc.
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api', authRoutes);

// Connect to database and then start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
