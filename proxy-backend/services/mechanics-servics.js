const MechanicsModel = require('../models/mechanics-model');

class MechanicsService {
    /** получить все записи из таблицы "individuals" */
    async getAllRecords() {
        const list = await MechanicsModel.findAll();
        return list;
    }

    /** создать запись в таблице "individuals" */
    async createRecord(payload) {
        const data = await MechanicsModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "individuals" */
    async updateRecord(payload) {
        let record = await MechanicsModel.findOne({ where: { id: payload.id } });
        record.firstName = payload?.firstName || record.firstName;
        record.lastName = payload?.lastName || record.lastName;
        record.patronymic = payload?.patronymic || record.patronymic;
        record.issued = payload?.issued || record.issued;
        record.series = payload?.series || record.series;
        record.number = payload?.number || record.number;
        return await record.save();
    }

    /** удалить запись из таблицы "individuals" */
    async removeRecord(recordId) {
        const record = await MechanicsModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new MechanicsService();