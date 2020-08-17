const axios = require('axios');

class ModelYearsController {
  async findModelYears(make, model) {
    let url =
      `https://api.wheel-size.com/v1/models/${make}/${model}/?user_key=` +
      process.env.WHEEL_FITMENT_KEY;

    let res = await axios.get(url);
    if (!res.data.years) throw 'not found';
    return res.data.years;
  }
}

module.exports = ModelYearsController;
