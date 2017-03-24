'use strict';

let orm = require('./orm');
module.exports = orm.accountdb.define('cyc_group_role', {
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
    roleId: {
        field: 'role_id',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('roleId');
        },
        set: function (val) {
            this.setDataValue('roleId', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});