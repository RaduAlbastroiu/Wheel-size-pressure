const mongoose = require('mongoose');

const yearsSchema = mongoose.Schema({
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
