const axios = require('axios');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


//Method to get the verification code
// The requirement is to get an OTP through SMS, but TWILIO required paid subscription 
// and Two_Factor requires DLT registration, hence the call otp
exports.requestCode = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number is required' });

    if (!/^\d{10,15}$/.test(phone)) {
      return res.status(400).json({ error: 'Phone number must be digits and valid length' });
    }

    const API_KEY = process.env.TWOFACTOR_API_KEY;
    const otpTemplateName = 'SHC'; 
    const sendOtpUrl = `https://2factor.in/API/V1/${API_KEY}/SMS/${phone}/AUTOGEN/${otpTemplateName}`;

    console.log('Requesting OTP for:', phone);
    const response = await axios.get(sendOtpUrl);

    if (response?.data?.Status === 'Success') {
      const sessionId = response.data.Details;
      console.log('OTP sessionId:', sessionId);

      let user = await User.findOne({ phone });
      if (!user) {
        user = new User({ phone, sessionId, isVerified: false });
      } else {
        user.sessionId = sessionId;
        user.isVerified = false;
      }

      await user.save();
      res.json({ status: 'OTP sent' });
    } else {
      console.error('Failed sending OTP:', response.data);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  } catch (error) {
    console.error('requestCode error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//Method to verify the code received on call
exports.verifyCode = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ error: 'Phone and OTP required' });

    const user = await User.findOne({ phone });
    if (!user || !user.sessionId) return res.status(400).json({ error: 'Invalid phone/session' });

    const API_KEY = process.env.TWOFACTOR_API_KEY;
    const verifyOtpUrl = `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${user.sessionId}/${otp}`;
    console.log('Verifying OTP for:', phone);

    const response = await axios.get(verifyOtpUrl);

    if (response?.data?.Status === 'Success' && response.data.Details === 'OTP Matched') {
      user.isVerified = true;
      user.sessionId = null;
      await user.save();

      const token = jwt.sign({ id: user._id, phone }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ verified: true, token });
    } else {
      res.status(401).json({ verified: false, error: 'OTP did not match' });
    }
  } catch (error) {
    console.error('verifyCode error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
