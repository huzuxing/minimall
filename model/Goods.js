'use strict';

var orm     = require('./orm');
module.exports = orm.accountdb.define('goods', {
    id: {
        field: 'id',
        type: orm.Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true,
        unique: true,
        get : function () {
            return this.getDataValue('id');
        },
        set : function (val) {
            this.setDataValue('id', val);
        }
    },
    rmb: {
        field: 'rmb',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get : function () {
            return this.getDataValue('rmb');
        },
        set : function (val) {
            this.setDataValue('rmb', val);
        }
    },
    amount: {
        field: 'amount',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        get : function () {
            return this.getDataValue('amount');
        },
        set : function (val) {
            this.setDataValue('amount', val);
        }
    },
    status: {
        field: 'status',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get : function () {
            return this.getDataValue('status');
        },
        set : function (val) {
            this.setDataValue('status', val);
        }
    },
    createTime: {
        field: 'create_time',
        type: orm.Sequelize.DATE,
        allownNull: false,
        get : function () {
            return this.getDataValue('createTime');
        },
        set : function (val) {
            this.setDataValue('createTime', val);
        }
    },
    cate: {
        field: 'cate',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get : function () {
            return this.getDataValue('cate');
        },
        set : function (val) {
            this.setDataValue('cate', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});