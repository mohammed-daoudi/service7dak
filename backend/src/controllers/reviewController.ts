import Review from '../models/Review';
import { Request, Response } from 'express';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { service, rating, comment } = req.body;
    const user = (req as any).user?.userId;
    const review = new Review({ service, user, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getReviewsForService = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
