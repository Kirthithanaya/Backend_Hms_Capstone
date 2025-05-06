import { transporter } from '../Database/nodemailer.js';
import { stripe } from '../Database/stripe.js';

import path from "path";

import dotenv from 'dotenv';
import { exec } from 'child_process';

import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// Send Email
export const sendEmail = async (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    from: process.env.PASS_MAIL,
    to: email,
    subject: 'Hostel Notification',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
};

// Create Payment Session
export const createPayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100, // in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create payment session', details: err.message });
  }
};


//



dotenv.config();

export const backupDatabase = async (req, res) => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;

    if (!MONGODB_URL) {
      return res.status(500).json({ error: 'MONGO_URI not defined in .env file' });
    }

    // Ensure backups directory exists
    const backupDir = path.join(__dirname, '..', 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const timestamp = Date.now();
    const backupPath = path.join(backupDir, `backup-${timestamp}.gz`);
   

    
    exec(`mongodump --uri="${MONGODB_URL}" --out=${backupPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error during backup:', error);
        return res.status(500).json({ error: 'Backup failed', details: error.message });
      }

      console.log('Backup successful:', backupPath);
      return res.status(200).json({
        message: 'Backup successful',
        path: backupPath
      });
    });
  } catch (err) {
    console.error('Unexpected error during backup:', err);
    res.status(500).json({
      error: 'Unexpected error',
      details: err.message
    });
  }
};
