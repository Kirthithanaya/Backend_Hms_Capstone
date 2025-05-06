import mongoose from "mongoose";

const financialReportSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  method: { type: String, enum: ["Stripe", "PayPal", "Cash"], required: true },
  amount: { type: Number, required: true },
  totalRevenue: Number,
  totalExpenses: Number,
  netProfit: Number,
  occupancyRate: Number,
  notes: String,
});

const FinancialReport = mongoose.model(
  "FinancialReport",
  financialReportSchema
);
export default FinancialReport;
