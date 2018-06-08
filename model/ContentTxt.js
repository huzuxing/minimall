'use strict';

let orm = require('./orm');

module.exports = orm.accountdb.define('cyc_content_txt', {
    id: {
        field: 'content_id',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        get: function () {
            return this.getDataValue('id');
        },
        set: function (val) {
            this.setDataValue('id', val);
        }
    },
    txt: {
        field: 'txt',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('txt');
        },
        set: function (val) {
            this.setDataValue('txt', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});