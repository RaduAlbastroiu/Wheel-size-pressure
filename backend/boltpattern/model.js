const mongoose = require('mongoose');

const boltPatternSchema = mongoose.Schema({
  pattern: {
    type: String,
    required: true,
  },
  stud: {
    type: Number,
    required: true,
  },
  pcd: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  lastSync: {
    type: Date,
    required: true,
  },
});

const boltPatternModel = mongoose.model('boltPattern', boltPatternSchema);
module.exports = boltPatternModel;
