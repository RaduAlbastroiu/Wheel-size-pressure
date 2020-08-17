const mongoose = require('mongoose');

const tireInfoSchema = mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  tires: {
    type: String,
    required: true,
  },
  rims: {
    type: String,
    required: true,
  },
  lastSync: {
    type: Date,
    required: true,
  },
});

const tireInfoModel = mongoose.model('tireInfo', tireInfoSchema);
module.exports = tireInfoModel;
