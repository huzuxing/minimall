'use strict';

let orm = require('./orm');

module.exports = orm.accountdb.define('cyc_content', {
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
    channelPath: {
        field: 'channel_path',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('channelPath');
        },
        set: function (val) {
            this.setDataValue('channelPath', val);
        }
    },
    sort: {
        field: 'sort',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('sort');
        },
        set: function (val) {
            this.setDataValue('sort', val);
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
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});