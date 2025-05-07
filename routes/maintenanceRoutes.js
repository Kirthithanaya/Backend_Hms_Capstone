import expresss from "express";
import { adminOrStaff, protect } from "../middleware/authMiddleware.js";
import { assignRequest, createRequest, getAllRequests, getResidentRequests, updateRequestStatus } from './../controllers/maintenanceController.js';
   




const router = expresss.Router();

router.post('/create', protect, createRequest);
router.get('/my-requests', protect, getResidentRequests);
router.get('/all', protect, adminOrStaff, getAllRequests);
router.put('/assign', protect, adminOrStaff, assignRequest);
router.put('/status/:requestId', protect,adminOrStaff, updateRequestStatus);



export default router;