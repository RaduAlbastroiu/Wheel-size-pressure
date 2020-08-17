const mongoose = require('mongoose');

const yearsSchema = mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  years: {
    type: [Number],
    required: true,
  },
  lastSync: {
    type: Date,
    required: true,
  },
});

const yearsModel = mongoose.model('years', yearsSchema);
module.exports = yearsModel;
