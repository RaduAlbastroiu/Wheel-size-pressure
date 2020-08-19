const { Router } = require('express');

const BoltPatternController = require('./controller');

const boltPatternRouter = new Router();
const boltPatternController = new BoltPatternController();

boltPatternRouter.get('/', async (req, res) => {
  try {
    const boltPatterns = await boltPatternController.find();
    return res.status(200).json(boltPatterns);
  } catch (err) {
    if (err === 'not found')
      return res.status(404).send({ err: 'Bolt pattern not found' });
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = boltPatternRouter;
