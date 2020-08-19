const axios = require('axios');

const CarsBoltPatternModel = require('./model');

class CarsBoltPatternController {
  async shouldUpdate(boltPattern) {
    let cars = await CarsBoltPatternModel.findOne({
      boltPattern: boltPattern,
    });
    if (cars) {
      return (
        parseInt(process.env.CACHE_CARS_BOLT_PATTERN_TIME, 10) <
        Date.now() - cars.lastSync
      );
    }
    return true;
  }

  async updateData(data, boltPattern) {
    try {
      let body = JSON.stringify(data);
      let carsBoltPatternModel = await CarsBoltPatternModel.findOne({
        boltpattern: boltPattern,
      });

      if (!carsBoltPatternModel) {
        let newCarsBoltPatternModel = new CarsBoltPatternModel({
          boltpattern: boltPattern,
          body: body,
          lastSync: Date.now(),
        });
        await newCarsBoltPatternModel.save();
      } else {
        carsBoltPatternModel.body = body;
        carsBoltPatternModel.lastSync = Date.now();
        await carsBoltPatternModel.save();
      }
    } catch (err) {
      console.log({ message: err.message });
    }
  }

  async getApi(boltPattern) {
    let url =
      `https://api.wheel-size.com/v1/bolt-patterns/${boltPattern}/?user_key=` +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url);

      await this.updateData(res.data, boltPattern);
      return res.data;
    } catch (err) {
      console.log({ message: err.message, url: err.config.url });
      throw 'not found';
    }
  }

  async getDB(boltPattern) {
    let res = await CarsBoltPatternModel.findOne({
      boltpattern: boltPattern,
    });
    let body = JSON.parse(res.body);
    return body;
  }

  async findCarsForBoltPattern(boltPattern) {
    try {
      let shouldUpdate = await this.shouldUpdate(boltPattern);
      if (shouldUpdate) {
        return await this.getApi(boltPattern);
      } else {
        return await this.getDB(boltPattern);
      }
    } catch (err) {
      console.log(err);
      throw 'not found';
    }
  }
}

module.exports = CarsBoltPatternController;
