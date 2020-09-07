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

    return process.env.CACHE_TRIM_TIME > 0;
  }

  async updateData(data, make, model, year) {
    data.forEach(async (trim) => {
      try {
        let targetTrim = await TrimModel.findOne({
          make: make,
          model: model,
          year: year,
          slug: trim.slug,
        });
        if (!targetTrim) {
          let newTrim = new TrimModel({
            make,
            model,
            year,
            slug: trim.slug,
            name: trim.name,
            lastSync: Date.now(),
          });
          await newTrim.save();
        } else {
          targetTrim.slug = trim.slug;
          targetTrim.name = trim.name;
          targetTrim.lastSync = Date.now();
          await targetTrim.save();
        }
      } catch (err) {
        console.log({ message: err.message });
      }
    });
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
      let result = [];
      res.data.forEach((trim) => {
        result.push({ slug: trim.slug, name: trim.name });
      });
      return result;
    } catch (err) {
      console.log({ message: err.message });
      throw 'not found';
    }
  }

  async getDB(make, model, year) {
    let res = await TrimModel.find(
      {
        make: make,
        model: model,
        year: year,
      },
      { _id: 0, slug: 1, name: 1 }
    );

    return res;
  }

  async findTrim(make, model, year) {
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
