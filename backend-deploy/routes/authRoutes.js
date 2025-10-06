import express from 'express';
import cors from 'cors';
import {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from '../controllers/authController.js';

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://revolve-bank.vercel.app',
      'https://revolve-bank-app.vercel.app',
      'https://revolve-bank-app-git-main-risoration.vercel.app',
      'https://revolve-serverless-function-express.vercel.app',
    ],
  })
);
router.options(
  '*',
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://revolve-bank.vercel.app',
      'https://revolve-bank-app.vercel.app',
      'https://revolve-bank-app-git-main-risoration.vercel.app',
      'https://revolve-serverless-function-express.vercel.app',
    ],
  })
);

router.get('/', test);
router.get('/profile', getProfile);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
