import expresss from "express";
import { adminOrStaff, protect } from "../middleware/authMiddleware.js";
import { assignRequest, createRequest, getAllRequests, getResidentRequests, updateRequestStatus } from './../controllers/maintenanceController.js';
   




const router = expresss.Router();

router.post('/', protect, createRequest);
router.get('/my', protect, getResidentRequests);
router.get('/', protect, adminOrStaff, getAllRequests);
router.put('/assign', protect, adminOrStaff, assignRequest);
router.put('/:requestId/status', protect,adminOrStaff, updateRequestStatus);



export default router;