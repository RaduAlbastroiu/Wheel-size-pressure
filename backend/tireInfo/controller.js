const axios = require('axios');

class TireInfoController {
  async findTireInfo(make, model, year) {
    let url =
      `https://api.wheel-size.com/v1/models/${make}/${model}/${year}/?user_key=` +
      process.env.WHEEL_FITMENT_KEY;

    let res = await axios.get(url);
    if (!res.data.tires || !res.data.rims) throw 'not found';
    return { tires: res.data.tires, rims: res.data.rims };
  }
}

module.exports = TireInfoController;
