const express = require('express');
const path = require('path');

const fileRouter = new express.Router();

fileRouter.use(
  '/',
  express.static(path.join(__dirname, '../build'), {
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// enabling html5 history
fileRouter.get('/*', (req, res) => {
  const indexPath = path.join(__dirname, '../build/index.html');
  res.sendFile(indexPath);
});

module.exports = fileRouter;
