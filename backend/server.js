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

// Load environment variables (works in both local and serverless)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './backend/.env' });
} else {
  // In production/serverless, environment variables are already available
  dotenv.config();
}

const app = express();

// Initialize database connection first, then start server
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Database connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

//app configuration
app.use(express.json()); // Middleware to parse JSON data
// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173', // Development
  'https://revolve-bank.vercel.app', // Main production frontend domain
  'https://revolve-bank-app.vercel.app', // Alternative Vercel domain
  'https://revolve-bank-app-git-main-risoration.vercel.app', // Vercel preview deployments
  'https://revolve-serverless-function-express.vercel.app', // Separate backend deployment (self-reference)
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

// Add a health check route for testing
app.get('/api/', (req, res) => {
  res.json({
    message: 'API is working!',
    status: 'success',
    timestamp: new Date().toISOString(),
  });
});

// Export the app for Vercel serverless functions (if needed)
export default app;
