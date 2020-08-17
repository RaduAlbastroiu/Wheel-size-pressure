const axios = require('axios');

class TireInfoController {
  async findTireInfo(make, model, year) {
    let url =
      `https://api.wheel-size.com/v1/models/${make}/${model}/${year}/?user_key=` +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url);
      if (!res.data.tires || !res.data.rims) throw 'not found';
      return { tires: res.data.tires, rims: res.data.rims };
    } catch (err) {
      console.log({ message: err.message, url: err.config.url });
      throw 'not found';
    }
  }
}

module.exports = TireInfoController;
