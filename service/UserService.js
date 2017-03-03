/**
 * Created by zzy on 17/2/24.
 */
'use strict';
let user = require('../model/User');
let orm = require('../model/orm');
let BaseService = require('./BaseService');
class UserService extends BaseService{

    constructor() {
        super();
    }

    getUserByUnionId(unionId) {
        return new Promise(function (resolve, reject) {
            user.findOne({
                where : {
                    unionId : unionId
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
module.exports = new UserService();