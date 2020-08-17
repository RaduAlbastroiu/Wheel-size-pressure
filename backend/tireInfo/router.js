const { Router } = require('express');

const TireInfoController = require('./controller');

const tireInfoRouter = new Router();
const tireInfoController = new TireInfoController();

tireInfoRouter.get('/', async (req, res) => {
  try {
    const make = req.query.make;
    const model = req.query.model;
    const year = req.query.year;
    const tireInfo = await tireInfoController.findTireInfo(make, model, year);
    return res.status(200).json(tireInfo);
  } catch (err) {
    if (err === 'not found')
      return res.status(404).send({ err: 'Model not found' });
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = tireInfoRouter;
