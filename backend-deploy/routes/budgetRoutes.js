import express from 'express';
import cors from 'cors';
import { Router } from 'express';

import {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from '../controllers/budgetControllers.js';

const router = Router();

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

router.post('/', createBudget);
router.get('/', getBudgets);
router.get('/:id', getBudgetById);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);
export default router;
