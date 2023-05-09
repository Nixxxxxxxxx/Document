const WaybillHeaderService = require('../services/waybill-header-service');

class WaybillHeaderController {
    async getAllRecords(req, res) {
        try {
            const list = await WaybillHeaderService.getAllRecords();
            return res
                .status(200)
                .json(list);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async getOneRecord(req, res) {
        try {
            const recordId = req.params.id;
            const record = await WaybillHeaderService.getOneRecord(recordId);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async createRecord(req, res) {
        try {
            const record = await WaybillHeaderService.createRecord(req.body);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async updateRecord(req, res) {
        try {
            const record = await WaybillHeaderService.updateRecord(req.body);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async removeRecord(req, res) {
        try {
            const recordId = req.params.id;
            const record = await WaybillHeaderService.removeRecord(recordId);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }
}

module.exports = new WaybillHeaderController()