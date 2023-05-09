const WaybillBodyModel = require("../models/waybill-body-models");

class WaybillBodyService {
  async getAllHeadersRecords(headerId) {
    const list = await WaybillBodyModel.findAll({
      where: { waybillheaderid: headerId },
    });
    return list;
  }

  async createRecord(payload) {
    const data = await WaybillBodyModel.create(payload);
    return data;
  }

  async updateRecord(payload) {
    let record = await WaybillBodyModel.findOne({ where: { id: payload.id } });
    record.individualid = payload?.individualid || record.individualid;
    record.productid = payload?.productid || record.productid;
    record.waybillheaderid = payload?.waybillheaderid || record.waybillheaderid;
    record.unit = payload?.unit || record.unit;
    record.expdate = payload?.expdate || record.expdate;
    // record.distance = payload?.distance || record.distance;
    record.count = payload?.count || record.count;
    // record.weight = payload?.weight || record.weight;
    // record.counttrips = payload?.counttrips || record.counttrips;
    return await record.save();
  }

  async removeRecord(recordId) {
    const record = await WaybillBodyModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new WaybillBodyService();
