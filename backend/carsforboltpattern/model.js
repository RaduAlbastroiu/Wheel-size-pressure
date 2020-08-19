const mongoose = require('mongoose');

const carsBoltPatternSchema = mongoose.Schema({
  boltpattern: {
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

const carsBoltPatternModel = mongoose.model(
  'carsboltpattern',
  carsBoltPatternSchema
);
module.exports = carsBoltPatternModel;
