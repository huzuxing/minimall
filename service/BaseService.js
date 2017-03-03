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
    destroy() {
        console.log(555);
    }
    update(dbEntity, entity) {
        return new Promise(function (resolve, reject) {
            dbEntity.update(entity).then(function (result) {
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
