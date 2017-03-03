/**
 * Created by zzy on 17/2/24.
 */
'use strict';
let orm = require('./orm');

module.exports = orm.accountdb.define('task', {
    id : {
        field: 'id',
        type: orm.Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true,
        unique: true,
        get : function () {
            return this.getDataValue('id');
        },
        set : function (val) {
            this.setDataValue('id', val);
        }
    },
    name : {
        field: 'name',
        type : orm.Sequelize.STRING,
        allowNull: false,
        get : function () {
            return this.getDataValue('name');
        },
        set : function (val) {
            this.setDataValue('name', val);
        }
    },
    cate : {
        field: 'cate',
        type : orm.Sequelize.INTEGER,
        allowNull: false,
        get : function () {
            return this.getDataValue('cate');
        },
        set : function (val) {
            this.setDataValue('cate', val);
        }
    },
    channel : {
        field: 'channel',
        type : orm.Sequelize.STRING,
        allowNull: false,
        get : function () {
            return this.getDataValue('channel');
        },
        set : function (val) {
            this.setDataValue('channel', val);
        }
    },
    type : {
        field: 'type',
        type : orm.Sequelize.INTEGER,
        allowNull: false,
        get : function () {
            return this.getDataValue('type');
        },
        set : function (val) {
            this.setDataValue('type', val);
        }
    },
    targetType : {
        field: 'target_type',
        type : orm.Sequelize.INTEGER,
        allowNull: false,
        get : function () {
            return this.getDataValue('targetType');
        },
        set : function (val) {
            this.setDataValue('targetType', val);
        }
    },
    targetNum : {
        field: 'target_num',
        type : orm.Sequelize.INTEGER,
        allowNull: false,
        get : function () {
            return this.getDataValue('targetNum');
        },
        set : function (val) {
            this.setDataValue('targetNum', val);
        }
    },
    targetRequire : {
        field: 'target_require',
        type : orm.Sequelize.INTEGER,
        allowNull: false,
        get : function () {
            return this.getDataValue('targetRequire');
        },
        set : function (val) {
            this.setDataValue('targetRequire', val);
        }
    },
    awardType : {
        field: 'award_type',
        type : orm.Sequelize.INTEGER,
        allowNull: false,
        get : function () {
            return this.getDataValue('awardType');
        },
        set : function (val) {
            this.setDataValue('awardType', val);
        }
    },
    awardCount : {
        field: 'award_count',
        type : orm.Sequelize.INTEGER,
        allowNull: false,
        get : function () {
            return this.getDataValue('awardCount');
        },
        set : function (val) {
            this.setDataValue('awardCount', val);
        }
    },
    createTime : {
        field: 'create_time',
        type : orm.Sequelize.DATE,
        allowNull: false,
        get : function () {
            return this.getDataValue('createTime');
        },
        set : function (val) {
            this.setDataValue('createTime', val);
        }
    },
    updateTime : {
        field: 'update_time',
        type : orm.Sequelize.DATE,
        allowNull: false,
        get : function () {
            return this.getDataValue('updateTime');
        },
        set : function (val) {
            this.setDataValue('updateTime', val);
        }
    }
});