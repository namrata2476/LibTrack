const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Log = require('../models/Log');

// Approve or reject a request
router.post('/:id/decision', async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body; // 'approved' or 'rejected'
  try {
    const r = await Request.findByPk(id);
    if (!r) return res.status(404).json({ error: 'Request not found' });
    r.status = decision === 'approved' ? 'approved' : 'rejected';
    await r.save();
    // If approved, create a log stub for entry/exit
    if (r.status === 'approved') {
      await Log.create({ studentId: r.studentId });
    }
    res.json(r);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// view logs
router.get('/logs', async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
