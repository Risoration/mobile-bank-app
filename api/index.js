// Vercel serverless function entry point
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../backend/config/db.js';
import userRoutes from '../backend/routes/userRoutes.js';
import authRoutes from '../backend/routes/authRoutes.js';
import budgetRoutes from '../backend/routes/budgetRoutes.js';
import transRoutes from '../backend/routes/transRoutes.js';
import plaidRoutes from '../backend/routes/plaidRoutes.js';
import accRoutes from '../backend/routes/accRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

const app = express();

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

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', authRoutes);
app.use('/api', plaidRoutes);
app.use('/api/accounts', accRoutes);
app.use('/api/users', userRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/transactions', transRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

export default app;
