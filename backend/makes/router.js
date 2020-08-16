const { Router } = require('express');

const MakesController = require('./controller');

const makesRouter = new Router();
const makesController = new MakesController();

makesRouter.get('/', async (req, res) => {
  try {
    const makes = await makesController.find();
    return res.status(200).json(makes);
  } catch (err) {
    if (err === 'not found')
      return res.status(404).send({ err: 'Make not found' });
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = makesRouter;
