const axios = require('axios');

const ModelModel = require('./model');

class ModelsController {
  async shouldUpdate(make) {
    let makerModels = await ModelModel.findOne({ make: make });
    if (makerModels) {
      return (
        parseInt(process.env.CACHE_MAKE_TIME, 10) <
        Date.now() - makerModels.lastSync
      );
    }
    return true;
  }

  async updateData(data, make) {
    try {
      let models = [];
      data.forEach((model) => {
        models.push(JSON.stringify(model));
      });

      let makeModels = await ModelModel.findOne({ make: make });
      if (!makeModels) {
        let newMakeModels = new ModelModel({
          make: make,
          models: models,
          lastSync: Date.now(),
        });
        await newMakeModels.save();
      } else {
        makeModels.lastSync = Date.now();
        makeModels.models = models;
        await makeModels.save();
      }
    } catch (err) {
      console.log({ message: err.message });
    }
  }

  async getApi(make) {
    let url =
      'https://api.wheel-size.com/v1/models/?user_key=' +
      process.env.WHEEL_FITMENT_KEY;

    try {
      let res = await axios.get(url, {
        params: {
          make: make,
        },
      });

      if (!res.data) throw 'not found';

      await this.updateData(res.data, make);
      return res.data;
    } catch (err) {
      console.log({ message: err.message, url: err.config.url });
      throw 'not found';
    }
  }

  async getDB(make) {
    let res = await ModelModel.findOne({ make: make });
    let models = [];
    res.models.forEach((model) => {
      models.push(JSON.parse(model));
    });
    return models;
  }

  async findModels(make) {
    try {
      let shouldUpdate = await this.shouldUpdate(make);
      if (shouldUpdate) {
        return await this.getApi(make);
      } else {
        return await this.getDB(make);
      }
    } catch (err) {
      console.log(err);
      throw 'not found';
    }
  }
}

module.exports = ModelsController;
