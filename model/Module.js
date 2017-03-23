'use strict';

let orm = require('./orm');

module.exports = orm.accountdb.define('module', {
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
    parentId: {
        field: 'parent_id',
        type: orm.Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true,
        unique: true,
        get: function () {
            return this.getDataValue('parentId');
        },
        set: function (val) {
            this.setDataValue('parentId', val);
        }
    },
    enName: {
        field: 'en_name',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('enName');
        },
        set: function (val) {
            this.setDataValue('enName', val);
        }
    },
    zhName: {
        field: 'zh_name',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('zhName');
        },
        set: function (val) {
            this.setDataValue('zhName', val);
        }
    },
    icon: {
        field: 'icon',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('icon');
        },
        set: function (val) {
            this.setDataValue('icon', val);
        }
    },
    url: {
        field: 'url',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('url');
        },
        set: function (val) {
            this.setDataValue('url', val);
        }
    },
    target: {
        field: 'target',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('target');
        },
        set: function (val) {
            this.setDataValue('target', val);
        }
    },
    isMenu: {
        field: 'is_menu',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get: function () {
            return this.getDataValue('isMenu');
        },
        set: function (val) {
            this.setDataValue('isMenu', val);
        }
    },
    isDisplay: {
        field: 'is_display',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        get: function () {
            return this.getDataValue('isDisplay');
        },
        set: function (val) {
            this.setDataValue('isDisplay', val);
        }
    },
    allowExpand: {
        field: 'allow_expand',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('allowExpand');
        },
        set: function (val) {
            this.setDataValue('allowExpand', val);
        }
    },
    isPublish: {
        field: 'is_publish',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0,
        get: function () {
            return this.getDataValue('isPublish');
        },
        set: function (val) {
            this.setDataValue('isPublish', val);
        }
    },
    allowEdit: {
        field: 'allow_edit',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('allowEdit');
        },
        set: function (val) {
            this.setDataValue('allowEdit', val);
        }
    },
    allowDelete: {
        field: 'allow_delete',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('allowDelete');
        },
        set: function (val) {
            this.setDataValue('allowDelete', val);
        }
    },
    sort: {
        field: 'sort',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('sort');
        },
        set: function (val) {
            this.setDataValue('sort', val);
        }
    },
    deleteMark: {
        field: 'delete_mark',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('deleteMark');
        },
        set: function (val) {
            this.setDataValue('deleteMark', val);
        }
    },
    enableMark: {
        field: 'enable_mark',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('enableMark');
        },
        set: function (val) {
            this.setDataValue('enableMark', val);
        }
    },
    description: {
        field: 'description',
        type: orm.Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        get: function () {
            return this.getDataValue('description');
        },
        set: function (val) {
            this.setDataValue('description', val);
        }
    },
    createUserId: {
        field: 'create_user_id',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('createUserId');
        },
        set: function (val) {
            this.setDataValue('createUserId', val);
        }
    },
    createUserName: {
        field: 'create_username',
        type: orm.Sequelize.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('createUserName');
        },
        set: function (val) {
            this.setDataValue('createUserName', val);
        }
    },
    updateUserId: {
        field: 'update_user_id',
        type: orm.Sequelize.INTEGER,
        allowNull: true,
        get: function () {
            return this.getDataValue('updateUserId');
        },
        set: function (val) {
            this.setDataValue('updateUserId', val);
        }
    },
    updateUserName: {
        field: 'update_username',
        type: orm.Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('updateUserName');
        },
        set: function (val) {
            this.setDataValue('updateUserName', val);
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
        allowNull: false,
        defaultValue: new Date(),
        get: function () {
            return this.getDataValue('updateTime');
        },
        set: function (val) {
            this.setDataValue('updateTime', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});