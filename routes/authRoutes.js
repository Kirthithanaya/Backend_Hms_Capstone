import express from 'express';
import { forgotPassword, getAllUsers, login, logout, register, resetPassword } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();


// @route   POST /api/auth/register
// @desc    Register a new user (residents self-register; admin can register staff/admin)
// @access  Public for residents, restricted for staff/admin creation
router.post('/register', register);
// Login route
router.post('/login', login);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword)

router.get('/logout', logout);

// Protected route: only for authenticated users (admin check inside)
router.get('/users', authenticate, getAllUsers);

export default router;
