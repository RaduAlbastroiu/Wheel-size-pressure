const axios = require('axios');

class MakeController {
  async find() {
    let url =
      'https://api.wheel-size.com/v1/makes/?user_key=' +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.log({ message: err.message, url: err.config.url });
      throw 'not found';
    }
  }
}

module.exports = MakeController;
