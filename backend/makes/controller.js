class MakeController {
  constructor() {
    var ws_api_client = require('ws-api-client-nodejs');
    var defaultClient = ws_api_client.ApiClient.instance;

    // Configure API key authorization: user_key
    var user_key = defaultClient.authentications['user_key'];
    user_key.apiKey = process.env.WHEEL_FITMENT_KEY;

    this.makesApi = new ws_api_client.MakesApi();
  }

  async find() {
    let result = {};
    var callback = function (error, data, response) {
      if (error) {
        console.error(error);
      } else {
        return JSON.stringify(data, null, 2);
      }
    };

    let plm = await this.makesApi.makesList({}, callback);
    console.log(plm);
  }
}

module.exports = MakeController;
