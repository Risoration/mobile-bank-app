import express from 'express';
import cors from 'cors';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  hasAccessToken,
} from '../controllers/userController.js';

const router = express.Router();

// CORS configuration for production
const allowedOrigins = [
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

router.post('/', createUser);

router.get('/', getUsers);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/hasAccessToken/:id', hasAccessToken);

export default router;
