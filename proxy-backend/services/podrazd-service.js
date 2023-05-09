const PodrazdModel = require("../models/podrazd-model.js");

class PodrazdService {
  // выводит все записи из продуктов
  async getAllRecords() {
    const list = await PodrazdModel.findAll();
    return list;
  }
  // create a record in Product model
  async createRecord(payload) {
    const data = await PodrazdModel.create(payload);
    return data;
  }
  // update record in Product model
  async updateRecord(payload) {
    let record = await PodrazdModel.findOne({ where: { id: payload.id } });
    record.nameOrg = payload?.nameOrg || record.nameOrg;
    return await record.save();
  }
  // delete record
  async removeRecord(recordId) {
    const record = await PodrazdModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new PodrazdService();
