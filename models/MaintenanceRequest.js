import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issueTitle: { type: String, required: true },
  issueDescription: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updates: [
    {
      date: { type: Date, default: Date.now },
      status: String,
      message: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const MaintenanceRequest = mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);
export default MaintenanceRequest;
