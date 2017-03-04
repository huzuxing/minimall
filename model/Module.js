'use strict';

let orm = require('./orm');

module.exports = orm.accountdb.define('module', {
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
    name: {
        field: 'name',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('name');
        },
        set: function (val) {
            this.setDataValue('name', val);
        }
    },
    key: {
        field: 'key',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('key');
        },
        set: function (val) {
            this.setDataValue('key', val);
        }
    },
    link: {
        field: 'link',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('link');
        },
        set: function (val) {
            this.setDataValue('link', val);
        }
    },
    parentId: {
        field: 'parent_id',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('parentId');
        },
        set: function (val) {
            this.setDataValue('parentId', val);
        }
    },
    isDisplay: {
        field: 'isDisplay',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        get: function () {
            return this.getDataValue('isDisplay');
        },
        set: function (val) {
            this.setDataValue('isDisplay', val);
        }
    },
    order: {
        field: 'order',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        get: function () {
            return this.getDataValue('order');
        },
        set: function (val) {
            this.setDataValue('order', val);
        }
    },
    icon: {
        field: 'icon',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('icon');
        },
        set: function (val) {
            this.setDataValue('icon', val);
        }
    },
    level: {
        field: 'level',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        get: function () {
            return this.getDataValue('level');
        },
        set: function (val) {
            this.setDataValue('level', val);
        }
    },
    createTime: {
        field: 'create_time',
        type: orm.Sequelize.DATE,
        allowNull: false,
        get: function () {
            return this.getDataValue('createTime');
        },
        set: function (val) {
            this.setDataValue('createTime', val);
        }
    },
    updateTime: {
        field: 'update_time',
        type: orm.Sequelize.DATE,
        allowNull: true,
        get: function () {
            return this.getDataValue('updateTime');
        },
        set: function (val) {
            this.setDataValue('updateTime', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timstamps: false
});