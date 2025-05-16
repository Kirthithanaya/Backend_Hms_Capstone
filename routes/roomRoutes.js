import  express from "express";
import { assignRoom, checkInResident, checkOutResident, createRoom, deleteRoom, getAllRooms } from "../controllers/roomController.js";


import {  authenticate, protect } from "../middleware/authMiddleware.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";



const router = express.Router();

// Room Routes
router.post("/create-room", authenticate,verifyToken, authorizeRoles("admin"), createRoom);   // Only admin can create room
router.post("/assign-room", authenticate,authorizeRoles("admin", "staff"), assignRoom);  // Admin and staff can assign rooms
router.get("/all", protect, authorizeRoles("admin", "staff", "resident"), getAllRooms);  // Only admin can view all rooms
router.post("/check-in", authenticate,authorizeRoles("admin", "staff"), checkInResident); // Admin and staff can check-in
router.post("/check-out", authenticate, authorizeRoles("admin", "staff"), checkOutResident); // Admin and staff can check-out
router.delete("/delete-room/:roomNumber", authenticate, authorizeRoles("admin"), deleteRoom);  // Only admin can delete rooms

export default router;
Added