const axios = require('axios');

const TireModel = require('./model');

class TireController {
  async shouldUpdate() {
    let tire = await TireModel.findOne({});
    if (tire) {
      return (
        parseInt(process.env.CACHE_TIRE_TIME, 10) < Date.now() - tire.lastSync
      );
    }
    return true;
  }

  async updateData(data) {
    data.forEach(async (tire) => {
      try {
        let targetTire = await TireModel.findOne({ slug: tire.tire });
        if (!targetTire) {
          let tire = new TireModel({
            tire: tire.tire,
            width: tire.width,
            aspect_ratio: tire.aspect_ratio,
            rim_diameter: tire.rim_diameter,
            lastSync: Date.now(),
          });
          await tire.save();
        } else {
          targetTire.lastSync = Date.now();
          await targetTire.save();
        }
      } catch (err) {
        console.log({ message: err.message });
      }
    });
  }

  async getApi() {
    let url =
      'https://api.wheel-size.com/v1/tires/?user_key=' +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url);
      await this.updateData(res.data);
      return res.data;
    } catch (err) {
      console.log({ message: err.message });
      throw 'not found';
    }
  }

  async getDB() {
    let res = await TireModel.find(
      {},
      { _id: 0, tire: 1, width: 1, aspect_ratio: 1, rim_diameter: 1, count: 1 }
    );
    return res;
  }

  async find() {
    try {
      let shouldUpdate = await this.shouldUpdate();
      if (shouldUpdate) {
        return await this.getApi();
      } else {
        return await this.getDB();
      }
    } catch (err) {
      console.log(err);
      throw 'not found';
    }
  }
}

module.exports = TireController;
