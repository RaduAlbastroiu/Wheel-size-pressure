// create main router
const { Router } = require('express');
const mainRouter = new Router();

// register routes
const makesRoutes = require('./makes/router');
mainRouter.use('/makes', makesRoutes);

const modelsRoutes = require('./models/router');
mainRouter.use('/models', modelsRoutes);

const modelYearsRoutes = require('./modelYears/router');
mainRouter.use('/years', modelYearsRoutes);

const tireInfoRoutes = require('./tireInfo/router');
mainRouter.use('/tireinfo', tireInfoRoutes);

const tireRoutes = require('./tires/router');
mainRouter.use('/tire', tireRoutes);

const carsTireRoutes = require('./carsfortire/router');
mainRouter.use('/carstire', carsTireRoutes);

const boltPatternRoutes = require('./boltpattern/router');
mainRouter.use('/boltpattern', boltPatternRoutes);

const carsBoltPatternRoutes = require('./carsforboltpattern/router');
mainRouter.use('/carsboltpattern', carsBoltPatternRoutes);

module.exports = mainRouter;
