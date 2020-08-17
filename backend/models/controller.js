const axios = require('axios');

class ModelsController {
  async findModels(make) {
    let url =
      'https://api.wheel-size.com/v1/models/?user_key=' +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url, {
        params: {
          make: make,
        },
      });
      if (!res.data) throw 'not found';
      return res.data;
    } catch (err) {
      console.log({ message: err.message, url: err.config.url });
      throw 'not found';
    }
  }
}

module.exports = ModelsController;
