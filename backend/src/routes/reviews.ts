import express from 'express';
import { createReview, getReviewsForService, deleteReview } from '../controllers/reviewController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/service/:serviceId', getReviewsForService);
router.post('/', authenticate, createReview);
router.delete('/:id', authenticate, deleteReview);

export default router;
