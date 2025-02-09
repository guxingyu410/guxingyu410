const express = require('express');
const Inspection = require('../models/Inspection');
const Repair = require('../models/Repair');
const Device = require('../models/Device');
const auth = require('../middleware/auth');

const router = express.Router();

// 巡检统计
router.get('/inspection', auth(['admin']), async (req, res) => {
  try {
    const inspections = await Inspection.find();
    const completed = inspections.filter(i => i.records.length > 0).length;
    const issues = inspections.reduce((acc, i) => acc + i.records.filter(r => r.issues).length, 0);
    res.send({ total: inspections.length, completed, issues });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 维修统计
router.get('/repair', auth(['admin']), async (req, res) => {
  try {
    const repairs = await Repair.find();
    const completed = repairs.filter(r => r.records.length > 0).length;
    const partsUsed = repairs.reduce((acc, r) => acc + r.records.filter(rec => rec.parts).length, 0);
    res.send({ total: repairs.length, completed, partsUsed });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 设备故障统计
router.get('/device', auth(['admin']), async (req, res) => {
  try {
    const devices = await Device.find();
    const faulty = devices.filter(d => d.status === 'faulty').length;
    res.send({ total: devices.length, faulty });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
