const mongoose = require('mongoose');

const wheelsSchema = mongoose.Schema({
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
  trim: {
    type: String,
    required: true,
  },
  wheels: {
    type: String,
    required: true,
  },
  lastSync: {
    type: Date,
    required: true,
  },
});

const wheelsModel = mongoose.model('wheel', wheelsSchema);
module.exports = wheelsModel;
