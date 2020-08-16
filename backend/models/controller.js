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
    if (!res.data) throw 'not found';
    return res.data;
  }

  async findModelYears(make, model) {
    let url =
      `https://api.wheel-size.com/v1/models/${make}/${model}/?user_key=` +
      process.env.WHEEL_FITMENT_KEY;

    let res = await axios.get(url);
    if (!res.data.years) throw 'not found';
    return res.data.years;
  }

  async findTireInfo(make, model, year) {
    let url =
      `https://api.wheel-size.com/v1/models/${make}/${model}/${year}/?user_key=` +
      process.env.WHEEL_FITMENT_KEY;

    let res = await axios.get(url);
    if (!res.data.tires || !res.data.rims) throw 'not found';
    return { tires: res.data.tires, rims: res.data.rims };
  }
}

module.exports = ModelsController;
