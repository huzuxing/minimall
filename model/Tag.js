'use strict';

let orm = require('./orm');

module.exports = orm.accountdb.define('cyc_content_tag', {
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
    refCounter: {
        field: 'ref_counter',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        get: function () {
            return this.getDataValue('refCounter');
        },
        set: function (val) {
            this.setDataValue('refCounter', val);
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
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});