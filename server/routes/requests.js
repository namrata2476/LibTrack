const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const User = require('../models/User');

// student creates a request (protected)
router.post('/', async (req, res) => {
  try {
    // lightweight auth: expect Authorization header with Bearer <token>
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Missing token' });
    // token verification is handled at top-level middleware in index.js for real apps
    const { studentId, reason } = req.body;
    const r = await Request.create({ studentId, reason });
    res.json(r);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// list requests (optionally by status)
router.get('/', async (req, res) => {
  const { status } = req.query;
  try {
    const where = {};
    if (status) where.status = status;
    const rs = await Request.findAll({ where });
    res.json(rs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
