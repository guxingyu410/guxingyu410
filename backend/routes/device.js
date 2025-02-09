const express = require('express');
const Device = require('../models/Device');
const auth = require('../middleware/auth');

const router = express.Router();

// 添加设备信息
router.post('/', auth(['admin']), async (req, res) => {
  try {
    const { name, model, location } = req.body;
    const device = new Device({ name, model, location });
    await device.save();
    res.status(201).send('Device added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 获取设备信息
router.get('/', auth(['admin', 'inspector', 'repairer']), async (req, res) => {
  try {
    const devices = await Device.find();
    res.send(devices);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 更新设备状态
router.put('/status/:id', auth(['admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).send('Device not found');
    }
    device.status = status;
    await device.save();
    res.send('Device status updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 获取设备历史记录
router.get('/history/:id', auth(['admin', 'inspector', 'repairer']), async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).send('Device not found');
    }
    res.send(device.history);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
