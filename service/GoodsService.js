/**
 * Created by zzy on 17/2/24.
 */
'use strict';
let goods = require('../model/Goods');
let orm = require('../model/orm');
let BaseService = require('./BaseService');
class GoodsService extends BaseService{

    constructor() {
        super();
    }

    list(bean) {
        let args = {};
        args.where = {};
        if (bean) {
            if (bean.cate)
                args.where.cate = bean.cate;
            if (bean.status)
                args.where.status = bean.status;
            if (bean.pageNo && bean.pageNo > 0 && bean.pageSize && bean.pageSize > 0) {
                args.offset = (bean.pageNo - 1) * bean.pageSize;
                args.limit = bean.pageSize;
            }
        }
        args.order = [['rmb', 'ASC']];
        return new Promise(function (resolve, reject) {
            goods.findAll(args).then(function (result) {
                resolve(result);
            }).catch(function (ex) {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }

}
module.exports = new GoodsService();