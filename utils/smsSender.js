const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = (to, body) =>
  client.messages.create({
    body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });

module.exports = { sendSMS };
