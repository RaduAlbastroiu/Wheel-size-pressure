const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
  years: {
    type: [Number],
    required: true,
  },
  lastSync: {
    type: Date,
    required: true,
  },
});

const modelModel = mongoose.model('model', modelSchema);
module.exports = modelModel;
