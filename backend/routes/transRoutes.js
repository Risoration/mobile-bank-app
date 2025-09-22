import express from 'express';
import cors from 'cors';

import {
  getTransactions,
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

router.get('/:userId', getTransactions);

router.get('/sync/:userId', syncTransactions);

export default router;
