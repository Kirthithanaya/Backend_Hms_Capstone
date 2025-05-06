import express from 'express';
import { addRoom, createExpense, createPayment, getExpenses, getMonthlyTrends, getOverviewReport, getPayments } from '../controllers/financialController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/payment', protect, adminOnly, createPayment);
router.get('/payments', protect, adminOnly, getPayments);

router.post('/expense', protect, adminOnly, createExpense);
router.get('/expenses', protect, adminOnly, getExpenses);

router.post('/room', protect, adminOnly, addRoom);

router.get('/overview', protect, adminOnly, getOverviewReport);
router.get('/trends', protect, adminOnly, getMonthlyTrends);

export default router;
