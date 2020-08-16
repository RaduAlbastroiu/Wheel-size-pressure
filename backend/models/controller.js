const axios = require('axios');

class ModelsController {
  async findModels(make) {
    let url =
      'https://api.wheel-size.com/v1/models/?user_key=' +
      process.env.WHEEL_FITMENT_KEY;

    let res = await axios.get(url, {
      params: {
        make: make,
      },
    });
    return res.data;
  }
}

module.exports = ModelsController;
