'use strict';

let orm = require('./orm');

module.exports = orm.accountdb.define('cyc_content_type', {
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
    imgWidth: {
        field: 'img_width',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('imgWidth');
        },
        set: function (val) {
            this.setDataValue('imgWidth', val);
        }
    },
    imgHeight: {
        field: 'img_height',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('imgHeight');
        },
        set: function (val) {
            this.setDataValue('imgHeight', val);
        }
    },
    hasImg: {
        field: 'has_img',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        get: function () {
            return this.getDataValue('hasImg');
        },
        set: function (val) {
            this.setDataValue('hasImg', val);
        }
    },
    isDisabled: {
        field: 'is_disabled',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('sortDate');
        },
        set: function (val) {
            this.setDataValue('sortDate', val);
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