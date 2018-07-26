/**
 * Created by zzy on 17/2/24.
 */
'use strict';
let orm = require('../model/orm');
let BaseService = require('./BaseService');
let Content = require('../model/Content');
let ContentTxt = require('../model/ContentTxt');
class ContentExtService extends BaseService {

    constructor() {
        super();
    }

    //持久化资源module
    save(bean) {
        return new Promise(function (resolve, reject) {
            orm.accountdb.transaction(function (tr) {
                return Content.create(bean, {transaction : tr}).then(result => {
                    let contentTxt = {};
                    contentTxt.id = result.null;
                    contentTxt.txt = bean.txt;
                    return ContentTxt.create(contentTxt, {transaction : tr});
                });
            }).then(result => {
                resolve(result);
            }).catch(error => {
                console.error(error)
            });
        });
    }

    //更新资源module
    update(bean) {
        return new Promise(function (resolve, reject) {
            orm.accountdb.transaction(function (tr) {
                return Content.update(bean,{
                    where : { id : bean.id}
                }, {transaction : tr}).then(result => {
                    let contentTxt = {};
                    contentTxt.txt = bean.txt;
                    return ContentTxt.update(contentTxt, {
                        where : { id : bean.id}
                    }, {transaction : tr});
                });
            }).then(result => {
                resolve(result);
            }).catch(error => {
                console.error(error)
            });
        });
    }

    //删除资源module
    delete(id) {
        return new Promise(function (resolve, reject) {
            orm.accountdb.transaction(function (tr) {
                return Content.destroy({
                    where : { id : id}
                }, {transaction : tr}).then(result => {
                    return ContentTxt.destroy({
                        where : { id : id}
                    }, {transaction : tr});
                });
            }).then(result => {
                resolve(result);
            }).catch(error => {
                console.error(error)
            });
        });
    }
    
    //获取菜单列表
    list(ids) {
        return new Promise(function (resolve, reject) {
            let sql = 'select * from cyc_content m where 1=1';
            if (ids && ids instanceof Array) {
                sql += ' and m.id in(' + ids + ')';
            }
            sql += ' order by m.create_time desc';
            orm.accountdb.query(sql, {type: orm.Sequelize.QueryTypes.SELECT}).then(result => {
               resolve(result);
            }).catch(ex => {
                console.error(ex);
                reject(ex);
            });
        });
    }

    findPage(bean, pageNo, pageSize) {
        pageNo = pageNo < 1 ? 1 : pageNo;
        pageSize = pageSize < 10 ? 10 : pageSize;
        return new Promise(function (resovle, reject) {
            let sql = 'select m.*,cc.name as channelName from cyc_content m left join cyc_channel cc on m.channel_id=cc.id where 1=1';
            if (bean && bean.title) {
                sql += ' and m.title like \'%' + bean.title + '%\'';
            }
            sql += ' order by m.create_time desc';
            sql += ' limit ' + ((pageNo - 1) * pageSize) + ',';
            sql += pageSize;
            orm.accountdb.query(sql, {type: orm.Sequelize.QueryTypes.SELECT}).then(result => {
                resovle(result);
            }).catch(ex => {
                console.error(ex);
                reject(ex);
            });
        });
    }


    // 统计
    count(bean) {
        return new Promise(function (resovle, reject) {
            let sql = 'select count(*) count from cyc_content m where 1=1';
            if (bean && bean.title) {
                sql += ' and m.title like \'%' + bean.title + '%\'';
            }
            orm.accountdb.query(sql, {type: orm.Sequelize.QueryTypes.SELECT}).then(result => {
                resovle(result[0].count);
            }).catch(ex => {
                console.error(ex);
                reject(ex);
            });
        });
    }

    knowledgePage(uri, pageNo, pageSize) {
        pageNo = pageNo < 1 ? 1 : pageNo;
        pageSize = pageSize < 10 ? 10 : pageSize;
        return new Promise(function (resovle, reject) {
            let sql = 'select m.* from cyc_content m left join cyc_channel cc on m.channel_id=cc.id where 1=1';
            if (uri && "" != uri) {
                sql += ' and cc.channel_path=\'' + uri + '\'';
            }
            sql += ' order by m.create_time desc';
            sql += ' limit ' + ((pageNo - 1) * pageSize) + ',';
            sql += pageSize;
            orm.accountdb.query(sql, {type: orm.Sequelize.QueryTypes.SELECT}).then(result => {
                resovle(result);
            }).catch(ex => {
                console.error(ex);
                reject(ex);
            });
        });
    }
    // 统计
    knowledgeCount(uri) {
        return new Promise(function (resovle, reject) {
            let sql = 'select count(m.id) count from cyc_content m left join cyc_channel cc on m.channel_id=cc.id where 1=1';
            if (uri && "" != uri) {
                sql += ' and cc.channel_path=\'' + uri + '\'';
            }
            sql += ' order by m.create_time desc';
            orm.accountdb.query(sql, {type: orm.Sequelize.QueryTypes.SELECT}).then(result => {
                resovle(result[0].count);
            }).catch(ex => {
                console.error(ex);
                reject(ex);
            });
        });
    }

    //获取单个menu
    getById(id) {
        return super.getById(Content, id);
    }
    // 判断是否有子数据
    getByParentId(id) {
        return new Promise(function (resolve,reject) {
            channel.findAll({
                where : {
                    parentId : id
                }
            }).then(result => {
                resolve(result);
            }).catch(ex => {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }
    getContentByChannel(channelPath, pageNo, pageSize) {
        return new Promise(function (resovle, reject) {
            let sql = 'select m.*,cct.txt as txt from cyc_content m left join cyc_content_txt cct on cct.content_id=m.id left join cyc_channel cc on m.channel_id=cc.id where 1=1';
            if (channelPath && "" != channelPath) {
                sql += ' and cc.channel_path=\'' + channelPath + '\'';
            }
            sql += ' order by m.create_time desc';
            sql += ' limit ' + ((pageNo - 1) * pageSize) + ',';
            sql += pageSize;
            orm.accountdb.query(sql, {type: orm.Sequelize.QueryTypes.SELECT}).then(result => {
                resovle(result);
            }).catch(ex => {
                console.error(ex);
                reject(ex);
            });
        });
    }
    findContentByChannel(channelPath, pageNo, pageSize) {
        return new Promise(function (resovle, reject) {
            let sql = 'select m.* from cyc_content m left join cyc_channel cc on m.channel_id=cc.id where 1=1';
            if (channelPath && "" != channelPath) {
                sql += ' and cc.channel_path like \'' + channelPath + '%\'';
            }
            sql += ' order by m.create_time desc';
            sql += ' limit ' + ((pageNo - 1) * pageSize) + ',';
            sql += pageSize;
            orm.accountdb.query(sql, {type: orm.Sequelize.QueryTypes.SELECT}).then(result => {
                resovle(result);
            }).catch(ex => {
                console.error(ex);
                reject(ex);
            });
        });
    }
}
module.exports = new ContentExtService();