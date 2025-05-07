 import MaintenanceRequest from "../models/MaintenanceRequest.js"; 

// Submit a new request
export const createRequest = async (req, res) => {
  try {
    const { issueTitle, issueDescription, priority } = req.body;
    const request = new MaintenanceRequest({
      residentId: req.user.id,
      issueTitle,
      issueDescription,
      priority
    });
    await request.save();
    res.status(201).json({ message: 'Request submitted', request });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all requests (for staff/admin)
export const getAllRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find().populate('residentId assignedTo', 'name email');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get requests for a resident
export const getResidentRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find({ residentId: req.user.id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Assign a request to staff
export const assignRequest = async (req, res) => {
  try {
    const { requestId, staffId } = req.body;
    const request = await MaintenanceRequest.findByIdAndUpdate(
      requestId,
      { assignedTo: staffId, status: 'In Progress' },
      { new: true }
    );
    res.json({ message: 'Request assigned', request });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update request status
export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, message } = req.body;

    const request = await MaintenanceRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    request.status = status;
    request.updates.push({ status, message });
    await request.save();

    res.json({ message: 'Status updated', request });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
