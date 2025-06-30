import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  product: { type: String, required: true },
  size: { type: String, required: true },
  type: { type: String, required: true },
  text: { type: String },
  imageUrl: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema); 