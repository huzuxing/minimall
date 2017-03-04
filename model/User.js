'use strict';

let orm = require('./orm');
module.exports = orm.accountdb.define('user', {
    id: {
        field: 'userid',
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
        defaultValue: '',
        get: function () {
            return this.getDataValue('account');
        },
        set: function (val) {
            this.setDataValue('account', val);
        }
    },
    unionId: {
        field: 'unionid',
        type: orm.Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        get: function () {
            return this.getDataValue('unionId');
        },
        set: function (val) {
            this.setDataValue('unionId', val);
        }
    },
    name: {
        field: 'name',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('name');
        },
        set: function (val) {
            this.setDataValue('name', val);
        }
    },
    gender: {
        field: 'gender',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('gender');
        },
        set: function (val) {
            this.setDataValue('gender', val);
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
    job: {
        field: 'job',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('job');
        },
        set: function (val) {
            this.setDataValue('job', val);
        }
    },
    age: {
        field: 'age',
        type: orm.Sequelize.INTEGER,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('age');
        },
        set: function (val) {
            this.setDataValue('age', val);
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
    headImg: {
        field: 'head_img',
        type: orm.Sequelize.STRING,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('headImg');
        },
        set: function (val) {
            this.setDataValue('headImg', val);
        }
    },
    exp: {
        field: 'exp',
        type: orm.Sequelize.STRING,
        defaultValue: '',
        get: function () {
            return this.getDataValue('exp');
        },
        set: function (val) {
            this.setDataValue('exp', val);
        }
    },
    location: {
        field: 'location',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('location');
        },
        set: function (val) {
            this.setDataValue('location', val);
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