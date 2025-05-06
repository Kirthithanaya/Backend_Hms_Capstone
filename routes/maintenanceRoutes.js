import express from 'express';
import { assignRequest, createRequest,    deleteMaintenanceRequest,    getAllRequests, getMyRequests, updateStatus } from '../controllers/maintenanceController.js';
import { authenticate, protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';



const router = express.Router();

router.post('/create', protect,authenticate,('resident'), createRequest);
router.get('/my-requests', protect, authorizeRoles('resident'), getMyRequests);

router.get('/all', protect, authorizeRoles('admin', 'staff'), getAllRequests);
router.put('/assign/:requestId', protect, authorizeRoles('admin', 'staff'), assignRequest);
router.put('/status/:requestId', protect, authorizeRoles('admin', 'staff'), updateStatus);
// 🔹 Delete request (Admin or Resident who created it)
router.delete("/delete/:id", authenticate, deleteMaintenanceRequest);

export default router;

