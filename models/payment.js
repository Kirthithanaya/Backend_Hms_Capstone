import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['Stripe', 'PayPal', 'Cash'], required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', paymentSchema);
