// create main router
const { Router } = require('express');
const mainRouter = new Router();

// register routes
const makesRoutes = require('./makes/router');
mainRouter.use('/makes', makesRoutes);

const modelsRoutes = require('./models/router');
mainRouter.use('/models', modelsRoutes);

module.exports = mainRouter;
