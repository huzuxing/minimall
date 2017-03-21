'use strict';

let orm = require('./orm');
module.exports = orm.accountdb.define('admin_user', {
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
    account: {
        field: 'account',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('account');
        },
        set: function (val) {
            this.setDataValue('account', val);
        }
    },
    username: {
        field: 'username',
        type: orm.Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
        get: function () {
            return this.getDataValue('username');
        },
        set: function (val) {
            this.setDataValue('username', val);
        }
    },
    password: {
        field: 'password',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('password');
        },
        set: function (val) {
            this.setDataValue('password', val);
        }
    },
    phone: {
        field: 'phone',
        type: orm.Sequelize.STRING,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('phone');
        },
        set: function (val) {
            this.setDataValue('phone', val);
        }
    },
    email: {
        field: 'email',
        type: orm.Sequelize.STRING,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('email');
        },
        set: function (val) {
            this.setDataValue('email', val);
        }
    },
    isSuper: {
        field: 'is_super',
        type: orm.Sequelize.INTEGER,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('isSuper');
        },
        set: function (val) {
            this.setDataValue('isSuper', val);
        }
    },
    isDisabled: {
        field: 'is_disabled',
        type: orm.Sequelize.INTEGER,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('isDisabled');
        },
        set: function (val) {
            this.setDataValue('isDisabled', val);
        }
    },
    createTime: {
        field: 'create_time',
        type: orm.Sequelize.DATE,
        allownNull: true,
        defaultValue: null,
        get: function () {
            return this.getDataValue('createTime');
        },
        set: function (val) {
            this.setDataValue('createTime', val);
        }
    },
    lastLoginTime: {
        field: 'last_login_time',
        type: orm.Sequelize.DATE,
        allownNull: true,
        defaultValue: null,
        get: function () {
            return this.getDataValue('lastLoginTime');
        },
        set: function (val) {
            this.setDataValue('lastLoginTime', val);
        }
    },
    loginCount: {
        field: 'login_count',
        type: orm.Sequelize.DATE,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('loginCount');
        },
        set: function (val) {
            this.setDataValue('loginCount', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});