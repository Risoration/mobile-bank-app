import express from 'express';
import cors from 'cors';

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

router.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

router.post('/', createUser);

router.get('/', getUsers);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
