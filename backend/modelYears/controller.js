const axios = require('axios');

const YearsModel = require('./model');

class ModelYearsController {
  async shouldUpdate(make, model) {
    let years = await YearsModel.findOne({ make: make, model: model });
    if (years) {
      return (
        parseInt(process.env.CACHE_MAKE_TIME, 10) < Date.now() - years.lastSync
      );
    }
    return true;
  }

  async updateData(data, make, model) {
    try {
      let years = data.years;
      let yearsModel = await YearsModel.findOne({ make: make, model: model });

      if (!yearsModel) {
        let newYearsModel = new YearsModel({
          make: make,
          model: model,
          years: years,
          lastSync: Date.now(),
        });
        await newYearsModel.save();
      } else {
        yearsModel.years = years;
        yearsModel.lastSync = Date.now();
        await yearsModel.save();
      }
    } catch (err) {
      console.log({ message: err.message });
    }
  }

  async getApi(make, model) {
    let url =
      `https://api.wheel-size.com/v1/models/${make}/${model}/?user_key=` +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url);
      if (!res.data.years) throw 'not found';

      await this.updateData(res.data, make, model);
      return res.data.years;
    } catch (err) {
      console.log({ message: err.message, url: err.config.url });
      throw 'not found';
    }
  }

  async getDB(make, model) {
    let res = await YearsModel.findOne({ make: make, model: model });
    let years = res.years;
    return years;
  }

  async findModelYears(make, model) {
    try {
      let shouldUpdate = await this.shouldUpdate(make, model);
      if (shouldUpdate) {
        return await this.getApi(make, model);
      } else {
        return await this.getDB(make, model);
      }
    } catch (err) {
      console.log(err);
      throw 'not found';
    }
  }
}

module.exports = ModelYearsController;
