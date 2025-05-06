import express from "express";
import { deleteUser, getAllUsers, updateUserRole } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";




const router = express.Router();    



router.get('/', protect, authorizeRoles('admin'), getAllUsers);
router.put('/:id/role', protect, authorizeRoles('admin'), updateUserRole );
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser);


export default router;