const axios = require('axios');

const BoltPatternModel = require('./model');

class BoltPatternController {
  async shouldUpdate() {
    let boltPattern = await BoltPatternModel.findOne({});
    if (boltPattern) {
      return (
        parseInt(process.env.CACHE_BOLT_PATTERN, 10) <
        Date.now() - boltPattern.lastSync
      );
    }
    return true;
  }

  async updateData(data) {
    data.forEach(async (boltPattern) => {
      try {
        let targetBoltPattern = await BoltPatternModel.findOne({
          pattern: boltPattern.pattern,
        });
        if (!targetBoltPattern) {
          let foundBoltPattern = new BoltPatternModel({
            pattern: boltPattern.pattern,
            stud: boltPattern.stud,
            pcd: boltPattern.pcd,
            count: boltPattern.count,
            lastSync: Date.now(),
          });
          await foundBoltPattern.save();
        } else {
          targetBoltPattern.lastSync = Date.now();
          await targetBoltPattern.save();
        }
      } catch (err) {
        console.log({ message: err.message });
      }
    });
  }

  async getApi() {
    let url =
      'https://api.wheel-size.com/v1/bolt-patterns/?user_key=' +
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
    let res = await BoltPatternModel.find(
      {},
      { _id: 0, pattern: 1, stud: 1, pcd: 1, count: 1 }
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

module.exports = BoltPatternController;
