const mongoose = require('mongoose');

const makeSchema = mongoose.Schema({
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

const makeModel = mongoose.model('make', makeSchema);
module.exports = makeModel;
