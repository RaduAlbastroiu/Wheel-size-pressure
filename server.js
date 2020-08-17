// setup environment variables
require('dotenv').config();

// load database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO, {
  userNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// spin up server
const app = require('./backend/app');
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
