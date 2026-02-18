"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.getService = exports.getServices = exports.createService = void 0;
const Service_1 = __importDefault(require("../models/Service"));
const createService = async (req, res) => {
    try {
        const { title, description, category, price } = req.body;
        const user = req.user?.userId;
        const service = new Service_1.default({ title, description, category, price, user });
        await service.save();
        res.status(201).json(service);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createService = createService;
const getServices = async (_req, res) => {
    try {
        const services = await Service_1.default.find().populate('user', 'username');
        res.json(services);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getServices = getServices;
const getService = async (req, res) => {
    try {
        const service = await Service_1.default.findById(req.params.id).populate('user', 'username');
        if (!service)
            return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getService = getService;
const updateService = async (req, res) => {
    try {
        const service = await Service_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!service)
            return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateService = updateService;
const deleteService = async (req, res) => {
    try {
        const service = await Service_1.default.findByIdAndDelete(req.params.id);
        if (!service)
            return res.status(404).json({ message: 'Service not found' });
        res.json({ message: 'Service deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteService = deleteService;
