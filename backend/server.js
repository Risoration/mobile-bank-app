import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import transRoutes from './routes/transRoutes.js';
import plaidRoutes from './routes/plaidRoutes.js';
import accRoutes from './routes/accRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Load .env file from the backend directory
dotenv.config();

const app = express();

// Connect to database
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    process.exit(1);
  }
};

// Start database connection
startServer();

//app configuration
app.use(express.json()); // Middleware to parse JSON data
// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173', // Development
  'https://risoration.github.io', // GitHub Pages
  'https://risoration.github.io/revolve-bank-app', // GitHub Pages with path
  'https://revolve-bank-app.vercel.app', // Vercel
  'https://revolve-bank-app-git-main-risoration.vercel.app', // Vercel preview
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//app routing.
app.use('/api', authRoutes);
app.use('/api', plaidRoutes);
app.use('/api/accounts', accRoutes);
app.use('/api/users', userRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/transactions', transRoutes);

// Export the app for Vercel serverless functions
export default app;
