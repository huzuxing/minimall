'use strict';

let orm = require('./orm');
module.exports = orm.accountdb.define('chargeorder', {
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
    payamount: {
        field: 'payamount',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('payamount');
        },
        set: function (val) {
            this.setDataValue('payamount', val);
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
    cate: {
        field: 'cate',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        get: function () {
            return this.getDataValue('cate');
        },
        set: function (val) {
            this.setDataValue('cate', val);
        }
    },
    extorder: {
        field: 'extorder',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('extorder');
        },
        set: function (val) {
            this.setDataValue('extorder', val);
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
    payway: {
        field: 'payway',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('payway');
        },
        set: function (val) {
            this.setDataValue('payway', val);
        }
    },
    amount: {
        field: 'amount',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('amount');
        },
        set: function (val) {
            this.setDataValue('amount', val);
        }
    },
    subject: {
        field: 'subject',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('subject');
        },
        set: function (val) {
            this.setDataValue('subject', val);
        }
    },
    description: {
        field: 'description',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('description');
        },
        set: function (val) {
            this.setDataValue('description', val);
        }
    },
    callbackurl: {
        field: 'callbackurl',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('callbackurl');
        },
        set: function (val) {
            this.setDataValue('callbackurl', val);
        }
    },
    memo: {
        field: 'memo',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('memo');
        },
        set: function (val) {
            this.setDataValue('memo', val);
        }
    },
    channel: {
        field: 'channel',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('channel');
        },
        set: function (val) {
            this.setDataValue('channel', val);
        }
    },
    createTime: {
        field: 'createtime',
        type: orm.Sequelize.DATE,
        allownNull: false,
        get: function () {
            return this.getDataValue('createTime');
        },
        set: function (val) {
            this.setDataValue('createTime', val);
        }
    },
    payTime: {
        field: 'paytime',
        type: orm.Sequelize.DATE,
        allownNull: false,
        get: function () {
            return this.getDataValue('payTime');
        },
        set: function (val) {
            this.setDataValue('payTime', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});