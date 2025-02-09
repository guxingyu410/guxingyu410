const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['normal', 'faulty', 'under repair'], default: 'normal' },
  history: [
    {
      type: { type: String, enum: ['inspection', 'repair'], required: true },
      recordId: { type: mongoose.Schema.Types.ObjectId, required: true },
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Device', deviceSchema);
