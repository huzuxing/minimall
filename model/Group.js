'use strict';

let orm = require('./orm');
module.exports = orm.accountdb.define('cyc_group', {
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
        defaultValue: '',
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
    createTime: {
        field: 'create_time',
        type: orm.Sequelize.DATE,
        allownNull: false,
        defaultValue: Date.now(),
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