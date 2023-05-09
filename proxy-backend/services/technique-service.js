const TechniqueModel = require("../models/technique-model")

class TechniqueService {
    async getAllRecords() {
        const list = await TechniqueModel.findAll();
        return list;
    }

    async createRecord(payload) {
        const data = await TechniqueModel.create(payload);
        return data;
    }

    async updateRecord(payload) {
        let record = await TechniqueModel.findOne({ where: { id: payload.id } });
        record.title = payload?.title || record.title;
        return await record.save();
    }

    async removeRecord(recordId) {
        const record = await TechniqueModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new TechniqueService();