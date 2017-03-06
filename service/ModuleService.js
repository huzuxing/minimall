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
}
module.exports = new ModuleService();