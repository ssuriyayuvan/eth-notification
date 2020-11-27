const dotenv = require('dotenv');
const app = require('express')();
dotenv.config();
const db = require('./config/database.config');
const priceConfig = require('./schema/price-config');
var crontab = require('node-crontab');
const axios = require('axios');
const routes = require('./routes/route');
const bodyParser = require('body-parser');
db();
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use('/', (req, res, next) => {
    next()
}, routes)
async function sendMessage() {
    let res = await axios.get('https://api.beldex.io/api/v1/market/last/ETHUSDT');
    let priceData = await priceConfig.findOne({ key: 'ETHUSDT' });
    console.log(res.data)
    let price = res.data.result
    const token = '1243159687:AAEAO_Qk779YEWXkcQ6NPMoAJm1Dw8tQ_tw'
    let data = {
        "chat_id": "@marketlast",
        "text": `ETH-USDT:${price}`,
        "parse_mode": "HTML"
    }
    let lowfirstPrice = priceData.value.lowFirstPrice
    let lowsecondPrice = priceData.value.lowSecondPrice
    let highfirstPrice = priceData.value.highFirstPrice
    let highsecondPrice = priceData.value.lowFirstPrice
    console.log(lowfirstPrice, lowsecondPrice, highfirstPrice, highsecondPrice)
    console.log(lowfirstPrice <= price && lowsecondPrice >= price, highfirstPrice <= price && highsecondPrice >= price, price)
    if (lowfirstPrice <= price && lowsecondPrice >= price) {
        let i = 0;
        while (i < 5) {
            await axios.post(`https://api.telegram.org/bot${token}/sendMessage?`, data)
            i++;
        }
    }
    if (highfirstPrice <= price && highsecondPrice >= price) {
        let i = 0;
        while (i < 5) {
            await axios.post(`https://api.telegram.org/bot${token}/sendMessage?`, data)
            i++;
        }
    }
    // console.log(repsonse)
}
crontab.scheduleJob("1 * * * * *", function () {
    sendMessage()
});

app.listen(4090, () => {
    console.log('connected on 4090')
})