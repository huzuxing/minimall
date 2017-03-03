'use strict';

var orm     = require('./orm');
module.exports = orm.accountdb.define('t_users', {
    id: {
        field: 'userid',
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
    account: {
        field: 'account',
        type: orm.Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        get : function () {
            return this.getDataValue('account');
        },
        set : function (val) {
            this.setDataValue('account', val);
        }
    },
    unionId: {
        field: 'unionid',
        type: orm.Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        get : function () {
            return this.getDataValue('unionId');
        },
        set : function (val) {
            this.setDataValue('unionId', val);
        }
    },
    name: {
        field: 'name',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get : function () {
            return this.getDataValue('name');
        },
        set : function (val) {
            this.setDataValue('name', val);
        }
    },
    sex: {
        field: 'sex',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get : function () {
            return this.getDataValue('sex');
        },
        set : function (val) {
            this.setDataValue('sex', val);
        }
    },
    headImg: {
        field: 'headimg',
        type: orm.Sequelize.STRING,
        defaultValue: 0,
        get : function () {
            return this.getDataValue('headImg');
        },
        set : function (val) {
            this.setDataValue('headImg', val);
        }
    },
    level: {
        field: 'lv',
        type: orm.Sequelize.INTEGER,
        defaultValue: 1,
        get : function () {
            return this.getDataValue('level');
        },
        set : function (val) {
            this.setDataValue('level', val);
        }
    },
    exp: {
        field: 'exp',
        type: orm.Sequelize.INTEGER,
        defaultValue: 0,
        get : function () {
            return this.getDataValue('exp');
        },
        set : function (val) {
            this.setDataValue('exp', val);
        }
    },
    coins: {
        field: 'coins',
        type: orm.Sequelize.INTEGER,
        defaultValue: 0,
        get : function () {
            return this.getDataValue('coins');
        },
        set : function (val) {
            this.setDataValue('coins', val);
        }
    },
    gems: {
        field: 'gems',
        type: orm.Sequelize.INTEGER,
        defaultValue: 0,
        get : function () {
            return this.getDataValue('gems');
        },
        set : function (val) {
            this.setDataValue('gems', val);
        }
    },
    roomId: {
        field: 'roomid',
        type: orm.Sequelize.STRING,
        allowNull: false,
        defaultValue: 0,
        get : function () {
            return this.getDataValue('roomId');
        },
        set : function (val) {
            this.setDataValue('roomId', val);
        }
    },
    history: {
        field: 'history',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get : function () {
            return this.getDataValue('history');
        },
        set : function (val) {
            this.setDataValue('history', val);
        }
    },
    channel: {
        field: 'channel',
        type: orm.Sequelize.STRING,
        allownNull: true,
        defaultValue: null,
        get : function () {
            return this.getDataValue('channel');
        },
        set : function (val) {
            this.setDataValue('channel', val);
        }
    },
    createTime: {
        field: 'create_time',
        type: orm.Sequelize.DATE,
        allownNull: true,
        defaultValue: null,
        get : function () {
            return this.getDataValue('createTime');
        },
        set : function (val) {
            this.setDataValue('createTime', val);
        }
    },
    lastLoginTime: {
        field: 'last_login_time',
        type: orm.Sequelize.DATE,
        allownNull: true,
        defaultValue: null,
        get : function () {
            return this.getDataValue('lastLoginTime');
        },
        set : function (val) {
            this.setDataValue('lastLoginTime', val);
        }
    },
    roomCardUse: {
        field: 'room_card_use',
        type: orm.Sequelize.INTEGER,
        allownNull: true,
        defaultValue: 0,
        get : function () {
            return this.getDataValue('roomCardUse');
        },
        set : function (val) {
            this.setDataValue('roomCardUse', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});