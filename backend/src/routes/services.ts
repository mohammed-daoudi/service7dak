import express from 'express';
import { createService, getServices, getService, updateService, deleteService } from '../controllers/serviceController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getService);
router.post('/', authenticate, createService);
router.put('/:id', authenticate, updateService);
router.delete('/:id', authenticate, deleteService);

export default router;
