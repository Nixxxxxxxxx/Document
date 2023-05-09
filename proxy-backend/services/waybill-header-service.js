const WaybillHeaderModel = require("../models/waybill-header-model");

class WaybillHeaderService {
  /** получить все записи из таблицы "proxyheaders" */
  async getAllRecords() {
    const list = await WaybillHeaderModel.findAll();
    return list;
  }

  /** получить одну запись по id из таблицы "proxyheaders" */
  async getOneRecord(recordId) {
    const record = await WaybillHeaderModel.findOne({
      where: { id: recordId },
    });
    return record;
  }

  /** создать запись в таблице "proxyheaders" */
  async createRecord(payload) {
    const data = await WaybillHeaderModel.create(payload);
    return data;
  }

  async updateRecord(payload) {
    let record = await ProxyHeaderModel.findOne({ where: { id: payload.id } });
    record.number = payload?.number || record?.number;
    record.dischargeDate = payload?.dischargeDate || record?.dischargeDate;
    record.organizationId = payload?.organizationId || record?.organizationId;
    record.podrazdid = payload?.podrazdid || record?.podrazdid;
    // record.mechanicsid = payload?.mechanicsid || record?.mechanicsid;
    // record.technicsid = payload?.mechanicsid || record?.technicsid;
    return await record.save();
  }

  /** удалить запись из таблицы "proxyheaders" */
  async removeRecord(recordId) {
    const record = await WaybillHeaderModel.destroy({
      where: { id: recordId },
    });
    return record;
  }
}

module.exports = new WaybillHeaderService();
