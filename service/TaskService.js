/**
 * Created by zzy on 17/2/24.
 */
'use strict';
let task = require('../model/Task');
let user = require('../model/User');
let userTaskAward = require('../model/UserTaskAward');
let orm = require('../model/orm');
let BaseService = require('./BaseService');
class TaskService extends BaseService{

    constructor() {
        super();
    }
    list(bean) {
        let args = {};
        args.where = {};
        if (bean) {
            if (bean.type)
                args.where.type = bean.type;
            if (bean.createTime)
                args.where.createTime = bean.createTime;
            if (bean.pageNo && bean.pageNo > 0 && bean.pageSize && bean.pageSize > 0) {
                args.offset = (bean.pageNo - 1) * bean.pageSize;
                args.limit = bean.pageSize;
            }
        }
        args.order = [['createTime', 'desc']];
        return new Promise(function (resolve, reject) {
            task.findAll(args).then(function (result) {
                resolve(result);
            }).catch(function (ex) {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }

    saveUserTaskAward(bean) {
        return super.save(userTaskAward, bean);
    }
    // 领取任务奖励
    drawAward(id) {
        return new Promise(function (resolve, reject) {
            let userTaskAwardBean = {};
            orm.accountdb.transaction().then(function (trans) {
                userTaskAward.findOne({
                    where : {
                        id : id
                    }
                }, {transaction: trans}).then(result =>  {
                    if (result && result.id > 0) {
                        userTaskAwardBean = result;
                        return userTaskAward.update({
                            isDraw : 1,
                            drawTime : new Date()
                        },
                            {
                                where : {
                                    id: result.id
                                }
                            }, {transaction : trans});
                    }
                }).then(result => {
                    if (result) {
                        return user.findOne({
                            where : {
                                id : userTaskAwardBean.userId
                            }
                        });
                    }
                }).then(result => {
                    if (result) {
                        return user.update({
                            coins:result.coins + userTaskAwardBean.awardCount
                        },{
                            where : {
                                id : result.id
                            }
                        },{
                            transaction:trans
                        });
                    }
                }).then(result => {
                    if (result)
                        resolve(true);
                    else
                        resolve(false);
                }).catch(ex => {
                    console.error(ex);
                    throw new Error(ex);
                });
            });
        });
    }
    // 根据ID获取奖励任务信息
    getUserTaskAwardById(id) {
        return super.getById(userTaskAward, id);
    }

}
module.exports = new TaskService();