import express from 'express';
import cors from 'cors';

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  hasAccessToken,
} from '../controllers/userController.js';

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

router.post('/', createUser);

router.get('/', getUsers);

router.get('/:id/has_access_token', hasAccessToken);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
