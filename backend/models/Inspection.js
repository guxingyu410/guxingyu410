const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  records: [
    {
      status: { type: String, required: true },
      issues: { type: String },
      photos: [String],
      date: { type: Date, default: Date.now }
    }
  ],
  report: { type: String }
});

module.exports = mongoose.model('Inspection', inspectionSchema);
