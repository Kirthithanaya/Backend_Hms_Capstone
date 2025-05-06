import Resident from "../models/Resident.js";

// Create a new resident
export const createResident = async (req, res) => {
  try {
    const { name, email, phone, roomNumber, checkInDate } = req.body;

    const existing = await Resident.findOne({ email });
    if (existing) return res.status(400).json({ message: "Resident already exists" });

    const resident = new Resident({ name, email, phone, roomNumber, checkInDate });
    await resident.save();
    res.status(201).json({ message: "Resident created", resident });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all residents
export const getAllResidents = async (req, res) => {
  try {
    const residents = await Resident.find();
    res.status(200).json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a resident
export const deleteResident = async (req, res) => {
  try {
    const resident = await Resident.findByIdAndDelete(req.params.id);
    if (!resident) return res.status(404).json({ message: "Resident not found" });
    res.status(200).json({ message: "Resident deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// ✅ Update a resident
export const updateResident = async (req, res) => {
    try {
      const resident = await Resident.findById(req.params.id);
      if (!resident) return res.status(404).json({ message: "Resident not found" });
  
      const { name, email, phone, roomNumber, checkInDate, checkOutDate } = req.body;
      resident.name = name || resident.name;
      resident.email = email || resident.email;
      resident.phone = phone || resident.phone;
      resident.roomNumber = roomNumber || resident.roomNumber;
      resident.checkInDate = checkInDate || resident.checkInDate;
      resident.checkOutDate = checkOutDate || resident.checkOutDate;
  
      await resident.save();
      res.status(200).json({ message: "Resident updated", resident });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get Resident by ID
export const getResidentById = async (req, res) => {
    try {
      const resident = await Resident.findById(req.params.id);
      if (!resident) return res.status(404).json({ message: 'Resident not found' });
      res.status(200).json(resident);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching resident', error });
    }
  };