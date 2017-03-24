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
    },
    typeId: {
        field: 'type_id',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('typeId');
        },
        set: function (val) {
            this.setDataValue('typeId', val);
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
    sortDate: {
        field: 'sort_date',
        type: orm.Sequelize.DATE,
        allowNull: true,
        get: function () {
            return this.getDataValue('sortDate');
        },
        set: function (val) {
            this.setDataValue('sortDate', val);
        }
    },
    topLevel: {
        field: 'top_level',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('topLevel');
        },
        set: function (val) {
            this.setDataValue('topLevel', val);
        }
    },
    isRecommend: {
        field: 'is_recommend',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('isRecommend');
        },
        set: function (val) {
            this.setDataValue('isRecommend', val);
        }
    },
    status: {
        field: 'status',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('status');
        },
        set: function (val) {
            this.setDataValue('status', val);
        }
    },
    viewsDay: {
        field: 'views_day',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('viewsDay');
        },
        set: function (val) {
            this.setDataValue('viewsDay', val);
        }
    },
    commentsDay: {
        field: 'comments_day',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('commentsDay');
        },
        set: function (val) {
            this.setDataValue('commentsDay', val);
        }
    },
    downloadsDay: {
        field: 'downloads_day',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('downloadsDay');
        },
        set: function (val) {
            this.setDataValue('downloadsDay', val);
        }
    },
    udsDay: {
        field: 'ups_day',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('udsDay');
        },
        set: function (val) {
            this.setDataValue('udsDay', val);
        }
    },
    score: {
        field: 'score',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('score');
        },
        set: function (val) {
            this.setDataValue('score', val);
        }
    },
    recommendLevel: {
        field: 'recommend_level',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('recommendLevel');
        },
        set: function (val) {
            this.setDataValue('recommendLevel', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});