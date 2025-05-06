import express from "express";
import { sendSMS } from "../controllers/smsController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/send", protect, adminOnly, sendSMS);

export default router;
