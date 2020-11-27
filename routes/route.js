const express = require('express');
const router = express.Router();
const priceSerive = require('../service/price');

router.get('/price', async (req, res) => {
    try {
        await priceSerive.getPrice(req, res)
    } catch (error) {
        res.send(error.message)
    }
});

router.post('/price', async (req, res) => {
    try {
        await priceSerive.addPrice(req, res)
    } catch (error) {
        res.send(error.message)
    }
})

router.post('/price/:key', async (req, res) => {
    try {
        await priceSerive.updatePrice(req, res)
    } catch (error) {
        res.send(error.message)
    }
})
module.exports = router;