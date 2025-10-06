import { Router } from 'express';
import {
  getAccounts,
  removeAccount,
  restoreAccount,
  getHiddenAccounts,
  removeBankConnection,
} from '../controllers/accController.js';

const router = Router();

router.get('/:userId', getAccounts);
router.get('/:userId/hidden', getHiddenAccounts);
router.delete('/:userId', removeAccount);
router.post('/:userId/restore', restoreAccount);
router.delete('/:userId/bank', removeBankConnection);

export default router;
