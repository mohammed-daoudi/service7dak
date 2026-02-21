import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  category: string;
  price: number;
  location: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IService>('Service', ServiceSchema);