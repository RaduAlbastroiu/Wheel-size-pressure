const mongoose = require('mongoose');

const tireSchema = mongoose.Schema({
  tire: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  aspect_ratio: {
    type: Number,
    required: true,
  },
  rim_diameter: {
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

const tireModel = mongoose.model('tire', tireSchema);
module.exports = tireModel;
