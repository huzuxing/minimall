'use strict';

let orm = require('./orm');
module.exports = orm.accountdb.define('group_permission', {
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
    groupId: {
        field: 'group_id',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '',
        get: function () {
            return this.getDataValue('groupId');
        },
        set: function (val) {
            this.setDataValue('groupId', val);
        }
    },
    permissionId: {
        field: 'permission_id',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('permissionId');
        },
        set: function (val) {
            this.setDataValue('permissionId', val);
        }
    },
    cate: {
        field: 'cate',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('cate');
        },
        set: function (val) {
            this.setDataValue('cate', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});