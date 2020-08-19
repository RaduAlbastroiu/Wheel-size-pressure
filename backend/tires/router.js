const { Router } = require('express');

const TireController = require('./controller');

const tireRouter = new Router();
const tireController = new TireController();

tireRouter.get('/', async (req, res) => {
  try {
    const tires = await tireController.find();
    return res.status(200).json(tires);
  } catch (err) {
    if (err === 'not found')
      return res.status(404).send({ err: 'Tire not found' });
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = tireRouter;
