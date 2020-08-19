const { Router } = require('express');

const CarsBoltPatternController = require('./controller');

const carsBoltPatternRouter = new Router();
const carsBoltPatternController = new CarsBoltPatternController();

carsBoltPatternRouter.get('/', async (req, res) => {
  try {
    const boltpattern = req.query.boltpattern;
    const cars = await carsBoltPatternController.findCarsForBoltPattern(
      boltpattern
    );
    return res.status(200).json(cars);
  } catch (err) {
    if (err === 'not found')
      return res.status(404).send({ err: 'Bolt pattern not found' });
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = carsBoltPatternRouter;
