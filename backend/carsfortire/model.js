const mongoose = require('mongoose');

const carsTireSchema = mongoose.Schema({
  tire: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    required: true,
  },
  lastSync: {
    type: Date,
    required: true,
  },
});

const carsTireModel = mongoose.model('carstire', carsTireSchema);
module.exports = carsTireModel;
