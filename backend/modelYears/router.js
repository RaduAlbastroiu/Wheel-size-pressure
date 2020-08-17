const { Router } = require('express');

const ModelYearsController = require('./controller');
const modelsRouter = require('../models/router');

const modelYearsRouter = new Router();
const modelYearsController = new ModelYearController();

modelYearsRouter.get('/', async (req, res) => {
  try {
    const make = req.query.make;
    const model = req.query.model;
    const years = await modelYearsController.findModelYears(make, model);
    return res.status(200).json(years);
  } catch (err) {
    if (err === 'not found')
      return res.status(404).send({ err: 'Model not found' });
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = modelYearsRouter;
