'use strict';

let orm = require('./orm');
module.exports = orm.accountdb.define('cyc_user_role', {
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
    userId: {
        field: 'user_id',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '',
        get: function () {
            return this.getDataValue('userId');
        },
        set: function (val) {
            this.setDataValue('userId', val);
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