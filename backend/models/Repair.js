const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
  request: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  records: [
    {
      process: { type: String, required: true },
      parts: { type: String },
      photos: [String],
      date: { type: Date, default: Date.now }
    }
  ],
  report: { type: String }
});

module.exports = mongoose.model('Repair', repairSchema);
