const express = require('express');
const Inspection = require('../models/Inspection');
const auth = require('../middleware/auth');

const router = express.Router();

// 创建巡检计划
router.post('/plan', auth(['admin']), async (req, res) => {
  try {
    const { plan, assignedTo } = req.body;
    const inspection = new Inspection({ plan, assignedTo });
    await inspection.save();
    res.status(201).send('Inspection plan created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 修改巡检计划
router.put('/plan/:id', auth(['admin']), async (req, res) => {
  try {
    const { plan, assignedTo } = req.body;
    const inspection = await Inspection.findByIdAndUpdate(req.params.id, { plan, assignedTo }, { new: true });
    if (!inspection) {
      return res.status(404).send('Inspection plan not found');
    }
    res.send('Inspection plan updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 删除巡检计划
router.delete('/plan/:id', auth(['admin']), async (req, res) => {
  try {
    const inspection = await Inspection.findByIdAndDelete(req.params.id);
    if (!inspection) {
      return res.status(404).send('Inspection plan not found');
    }
    res.send('Inspection plan deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 获取巡检计划
router.get('/plans', auth(['admin', 'inspector']), async (req, res) => {
  try {
    const plans = await Inspection.find().populate('assignedTo', 'username');
    res.send(plans);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 记录巡检结果
router.post('/record/:id', auth(['inspector']), async (req, res) => {
  try {
    const { status, issues, photos } = req.body;
    const inspection = await Inspection.findById(req.params.id);
    if (!inspection) {
      return res.status(404).send('Inspection plan not found');
    }
    inspection.records.push({ status, issues, photos });
    await inspection.save();
    res.send('Inspection record added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 生成巡检报告
router.post('/report/:id', auth(['admin']), async (req, res) => {
  try {
    const { report } = req.body;
    const inspection = await Inspection.findById(req.params.id);
    if (!inspection) {
      return res.status(404).send('Inspection plan not found');
    }
    inspection.report = report;
    await inspection.save();
    res.send('Inspection report generated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
