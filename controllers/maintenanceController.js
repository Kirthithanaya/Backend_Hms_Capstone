import MaintenanceRequest from "../models/MaintenanceRequest.js";

// 🔹 Resident submits request
export const createRequest = async (req, res) => {
  try {
    const { issue, priority } = req.body;
    const request = new MaintenanceRequest({
      resident: req.user.id,
      issue,
      priority
    });
    await request.save();
    res.status(201).json({ message: 'Request submitted', request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Staff/Admin get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .populate('resident', 'name email')
      .populate('assignedTo', 'name');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Staff/Admin assign request
export const assignRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { adminId } = req.body;

    const request = await MaintenanceRequest.findByIdAndUpdate(
      requestId,
      { assignedTo: adminId, status: 'in progress', updatedAt: new Date() }, // { assignedTo: adminId, status: 'in progress', updatedAt: new Date() },
      { new: true }
    );
    res.json({ message: 'Assigned successfully', request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Staff/Admin update status
export const updateStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const request = await MaintenanceRequest.findByIdAndUpdate(
      requestId,
      { status, updatedAt: new Date() },
      { new: true }
    );
    res.json({ message: 'Status updated', request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Resident sees own requests
export const getMyRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find({ resident: req.user.id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// 🔹 Delete Maintenance Request (Admin or assigned Staff only)
export const deleteMaintenanceRequest = async (req, res) => {
    try {
      const request = await MaintenanceRequest.findById(req.params.id);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      // Optional role-based check:
      if (
        req.user.role !== "admin" &&
        req.user.role !== "staff" &&
        request.resident.toString() !== req.user.id
      ) {
        return res.status(403).json({ message: "Unauthorized" });
      }
  
      await MaintenanceRequest.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: "Maintenance request deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };