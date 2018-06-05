/**
 * Created by zzy on 17/2/24.
 */
'use strict';
let orm = require('../model/orm');
let BaseService = require('./BaseService');
let modules = require('../model/Module');

class ModuleService extends BaseService {

    constructor() {
        super();
    }

    //持久化资源module
    save(bean) {
        return super.save(modules, bean);
    }

    //更新资源module
    update(bean) {
        return super.update(modules, bean);
    }

    //删除资源module
    delete(id) {
        return super.destroy(modules, id);
    }
    
    //获取菜单列表
    list(ids) {
        return new Promise(function (resolve, reject) {
            let sql = 'select * from cyc_module m where 1=1 and m.is_display=0';
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

    getMenus(bean, pageNo, pageSize) {
        return new Promise(function (resovle, reject) {
            let sql = 'select * from cyc_module m where 1=1';
            if (bean && bean.zhName) {
                sql += ' and m.zh_name like \'%' + bean.zhName + '%\'';
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
            let sql = 'select count(*) count from cyc_module m where 1=1';
            if (bean && bean.zhName) {
                sql += ' and m.zh_name like \'%' + bean.zhName + '%\'';
            }
            console.log(sql);
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
        return super.getById(modules, id);
    }
    // 判断是否有子数据
    getByParentId(id) {
        return new Promise(function (resolve,reject) {
            modules.findAll({
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
module.exports = new ModuleService();