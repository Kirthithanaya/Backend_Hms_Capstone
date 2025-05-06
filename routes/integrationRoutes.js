import express from "express";
import {  backupDatabase, createPayment, sendEmail } from "../controllers/integrationController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";







const router = express.Router();


router.post('/send-email',sendEmail);
router.post('/create-payment', createPayment);
router.get("/backup", verifyToken,authorizeRoles("admin"),backupDatabase);

export default router;