import twilio from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

/**
 * Send an SMS using Twilio
 * @param {string} to - Recipient phone number in E.164 format (+1234567890)
 * @param {string} message - The text message to send
 */
export const sendSMS = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: twilioPhone,
      to,
    });
    console.log(`✅ SMS sent successfully to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send SMS:", error.message);
    throw new Error("Failed to send SMS");
  }
};
