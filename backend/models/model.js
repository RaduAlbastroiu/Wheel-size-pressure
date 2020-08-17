const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  models: {
    type: [String],
    required: true,
  },
  lastSync: {
    type: Date,
    required: true,
  },
});

const modelModel = mongoose.model('model', modelSchema);
module.exports = modelModel;
