import express, { Router } from 'express';
import cors from 'cors';
import {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from '../controllers/budgetControllers.js';

const router = Router();

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173', // Development
  'https://revolve-bank.vercel.app', // Main production frontend domain
  'https://revolve-bank-app.vercel.app', // Alternative Vercel domain
  'https://revolve-bank-app-git-main-risoration.vercel.app', // Vercel preview deployments
  'https://revolve-serverless-function-express.vercel.app', // Separate backend deployment (self-reference)
];

router.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
router.options(
  '*',
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

router.post('/', createBudget);
router.get('/', getBudgets);
router.get('/:id', getBudgetById);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

export default router;
