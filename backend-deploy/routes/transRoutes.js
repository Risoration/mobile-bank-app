import express from 'express';
import cors from 'cors';

import {
  getUserTransactions,
  syncTransactions,
} from '../controllers/transController.js';

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

router.options(
  '*',
  cors({ credentials: true, origin: 'http://localhost:5173' })
);

router.get('/:userId', getUserTransactions);

router.get('/sync/:userId', syncTransactions);

export default router;
