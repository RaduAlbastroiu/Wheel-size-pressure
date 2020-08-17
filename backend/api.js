// create main router
const { Router } = require('express');
const mainRouter = new Router();

// register routes
const makesRoutes = require('./makes/router');
mainRouter.use('/makes', makesRoutes);

const modelsRoutes = require('./models/router');
mainRouter.use('/models', modelsRoutes);

const modelYearsRoutes = require('./models/router');
mainRouter.use('/years', modelYearsRoutes);

module.exports = mainRouter;
