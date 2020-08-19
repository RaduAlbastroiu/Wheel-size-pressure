const axios = require('axios');

const CarsTireModel = require('./model');

class CarsTireController {
  async shouldUpdate(tire) {
    let cars = await CarsTireModel.findOne({
      tire: tire,
    });
    if (cars) {
      return (
        parseInt(process.env.CACHE_CARS_TIRE_TIME, 10) <
        Date.now() - cars.lastSync
      );
    }
    return true;
  }

  async updateData(data, tire) {
    try {
      let body = JSON.stringify(data);
      let carsTireModel = await CarsTireModel.findOne({
        tire: tire,
      });

      if (!carsTireModel) {
        let newCarsTireModel = new CarsTireModel({
          tire: tire,
          body: body,
          lastSync: Date.now(),
        });
        await newCarsTireModel.save();
      } else {
        carsTireModel.body = body;
        carsTireModel.lastSync = Date.now();
        await carsTireModel.save();
      }
    } catch (err) {
      console.log({ message: err.message });
    }
  }

  async getApi(tire) {
    let url =
      `https://api.wheel-size.com/v1/tires/${tire}/?user_key=` +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url);

      await this.updateData(res.data, tire);
      return res.data;
    } catch (err) {
      console.log({ message: err.message, url: err.config.url });
      throw 'not found';
    }
  }

  async getDB(tire) {
    let res = await CarsTireModel.findOne({
      tire: tire,
    });
    let body = JSON.parse(res.body);
    return body;
  }

  async findCarsForTire(tire) {
    try {
      let shouldUpdate = await this.shouldUpdate(tire);
      if (shouldUpdate) {
        return await this.getApi(tire);
      } else {
        return await this.getDB(tire);
      }
    } catch (err) {
      console.log(err);
      throw 'not found';
    }
  }
}

module.exports = CarsTireController;
