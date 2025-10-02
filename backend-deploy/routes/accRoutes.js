import { Router } from 'express';
import { getAccounts } from '../controllers/accController.js';

const router = Router();

router.get('/accounts/:userId', getAccounts);

export default router;
