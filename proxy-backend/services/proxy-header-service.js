const ProxyHeaderModel = require('../models/proxy-header-model');

class ProxyHeaderService {
    /** получить все записи из таблицы "proxyheaders" */
    async getAllRecords() {
        const list = await ProxyHeaderModel.findAll();
        return list;
    }

    /** получить одну запись по id из таблицы "proxyheaders" */
    async getOneRecord(recordId) {
        const record = await ProxyHeaderModel.findOne({ where: { id: recordId } });
        return record;
    }

    /** создать запись в таблице "proxyheaders" */
    async createRecord(payload) {
        const data = await ProxyHeaderModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "proxyheaders" */
    async updateRecord(payload) {
        let record = await ProxyHeaderModel.findOne({ where: { id: payload.id } });
        record.number = payload?.number || record?.number;
        record.dischargeDate = payload?.dischargeDate || record?.dischargeDate;
        record.endDate = payload?.endDate || record?.endDate;
        record.individualId = payload?.individualId || record?.individualId;
        record.organizationId = payload?.organizationId || record?.organizationId;
        return await record.save();
    }

    /** удалить запись из таблицы "proxyheaders" */
    async removeRecord(recordId) {
        const record = await ProxyHeaderModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new ProxyHeaderService();