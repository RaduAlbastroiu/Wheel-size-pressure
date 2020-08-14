// create main router
const { Router } = require('express');
const mainRouter = new Router();

// register routes
const makesRoutes = require('./makes/router');
mainRouter.use('/makes', makesRoutes);

/*
const tripRoutes = require('./trip/router');
mainRouter.use('/trip', tripRoutes);
*/

/*
var ws_api_client = require('ws-api-client-nodejs');
var defaultClient = ws_api_client.ApiClient.instance;

// Configure API key authorization: user_key
var user_key = defaultClient.authentications['user_key'];
user_key.apiKey = '83ebb5937fa017072d10287025875a00';

var makesApi = new ws_api_client.MakesApi();
var apiInstance = new ws_api_client.ModelsApi();

var opts = {
  countries: 'us,gb,jp', // {String} Show information for local manufacturers from specified countries only. Use `GET /countries/` method to get the full list of countries. (e.g. `us,gb,jp`)
};

var callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log(
      'API called successfully. Returned data: ' + JSON.stringify(data, null, 2)
    );
  }
};
apiInstance.modelsReadYear('bmw', '3-series', '2004', {}, callback);
*/
module.exports = mainRouter;
