const axios = require('axios');

const TrimModel = require('./model');

class TrimController {
  async shouldUpdate(make, model, year) {
    let trim = await TrimModel.findOne({
      make: make,
      model: model,
      year: year,
    });
    if (trim) {
      return (
        parseInt(process.env.CACHE_TRIM_TIME, 10) < Date.now() - trim.lastSync
      );
    }
    return true;
  }

  async updateData(data, make, model, year) {
    try {
      let slug = data.slug;
      let name = data.name;
      let trimModel = await TrimModel.findOne({
        make: make,
        model: model,
        year: year,
        slug: slug,
      });

      if (!trimModel) {
        let newTrimModel = new TrimModel({
          make: make,
          model: model,
          year: year,
          slug: slug,
          name: name,
          lastSync: Date.now(),
        });
        await newTrimModel.save();
      } else {
        trimModel.slug = tires;
        trimModel.name = rims;
        trimModel.lastSync = Date.now();
        await trimModel.save();
      }
    } catch (err) {
      console.log({ message: err.message });
    }
  }

  async getApi(make, model, year) {
    let url =
      'https://api.wheel-size.com/v1/trims/?user_key=' +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url, {
        params: {
          make: make,
          model: model,
          year: year,
        },
      });

      await this.updateData(res.data, make, model, year);
      return { slug: res.data.slug, name: res.data.name };
    } catch (err) {
      console.log({ message: err.message, url: err.config.url });
      throw 'not found';
    }
  }

  async getDB(make, model, year) {
    let res = await Trim.findOne({
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

module.exports = TrimController;
