const express = require('express');
const app = express();

// init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
