const { Router } = require('express');

const CarsTireController = require('./controller');

const carsTireRouter = new Router();
const carsTireController = new CarsTireController();

carsTireRouter.get('/', async (req, res) => {
  try {
    const makes = await carsTireController.find();
    return res.status(200).json(makes);
  } catch (err) {
    if (err === 'not found')
      return res.status(404).send({ err: 'Make not found' });
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = carsTireRouter;
