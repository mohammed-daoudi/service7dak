"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existing = await Category_1.default.findOne({ name });
        if (existing)
            return res.status(400).json({ message: 'Category already exists' });
        const category = new Category_1.default({ name });
        await category.save();
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createCategory = createCategory;
const getCategories = async (_req, res) => {
    try {
        const categories = await Category_1.default.find();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getCategories = getCategories;
const deleteCategory = async (req, res) => {
    try {
        const category = await Category_1.default.findByIdAndDelete(req.params.id);
        if (!category)
            return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteCategory = deleteCategory;
