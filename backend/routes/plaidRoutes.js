import { Router } from 'express';
import {
  createLinkToken,
  exchangePublicToken,
  getAccounts,
} from '../controllers/plaidController.js';

const router = Router();

router.post('/create_link_token', createLinkToken);
router.post('/exchange_public_token', exchangePublicToken);
router.get('/accounts/:userId', getAccounts);

export default router;
