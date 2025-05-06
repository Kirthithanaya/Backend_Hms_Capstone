import Billing from "../models/Billing.js";

// Generate an invoice for a resident
export const generateInvoice = async (req, res) => {
  try {
    const { resident, roomFee, utilities, services, discount, lateFee, paymentMethod } = req.body;
    const totalAmount = roomFee + utilities + services + lateFee - discount;

    const bill = await Billing.create({
      resident,
      roomFee,
      utilities,
      services,
      discount,
      lateFee,
      totalAmount,
      paymentMethod,
    });

    res.status(201).json({ message: 'Invoice created', bill });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create invoice', error: error.message });
  }
};

// Get all invoices for a resident (admin only)
export const getAllInvoices = async (req, res) => {
  try {
    const bills = await Billing.find({ resident: req.user.id });
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoices', error: error.message });
  }
};

// Get invoices for the logged-in resident
export const getMyInvoices = async (req, res) => {
  try {
    const bills = await Billing.find({ resident: req.user.id });
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoices', error: error.message });
  }
};

// Process payment for a bill (Resident using different payment methods)
export const processPayment = async (req, res) => {
  try {
    const { billId, paymentMethodId, method } = req.body;

    const bill = await Billing.findById(billId);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    if (bill.paid) return res.status(400).json({ message: 'Bill already paid' });

    // Handle payment logic for different methods (e.g., Stripe, PayPal, Cash)
    if (method === 'Stripe') {
      // Direct payment handling for Stripe
      const paymentSuccess = true; // You would add Stripe payment logic here

      if (paymentSuccess) {
        bill.paid = true;
        bill.paymentMethod = 'Stripe';
        bill.paymentIntentId = 'sample-payment-intent-id'; // Replace with actual payment intent ID from Stripe
        await bill.save();
        res.status(200).json({ message: 'Payment successful', bill });
      } else {
        res.status(400).json({ message: 'Stripe payment failed' });
      }
    } else if (method === 'PayPal') {
      // Direct payment handling for PayPal
      const paymentSuccess = true; // You would add PayPal payment logic here

      if (paymentSuccess) {
        bill.paid = true;
        bill.paymentMethod = 'PayPal';
        bill.paymentIntentId = 'sample-paypal-payment-id'; // Replace with actual PayPal payment ID
        await bill.save();
        res.status(200).json({ message: 'Payment successful', bill });
      } else {
        res.status(400).json({ message: 'PayPal payment failed' });
      }
    } else if (method === 'Cash') {
      // Handle cash payments
      bill.paid = true;
      bill.paymentMethod = 'Cash';
      await bill.save();
      res.status(200).json({ message: 'Payment successful', bill });
    } else {
      res.status(400).json({ message: 'Invalid payment method' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};

// Get payment history for a resident
export const getPaymentHistory = async (req, res) => {
  try {
    const paidBills = await Billing.find({ resident: req.user.id, paid: true });
    res.status(200).json(paidBills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payment history', error: error.message });
  }
};

// Delete an invoice (Admin only)
export const deleteInvoice = async (req, res) => {
  try {
    const { billId } = req.params;

    const bill = await Billing.findByIdAndDelete(billId);
    if (!bill) return res.status(404).json({ message: 'Invoice not found' });

    res.status(200).json({ message: 'Invoice deleted', bill });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete invoice', error: error.message });
  }
};
