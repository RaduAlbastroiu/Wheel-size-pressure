const { Router } = require('express');

const ModelsController = require('./controller');

const modelsRouter = new Router();
const modelsController = new ModelsController();

modelsRouter.get('/', async (req, res) => {
  try {
    const make = req.query.make;
    const models = await modelsController.findModels(make);
    return res.status(200).json(models);
  } catch (err) {
    if (err === 'not found')
      return res.status(404).send({ err: 'Model not found' });
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = modelsRouter;
