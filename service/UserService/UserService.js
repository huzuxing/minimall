/**
 * Created by zzy on 17/2/24.
 */
'use strict';
let user = require('../../model/User');
let orm = require('../../model/orm');
let BaseService = require('../BaseService');
let role = require('../../model/Role');
let group = require('../../model/Group');
let permission = require('../../model/Permission');
let userRole = require('../../model/UserRole');
let groupRole = require('../../model/GroupRole');
let userPermission = require('../../model/UserPermission');
let groupPermission = require('../../model/GroupPermission');
let userGroup = require('../../model/UserGroup');
let rolePermission = require('../../model/RolePermission');
let utils = require('../../utils');
let module = require('../../model/Module');

class UserService extends BaseService {

    constructor() {
        super();
    }

    getUserByUnionId(unionId) {
        return new Promise(function (resolve, reject) {
            user.findOne({
                where: {
                    unionId: unionId
                }
            }).then(result => {
                resolve(result);
            }).catch(ex => {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }

    // 持久化group
    saveGroup(bean) {
        return super.save(group, bean);
    }

    //持久化role
    saveRole(bean) {
        return super.save(role, bean);
    }

    //持久化permission
    savePermission(bean) {
        return super.save(permission, bean);
    }

    // 持久化userRole
    saveUserRole(bean) {
        return super.save(userRole, bean);
    }

    //持久化userPermission
    saveUserPermission(bean) {
        return super.save(userPermission, bean);
    }

    //持久化userGroup
    saveUserGroup(bean) {
        return super.save(userGroup, bean);
    }

    //持久化rolePermission
    saveRolePermission(bean) {
        return super.save(rolePermission, bean);
    }

    //持久化groupPermission
    saveGroupPermission(bean) {
        return super.save(groupPermission, bean);
    }

    //持久化groupRole
    saveGroupRole(bean) {
        return super.save(groupRole, bean);
    }

    // 根据用户名,邮箱,微信unionid,和密码,获取用户信息
    getUserInfo(account, pwd) {

        return new Promise(function (resolve, reject) {
            user.findOne({
                where: {
                    $and: [
                        {
                            account: account
                        },
                        {
                            password: utils.md5(pwd)
                        }
                    ]
                }
            }).then(result => {
                if (result && result.id > 0) {
                    resolve(result);
                }
                else {
                    return user.findOne({
                        where: {
                            $and: [
                                {
                                    email: account
                                },
                                {
                                    password: utils.md5(pwd)
                                }
                            ]
                        }
                    });
                }
            }).then(result => {
                if (result && result.id > 0) {
                    resolve(result);
                }
                else {
                    return user.findOne({
                        where: {
                            $and: [
                                {
                                    phone: account
                                },
                                {
                                    password: utils.md5(pwd)
                                }
                            ]
                        }
                    });
                }
            }).then(result => {
                resolve(result);
            }).catch(ex => {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }

    // 微信登录,根据unionid 获取用户
    getUserInfoByUnionId(unionId) {
        return new Promise(function (resolve, result) {
            user.findOne({
                where: {
                    unionId: unionId
                }
            }).then(result => {
                resolve(result);
            }).catch(ex => {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }

    // 根据ID 获取user信息
    getUserInfoById(id) {
        return new Promise(function (resolve, result) {
            user.findOne({
                where: {
                    id: id
                }
            }).then(result => {
                resolve(result);
            }).catch(ex => {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }

    // 修改用户信息
    updateUserInfo(bean) {
        return new Promise(function (resolve, reject) {
            getUserInfoById(bean.id).then(result => {
                if (result && result.id > 0) {
                    return user.update(bean, {
                        where: {
                            id: bean.id
                        }
                    });
                }
                else
                    return null;
            }).then(result => {
                resolve(result);
            }).catch(ex => {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }

    // 持久化资源module
    saveModule(bean) {
        return super.save(module, bean);
    }
}
module.exports = new UserService();