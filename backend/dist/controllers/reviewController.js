"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.getReviewsForService = exports.createReview = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const createReview = async (req, res) => {
    try {
        const { service, rating, comment } = req.body;
        const user = req.user?.userId;
        const review = new Review_1.default({ service, user, rating, comment });
        await review.save();
        res.status(201).json(review);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createReview = createReview;
const getReviewsForService = async (req, res) => {
    try {
        const reviews = await Review_1.default.find({ service: req.params.serviceId }).populate('user', 'username');
        res.json(reviews);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getReviewsForService = getReviewsForService;
const deleteReview = async (req, res) => {
    try {
        const review = await Review_1.default.findByIdAndDelete(req.params.id);
        if (!review)
            return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteReview = deleteReview;
