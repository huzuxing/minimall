'use strict';


let config = require('../config');

let Sequelize = require('sequelize');
let accountdb = new Sequelize(config.db.db, config.db.user, config.db.pwd, {
    host: config.db.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00'
});
module.exports.accountdb = accountdb;
module.exports.Sequelize = Sequelize;