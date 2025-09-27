const express = require('express');
const router = express.Router();
const Otp = require('../models/Otp');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Simple transporter that logs emails to console (for dev). Swap to SMTP in prod.
const transporter = nodemailer.createTransport({
  streamTransport: true,
  newline: 'unix',
  buffer: true,
});

function generateOtp(){
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post('/request-otp', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.endsWith('@kiit.ac.in')) return res.status(400).json({ error: 'Only @kiit.ac.in emails allowed' });
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 5*60*1000); // 5 minutes
  try {
    await Otp.create({ email, code, expiresAt });
    const info = await transporter.sendMail({ from: 'no-reply@libtrack.local', to: email, subject: 'Your LibTrack OTP', text: `Your OTP is ${code}` });
    console.log('OTP sent (dev):', info.message.toString());
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, code } = req.body;
  try {
    const otp = await Otp.findOne({ where: { email, code }, order: [['createdAt','DESC']] });
    if (!otp) return res.status(400).json({ error: 'Invalid code' });
    if (otp.expiresAt < new Date()) return res.status(400).json({ error: 'Code expired' });
    // create or find user with student role
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ name: email.split('@')[0], email, role: 'student' });
    }
    // issue JWT
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
