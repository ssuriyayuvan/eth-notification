const priceSchema = require('../schema/price-config')

const service = () => {
    return {
        async getPrice(req, res) {
            try {
                let key = req.query.key, data;
                (key) ? data = await priceSchema.findOne({ key }).select('value -_id') : data = await priceSchema.find().select('value -_id');
                res.send(data)
            } catch (error) {
                res.send(error.message)
            }
        },

        async updatePrice(req, res) {
            try {
                let reqData = req.body;
                await priceSchema.findOneAndUpdate({ key: req.params.key }, { value: reqData })
                res.send(reqData)
            } catch (error) {
                res.send(error.message)
            }
        },

        async addPrice(req, res) {
            try {
                let reqData = req.body;
                let count = await priceSchema.countDocuments({ key: reqData.key });
                count > 0 ? await priceSchema.deleteMany() : ''
                await new priceSchema(reqData).save()
                res.send(reqData)
            } catch (error) {
                res.send(error.message)
            }
        }
    }
}

module.exports = service();