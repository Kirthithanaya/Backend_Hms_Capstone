import mongoose from 'mongoose';

const billingSchema = new mongoose.Schema({
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  roomFee: { type: Number, required: true },
  utilities: { type: Number, default: 0 },
  services: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  lateFee: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  paymentMethod: {
    type: String,
    enum: ["Stripe", "PayPal", "Cash"],
    required: true,
  },
  paymentIntentId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Billing', billingSchema);
