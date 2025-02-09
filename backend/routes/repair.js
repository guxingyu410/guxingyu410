const express = require('express');
const Repair = require('../models/Repair');
const auth = require('../middleware/auth');

const router = express.Router();

// 提出维修请求
router.post('/request', auth(['inspector']), async (req, res) => {
  try {
    const { request, assignedTo } = req.body;
    const repair = new Repair({ request, assignedTo });
    await repair.save();
    res.status(201).send('Repair request created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 分配维修任务
router.put('/assign/:id', auth(['admin']), async (req, res) => {
  try {
    const { assignedTo } = req.body;
    const repair = await Repair.findByIdAndUpdate(req.params.id, { assignedTo }, { new: true });
    if (!repair) {
      return res.status(404).send('Repair request not found');
    }
    res.send('Repair task assigned successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 获取维修请求
router.get('/requests', auth(['admin', 'repairer']), async (req, res) => {
  try {
    const requests = await Repair.find().populate('assignedTo', 'username');
    res.send(requests);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 记录维修过程
router.post('/record/:id', auth(['repairer']), async (req, res) => {
  try {
    const { process, parts, photos } = req.body;
    const repair = await Repair.findById(req.params.id);
    if (!repair) {
      return res.status(404).send('Repair request not found');
    }
    repair.records.push({ process, parts, photos });
    await repair.save();
    res.send('Repair record added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 生成维修报告
router.post('/report/:id', auth(['admin']), async (req, res) => {
  try {
    const { report } = req.body;
    const repair = await Repair.findById(req.params.id);
    if (!repair) {
      return res.status(404).send('Repair request not found');
    }
    repair.report = report;
    await repair.save();
    res.send('Repair report generated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
