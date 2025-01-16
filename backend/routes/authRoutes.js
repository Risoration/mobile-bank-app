import express from 'express';
import cors from 'cors';
import {
    test,
    registerUser,
    loginUser,
    getProfile,
} from '../controllers/authController.js';

const router = express.Router();

router.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
router.options(
    '*',
    cors({ credentials: true, origin: 'http://localhost:5173' })
);

router.get('/', test);
router.get('/profile', getProfile);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
