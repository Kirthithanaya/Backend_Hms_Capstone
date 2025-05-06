import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    roomType: {
      type: String,
      enum: ['single', 'double', 'suite'],
      required: true,
    },
    occupancyStatus: {
      type: String,
      enum: ['available', 'occupied'],
      default: 'available',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // reference to the User (Resident) model
      default: null,
    },
    preferences: {
      type: String,
      enum: ['smoking', 'non-smoking', 'disabled', 'quiet'],
    },
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      default: null,
    },
    isOccupied: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);

export default Room;
