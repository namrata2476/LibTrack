const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Log = require('../models/Log');

// View approved students/requests
router.get('/approved', async (req, res) => {
  try {
    const approved = await Request.findAll({ where: { status: 'approved' } });
    res.json(approved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark entry
router.post('/logs/:id/entry', async (req, res) => {
  const { id } = req.params; // log id
  try {
    const log = await Log.findByPk(id);
    if (!log) return res.status(404).json({ error: 'Log not found' });
    log.entryTime = new Date();
    await log.save();
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark exit
router.post('/logs/:id/exit', async (req, res) => {
  const { id } = req.params; // log id
  try {
    const log = await Log.findByPk(id);
    if (!log) return res.status(404).json({ error: 'Log not found' });
    log.exitTime = new Date();
    await log.save();
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
