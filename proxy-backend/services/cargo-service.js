const CargoModel = require('../models/cargo-model')

class CargoService {
    /** получить все записи из таблицы "products" */
    async getAllRecords() {
        const list = await CargoModel.findAll();
        return list;
    }

    /** создать запись в таблице "products" */
    async createRecord(payload) {
        const data = await CargoModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "products" */
    async updateRecord(payload) {
        let record = await CargoModel.findOne({ where: { id: payload.id } });
        record.title = payload?.title || record.title;
        return await record.save();
    }

    /** удалить запись из таблицы "products" */
    async removeRecord(recordId) {
        const record = await CargoModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new CargoService();