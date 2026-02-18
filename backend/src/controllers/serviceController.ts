import Service from '../models/Service';
import { Request, Response } from 'express';

export const createService = async (req: Request, res: Response) => {
  try {
    const { title, description, category, price } = req.body;
    const user = (req as any).user?.userId;
    const service = new Service({ title, description, category, price, user });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find().populate('user', 'username');
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id).populate('user', 'username');
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
