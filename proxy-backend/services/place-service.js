const PlaceModel = require('../models/place-model')

class PlaceService {
    /** получить все записи из таблицы "products" */
    async getAllRecords() {
        const list = await PlaceModel.findAll();
        return list;
    }

    /** создать запись в таблице "products" */
    async createRecord(payload) {
        const data = await PlaceModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "products" */
    async updateRecord(payload) {
        let record = await PlaceModel.findOne({ where: { id: payload.id } });
        record.title = payload?.title || record.title;
        return await record.save();
    }

    /** удалить запись из таблицы "products" */
    async removeRecord(recordId) {
        const record = await PlaceModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new PlaceService();