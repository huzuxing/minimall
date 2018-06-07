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
    title: {
        field: 'title',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('title');
        },
        set: function (val) {
            this.setDataValue('title', val);
        }
    },
    shortTitle: {
        field: 'short_title',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('shortTitle');
        },
        set: function (val) {
            this.setDataValue('shortTitle', val);
        }
    },
    author: {
        field: 'author',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('author');
        },
        set: function (val) {
            this.setDataValue('author', val);
        }
    },
    origin: {
        field: 'origin',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('origin');
        },
        set: function (val) {
            this.setDataValue('origin', val);
        }
    },
    originUrl: {
        field: 'origin_url',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('originUrl');
        },
        set: function (val) {
            this.setDataValue('originUrl', val);
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
    publishTime: {
        field: 'publish_time',
        type: orm.Sequelize.DATE,
        allowNull: true,
        get: function () {
            return this.getDataValue('publishTime');
        },
        set: function (val) {
            this.setDataValue('publishTime', val);
        }
    },
    link: {
        field: 'link',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('link');
        },
        set: function (val) {
            this.setDataValue('link', val);
        }
    },
    isPublish: {
        field: 'is_publish',
        type: orm.Sequelize.INTEGER,
        default: 0,
        get: function () {
            return this.getDataValue('isPublish');
        },
        set: function (val) {
            this.setDataValue('isPublish', val);
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
    },
    channelId: {
        field: 'channel_id',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        get: function () {
            return this.getDataValue('channelId');
        },
        set: function (val) {
            this.setDataValue('channelId', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});