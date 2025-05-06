import nodemailer from 'nodemailer';
import twilio from "twilio";
import  User  from "../models/User.js" // Assuming User model exists for fetching user data

// Nodemailer transporter setup for sending email
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can replace this with your email service
  auth: {
    user: process.env.PASS_MAIL, // Set up an email environment variable
    pass: process.env.PASS_KEY, // Set up an email password environment variable
  },
});

// Twilio setup for sending SMS
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Send Email Notification
export const sendEmail = async (email, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.PASS_MAIL,
      to: email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

// Send SMS Notification
export const sendSMS = async (phoneNumber, message) => {
  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER , // Twilio phone number
      to: phoneNumber,
    });
    console.log('SMS sent successfully');
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('SMS sending failed');
  }
};

// Send In-App Notification (Example)
export const sendInAppNotification = async (userId, message) => {
  try {
    // Assuming you have a Notification model to store in-app notifications
    const notification = new Notification({
      userId,
      message,
      type: 'in-app',
      read: false,
    });

    await notification.save();
    console.log('In-app notification saved successfully');
  } catch (error) {
    console.error('Error saving in-app notification:', error);
    throw new Error('In-app notification failed');
  }
};

// Main function to send notifications based on type
export const sendNotification = async (residentId, message, subject, type) => {
  try {
    const user = await User.findById(residentId); // Get user by residentId
    if (!user) {
      throw new Error('User not found');
    }

    if (type === 'email') {
      await sendEmail(user.email, subject, message); // Send email if type is email
    } else if (type === 'sms') {
      await sendSMS(user.phoneNumber, message); // Send SMS if type is SMS
    } else if (type === 'in-app') {
      await sendInAppNotification(user._id, message); // Send in-app notification
    }

    return { status: 'success', message: 'Notification sent successfully' };
  } catch (error) {
    console.error('Error in sending notification:', error);
    throw new Error('Notification sending failed');
  }
};


