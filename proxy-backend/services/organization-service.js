const OrganizationModel = require('../models/organization-model');

class OrganizationService {
    /** получить все записи из таблицы "organizations" */
    async getAllRecords() {
        const list = await OrganizationModel.findAll();
        return list;
    }

    /** создать запись в таблице "organizations" */
    async createRecord(payload) {
        const data = await OrganizationModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "organizations" */
    async updateRecord(payload) {
        let record = await OrganizationModel.findOne({ where: { id: payload.id } });
        record.title = payload?.title || record.title;
        record.inn = payload?.inn || record.inn;
        return await record.save();
    }

    /** удалить запись из таблицы "organizations" */
    async removeRecord(recordId) {
        const record = await OrganizationModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new OrganizationService();