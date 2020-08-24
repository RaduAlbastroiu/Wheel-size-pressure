const { Router } = require('express');

const WheelsController = require('./controller');

const wheelsRouter = new Router();
const wheelsController = new WheelsController();

wheelsRouter.get('/', async (req, res) => {
  try {
    const make = req.query.make;
    const model = req.query.model;
    const year = req.query.year;
    const trim = req.query.trim;
    const wheels = await wheelsController.findWheels(make, model, year, trim);
    return res.status(200).json(wheels);
  } catch (err) {
    if (err === 'not found')
      return res.status(404).send({ err: 'Wheels not found' });
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = wheelsRouter;
