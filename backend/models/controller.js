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

  async findModelYears(make, model) {
    let url =
      `https://api.wheel-size.com/v1/models/${make}/${model}/?user_key=` +
      process.env.WHEEL_FITMENT_KEY;

    let res = await axios.get(url);
    return res.data.years;
  }
}

module.exports = ModelsController;
