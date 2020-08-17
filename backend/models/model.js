const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  name_en: {
    type: String,
    required: true,
  },
  lastSync: {
    type: Date,
    required: true,
  },
});

const modelModel = mongoose.model('model', modelSchema);
module.exports = modelModel;
