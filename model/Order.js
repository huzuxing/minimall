'use strict';

let orm = require('./orm');
module.exports = orm.accountdb.define('order', {
    id: {
        field: 'id',
        type: orm.Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true,
        unique: true,
        get: function () {
            return this.getDataValue('id');
        },
        set: function (val) {
            this.setDataValue('id', val);
        }
    },
    total: {
        field: 'total',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('total');
        },
        set: function (val) {
            this.setDataValue('total', val);
        }
    },
    orderNum: {
        field: 'order_num',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('orderNum');
        },
        set: function (val) {
            this.setDataValue('orderNum', val);
        }
    },
    userId: {
        field: 'user_id',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        get: function () {
            return this.getDataValue('userId');
        },
        set: function (val) {
            this.setDataValue('userId', val);
        }
    },
    status: {
        field: 'status',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('status');
        },
        set: function (val) {
            this.setDataValue('status', val);
        }
    },
    callback: {
        field: 'callback',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('callback');
        },
        set: function (val) {
            this.setDataValue('callback', val);
        }
    },
    createTime: {
        field: 'create_time',
        type: orm.Sequelize.DATE,
        allownNull: false,
        get: function () {
            return this.getDataValue('createTime');
        },
        set: function (val) {
            this.setDataValue('createTime', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});