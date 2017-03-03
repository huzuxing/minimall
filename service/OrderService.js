/**
 * Created by zzy on 17/2/24.
 */
'use strict';
let order = require('../model/Order');
let chargeOrder = require('../model/ChargeOrder');
let orm = require('../model/orm');
let BaseService = require('./BaseService');
class OrderService extends BaseService{

    constructor() {
        super();
    }

    saveOrder(bean) {
       return super.save(order, bean);
    }

    saveChargeOrder(bean) {
        return super.save(chargeOrder, bean);
    }

    getOrderById(id) {
        return super.getById(order, id);
    }

    getOrderByOrderNum(orderNum) {
        return new Promise(function (resolve,reject) {
            order.findOne({
                where : {
                    ordeNum : orderNum
                }
            }).then(result => {
                resolve(result);
            }).catch(ex => {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }

    updateOrder(bean) {
        return super.update(order, bean);
    }

    getChargeOrderById(id) {
        return super.getById(chargeOrder, id);
    }

    getChargeOrderByOrderNum(orderNum) {
        return new Promise(function (resolve,reject) {
            chargeOrder.findOne({
                where : {
                    ordeNum : orderNum
                }
            }).then(result => {
                resolve(result);
            }).catch(ex => {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }

    updateChargeOrder(bean) {
        return super.update(chargeOrder, bean);
    }

    listChargeOrder(bean) {
        return new Promise(function (resolve, reject) {
            chargeOrder.findAll({
                where : {
                    userId : bean.userId
                },
                offset : (bean.pageNo - 1) * bean.pageSize,
                limit : bean.pageSize,
                order : [['createTime', 'desc']]
            }).then(result => {
                resolve(result);
            }).catch(ex => {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }

}
module.exports = new OrderService();