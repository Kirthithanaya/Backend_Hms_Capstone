import express from 'express';
import { deleteInvoice, generateInvoice, getAllInvoices, getMyInvoices, getPaymentHistory, processPayment } from '../controllers/billingController.js';
import {  protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
;



const router = express.Router();

// Generate invoice (admin, staff)
router.post('/generate', protect, authorizeRoles('admin', 'staff'), generateInvoice);

// Get all invoices for the logged-in resident
router.get('/my', protect, getMyInvoices);

// Get all invoices (admin)
router.get('/all', protect, authorizeRoles('admin'), getAllInvoices);

// Process payment (resident)
router.put('/pay', protect, processPayment);

// Get payment history (resident)
router.get('/history', protect, getPaymentHistory);

// Delete an invoice (Admin only)
router.delete('/:billId', protect, authorizeRoles('admin'), deleteInvoice);

export default router;
