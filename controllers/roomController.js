import Room from "../models/Room.js";

// 🔹 Create a Room (Admin only)
export const createRoom = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only admin can create rooms" });
    }

    const { roomNumber, roomType, preferences } = req.body;
    const roomExists = await Room.findOne({ roomNumber });

    if (roomExists) return res.status(400).json({ message: "Room already exists" });

    const newRoom = new Room({
      roomNumber,
      roomType,
      preferences,
    });

    await newRoom.save();
    res.status(201).json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Assign a Room to a Resident (Admin and Staff)
export const assignRoom = async (req, res) => {
  try {
    if (!["admin", "staff"].includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Only admin or staff can assign rooms" });
    }

    const { roomNumber, residentId } = req.body;
    const room = await Room.findOne({ roomNumber });

    if (!room) return res.status(400).json({ message: "Room not found" });
    if (room.occupancyStatus === 'occupied') {
      return res.status(400).json({ message: "Room is already occupied" });
    }

    room.assignedTo = residentId;
    room.occupancyStatus = 'occupied';
    await room.save();

    res.status(200).json({ message: "Room assigned successfully", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all rooms (for admin, staff, resident)
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('assignedTo.residentId', 'name email');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rooms', error });
  }
};


// 🔹 Check In Resident (Admin and Staff)
export const checkInResident = async (req, res) => {
  try {
    if (!["admin", "staff"].includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Only admin or staff can check-in" });
    }

    const { roomNumber, residentId } = req.body;
    const room = await Room.findOne({ roomNumber });

    if (!room) return res.status(400).json({ message: "Room not found" });
    if (room.occupancyStatus === 'occupied') {
      return res.status(400).json({ message: "Room is already occupied" });
    }

    room.assignedTo = residentId;
    room.occupancyStatus = 'occupied';
    await room.save();

    res.status(200).json({ message: "Resident checked in successfully", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Check Out Resident (Admin and Staff)
export const checkOutResident = async (req, res) => {
  try {
    if (!["admin", "staff"].includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Only admin or staff can check-out" });
    }

    const { roomNumber } = req.body;
    const room = await Room.findOne({ roomNumber });

    if (!room) return res.status(400).json({ message: "Room not found" });
    if (room.occupancyStatus === 'available') {
      return res.status(400).json({ message: "Room is already vacant" });
    }

    room.assignedTo = null;
    room.occupancyStatus = 'available';
    await room.save();

    res.status(200).json({ message: "Resident checked out successfully", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Delete Room (Admin only)
export const deleteRoom = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only admin can delete rooms" });
    }

    const { roomNumber } = req.params;
    const room = await Room.findOneAndDelete({ roomNumber });

    if (!room) return res.status(400).json({ message: "Room not found" });

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
