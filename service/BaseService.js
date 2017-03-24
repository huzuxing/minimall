'use strict';
/**
 * Created by zzy on 17/2/24.
 */
module.exports = class BaseService {
    constructor () {
    }
    list() {

    }
    getById(dbEntity, id) {
        return new Promise(function (resolve, reject) {
            dbEntity.findOne({
                where : {
                    id : id
                }
            }).then(function (result) {
                resolve(result);
            }).catch(function (ex) {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }
    save(dbEntity, entity) {
        return new Promise(function (resolve, reject) {
            dbEntity.create(entity).then(function (result) {
                resolve(result);
            }).catch(function (ex) {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }
    destroy(dbEntity, id) {
        return new Promise(function (resolve, reject) {
            dbEntity.destroy({
                where : {
                    $and: [
                        {
                            id: id
                        },
                        {
                            allowDelete: 0//允许删除
                        }
                    ]
                }
            }).then(result => {
                resolve(result);
            }).catch(ex => {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }
    update(dbEntity, entity) {
        return new Promise(function (resolve, reject) {
            dbEntity.update(entity, {
                where : {
                    id : entity.id
                }
            }).then(function (result) {
                resolve(result);
            }).catch(function (ex) {
                console.error(ex);
                throw new Error(ex);
            });
        });
    }
    setDbEntity(dbEntity) {
        this.dbEntity = dbEntity;
    }
    setEntity(entity) {
        this.entity = entity;
    }
}
