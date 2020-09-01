const axios = require('axios');

const WheelsModel = require('./model');

class WheelsController {
  async shouldUpdate(make, model, year, trim) {
    let wheels = await WheelsModel.findOne({
      make,
      model,
      year,
      trim,
    });
    if (wheels) {
      return (
        parseInt(process.env.CACHE_WHEELS_TIME, 10) <
        Date.now() - wheels.lastSync
      );
    }
    return true;
  }

  async updateData(data, make, model, year, trim) {
    try {
      let wheels = JSON.stringify(data[0].wheels);

      let targetWheels = await WheelsModel.findOne({ make, model, year, trim });
      if (!targetWheels) {
        let newWheelsModel = new WheelsModel({
          make,
          model,
          year,
          trim,
          wheels,
          lastSync: Date.now(),
        });
        await newWheelsModel.save();
      } else {
        targetWheels.lastSync = Date.now();
        targetWheels.wheels = wheels;
        await targetWheels.save();
      }
    } catch (err) {
      console.log({ message: err.message });
    }
  }

  async getApi(make, model, year, trim) {
    let url =
      'https://api.wheel-size.com/v1/search/by_model/?user_key=' +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url, {
        params: {
          make,
          model,
          year,
          trim,
        },
      });

      await this.updateData(res.data, make, model, year, trim);
      return res.data[0].wheels;
    } catch (err) {
      console.log({ message: err.message });
      throw 'not found';
    }
  }

  async getDB(make, model, year, trim) {
    let res = await WheelsModel.find(
      {
        make,
        model,
        year,
        trim,
      },
      { _id: 0, wheels: 1 }
    );

    let result = JSON.parse(res[0].wheels);
    return result;
  }

  async findWheels(make, model, year, trim) {
    try {
      let shouldUpdate = await this.shouldUpdate(make, model, year, trim);
      if (shouldUpdate) {
        return await this.getApi(make, model, year, trim);
      } else {
        return await this.getDB(make, model, year, trim);
      }
    } catch (err) {
      console.log(err);
      throw 'not found';
    }
  }
}

module.exports = WheelsController;
