import express from 'express';
import { createCategory, getCategories, deleteCategory } from '../controllers/categoryController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getCategories);
router.post('/', authenticate, createCategory);
router.delete('/:id', authenticate, deleteCategory);

export default router;
