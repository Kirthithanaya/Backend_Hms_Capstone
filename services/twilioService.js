import twilio from "twilio";
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } =
  process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sendSMS = async (to, message) => {
  await client.messages.create({
    body: message,
    from: TWILIO_PHONE_NUMBER,
    to,
  });
};
