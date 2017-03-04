/**
 * Created by zzy on 17/2/24.
 */
'use strict';
let orm = require('./orm');

module.exports = orm.accountdb.define('user_task_award', {
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
            get: function () {
                return this.getDataValue('userId');
            },
            set: function (val) {
                this.setDataValue('userId', val);
            }
        },
        taskId: {
            field: 'task_id',
            type: orm.Sequelize.INTEGER,
            allowNull: false,
            get: function () {
                return this.getDataValue('taskId');
            },
            set: function (val) {
                this.setDataValue('taskId', val);
            }
        },
        taskType: {
            field: 'task_type',
            type: orm.Sequelize.INTEGER,
            allowNull: false,
            get: function () {
                return this.getDataValue('taskType');
            },
            set: function (val) {
                this.setDataValue('taskType', val);
            }
        },
        isDraw: {
            field: 'is_draw',
            type: orm.Sequelize.INTEGER,
            allowNull: false,
            get: function () {
                return this.getDataValue('isDraw');
            },
            set: function (val) {
                this.setDataValue('isDraw', val);
            }
        },
        awardType: {
            field: 'award_type',
            type: orm.Sequelize.INTEGER,
            allowNull: false,
            get: function () {
                return this.getDataValue('awardType');
            },
            set: function (val) {
                this.setDataValue('awardType', val);
            }
        },
        awardCount: {
            field: 'award_count',
            type: orm.Sequelize.INTEGER,
            allowNull: false,
            get: function () {
                return this.getDataValue('awardCount');
            },
            set: function (val) {
                this.setDataValue('awardCount', val);
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
        drawTime: {
            field: 'draw_time',
            type: orm.Sequelize.DATE,
            allowNull: true,
            defualtValue: '0000-00-00 00:00:00',
            get: function () {
                return this.getDataValue('drawTime');
            },
            set: function (val) {
                this.setDataValue('drawTime', val);
            }
        }
    },
    {
        freezeTableName: true,
        charset: 'utf8',
        timestamps: false
    });