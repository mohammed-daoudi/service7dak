import express from 'express';
import { getUsers, getUser, deleteUser } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getUsers);
router.get('/:id', authenticate, getUser);
router.delete('/:id', authenticate, deleteUser);

export default router;
