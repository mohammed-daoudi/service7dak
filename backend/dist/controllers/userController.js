"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = async (_req, res) => {
    try {
        const users = await User_1.default.find().select('-password');
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id).select('-password');
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getUser = getUser;
const deleteUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteUser = deleteUser;
