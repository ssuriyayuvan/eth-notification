// var config = require('./config');
var mongoose = require('mongoose');
require('dotenv').config()
mongoose.Promise = global.Promise;


const connectDb = async () => {
    let host = process.env.host
    let port = process.env.port
    let username = process.env.username
    let password = process.env.password
    let database_name = process.env.database_name

    let connectQuery = `mongodb://${host}:${port}/${database_name}`

    try {
        mongoose.connect(connectQuery, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, res) => {
            if (res) {
                console.log('DB Connected')
            } else {
                console.log('err', err)
            }
        });
    } catch (error) {
        console.log('Db not connected', error)
        throw error
    }
}

module.exports = connectDb;