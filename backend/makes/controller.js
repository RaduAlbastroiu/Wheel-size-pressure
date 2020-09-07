const axios = require('axios');

const MakeModel = require('./model');

class MakeController {
  async shouldUpdate() {
    let maker = await MakeModel.findOne({});
    if (maker) {
      return (
        parseInt(process.env.CACHE_MAKE_TIME, 10) < Date.now() - maker.lastSync
      );
    }
    return process.env.CACHE_MAKE_TIME > 0;
  }

  async updateData(data) {
    data.forEach(async (maker) => {
      try {
        let targetMaker = await MakeModel.findOne({ slug: maker.slug });
        if (!targetMaker) {
          let make = new MakeModel({
            slug: maker.slug,
            name: maker.name,
            name_en: maker.name_en,
            lastSync: Date.now(),
          });
          await make.save();
        } else {
          targetMaker.lastSync = Date.now();
          await targetMaker.save();
        }
      } catch (err) {
        console.log({ message: err.message });
      }
    });
  }

  async getApi() {
    let url =
      'https://api.wheel-size.com/v1/makes/?user_key=' +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url);
      await this.updateData(res.data);
      return res.data;
    } catch (err) {
      console.log({ message: err.message, url: err.config.url });
      throw 'not found';
    }
  }

  async getDB() {
    let res = await MakeModel.find(
      {},
      { _id: 0, slug: 1, name: 1, name_en: 1 }
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

module.exports = MakeController;
