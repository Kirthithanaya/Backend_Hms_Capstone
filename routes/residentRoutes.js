import express from "express";
import { createResident, deleteResident, getAllResidents, getResidentById, updateResident } from "../controllers/residentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";





const router = express.Router();

// Admin and Staff can create residents
router.post("/create", protect, authorizeRoles("admin", "staff"), createResident);

// Admin and Staff can view residents
router.get("/get-all", protect, authorizeRoles("admin", "staff"), getAllResidents);

// Only Admin can delete residents
router.delete("/delete/:id", protect, authorizeRoles("admin"), deleteResident);
router.put("/update/:id", protect, authorizeRoles("admin", "staff"),updateResident); 
router.get('/:id', protect, authorizeRoles('admin', 'staff'), getResidentById);

export default router;
