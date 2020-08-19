const axios = require('axios');

const TireInfoModel = require('./model');

class TireInfoController {
  async shouldUpdate(make, model, year) {
    let tireInfo = await TireInfoModel.findOne({
      make: make,
      model: model,
      year: year,
    });
    if (tireInfo) {
      return (
        parseInt(process.env.CACHE_TIRE_INFO_TIME, 10) <
        Date.now() - tireInfo.lastSync
      );
    }
    return true;
  }

  async updateData(data, make, model, year) {
    try {
      let tires = JSON.stringify(data.tires);
      let rims = JSON.stringify(data.rims);
      let tireInfoModel = await TireInfoModel.findOne({
        make: make,
        model: model,
        year: year,
      });

      if (!tireInfoModel) {
        let newTireInfoModel = new TireInfoModel({
          make: make,
          model: model,
          year: year,
          tires: tires,
          rims: rims,
          lastSync: Date.now(),
        });
        await newTireInfoModel.save();
      } else {
        tireInfoModel.tires = tires;
        tireInfoModel.rims = rims;
        tireInfoModel.lastSync = Date.now();
        await tireInfoModel.save();
      }
    } catch (err) {
      console.log({ message: err.message });
    }
  }

  async getApi(make, model, year) {
    let url =
      `https://api.wheel-size.com/v1/models/${make}/${model}/${year}/?user_key=` +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url);
      if (!res.data.tires || !res.data.rims) throw 'not found';

      await this.updateData(res.data, make, model, year);
      return { tires: res.data.tires, rims: res.data.rims };
    } catch (err) {
      console.log({ message: err.message, url: err.config.url });
      throw 'not found';
    }
  }

  async getDB(make, model, year) {
    let res = await TireInfoModel.findOne({
      make: make,
      model: model,
      year: year,
    });
    let tires = JSON.parse(res.tires);
    let rims = JSON.parse(res.rims);
    return { tires, rims };
  }

  async findTireInfo(make, model, year) {
    try {
      let shouldUpdate = await this.shouldUpdate(make, model, year);
      if (shouldUpdate) {
        return await this.getApi(make, model, year);
      } else {
        return await this.getDB(make, model, year);
      }
    } catch (err) {
      console.log(err);
      throw 'not found';
    }
  }
}

module.exports = TireInfoController;
