'use strict';

let orm = require('./orm');

module.exports = orm.accountdb.define('cyc_contenttag', {
    contentId: {
        field: 'content_id',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        get: function () {
            return this.getDataValue('contentId');
        },
        set: function (val) {
            this.setDataValue('contentId', val);
        }
    },
    tagId: {
        field: 'tag_id',
        type: orm.Sequelize.INTEGER,
        allowNull: false,
        get: function () {
            return this.getDataValue('tagId');
        },
        set: function (val) {
            this.setDataValue('tagId', val);
        }
    }
}, {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: false
});