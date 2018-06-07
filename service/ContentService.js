/**
 * Created by zzy on 17/2/24.
 */
'use strict';
let orm = require('../model/orm');
let BaseService = require('./BaseService');
let Content = require('../model/Content');

class ContentExtService extends BaseService {

    constructor() {
        super();
    }

    //持久化资源module
    save(bean) {
        return super.save(Content, bean);
    }

    //更新资源module
    update(bean) {
        return super.update(Content, bean);
    }

    //删除资源module
    delete(id) {
        return super.destroy(Content, id);
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
            let sql = 'select * from cyc_content m where 1=1';
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
}
module.exports = new ContentExtService();