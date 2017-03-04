'use strict';


var redis     = require('redis');
var config    = require('../config');
var redisUtil = require('./redisUtil');

var cacheKeys = [];

var dbClient = redis.createClient(config.cache.port, config.cache.host, config.cache.opts);

/**
 * 自动数据缓存
 * @param key 缓存key
 * @param time  超时时间(s)
 * @param func  获取数据函数
 */
function autoCacheData(key, time, func) {
    return new Promise(function (resolve, reject) {
        getCacheData(key)
            .then(function (response) {
                if (response == undefined || response == null ||
                    response == [] || time == 0) {
                    //未缓存数据
                    func(function (data) {
                        if (!data) {
                            resolve();
                            return;
                        }
                        if (time == 0) {
                            resolve(data);
                            return;
                        }
                        //获取数据,设置缓存
                        setCacheData(key, data, time)
                            .then(function (result) {
                                if (data !== null && data !== undefined) {
                                    console.log('更新数据缓存:' + key);
                                }
                                resolve(data);
                            })
                            .catch(function (err) {
                                console.error('设置缓存:' + key + ' 失败,err:' + err);
                                resolve(data);
                            });
                    });
                }
                else {
                    resolve(response);
                }
            })
            .catch(function (e) {
                reject(e);
            });

    });
}
/**
 * 自动数据缓存
 * @param key 缓存key
 * @param time  超时时间(s)
 * @param func  获取数据函数
 */
function autoCacheDataHM(hash, key, time, func) {
    return new Promise(function (resolve, reject) {
        getCacheDataHM(hash,key)
            .then(function (response) {
                if (response == undefined || response == null ||
                    response == [] || time == 0) {
                    //未缓存数据
                    func(function (data) {
                        if (!data) {
                            resolve();
                            return;
                        }
                        if (time == 0) {
                            resolve(data);
                            return;
                        }
                        //获取数据,设置缓存
                        setCacheDataHM(hash, key, data, time)
                            .then(function (result) {
                                if (data !== null && data !== undefined) {
                                    console.log('更新数据缓存:' + hash + '-' + key);
                                }
                                resolve(data);
                            })
                            .catch(function (err) {
                                console.error('设置缓存:' + key + ' 失败,err:' + err);
                                resolve(data);
                            });
                    });
                }
                else {
                    resolve(response);
                }
            })
            .catch(function (e) {
                reject(e);
            });

    });
}

/**
 * 获取缓存数据
 * @param key 缓存key
 * @param val 默认值
 * @returns {Promise}
 */
function getCacheData(key, val) {
    return new Promise(function (resolve, reject) {
        redisUtil.select(dbClient, config.cache.db)
            .then(function () {
                return redisUtil.get(dbClient, key);
            })
            .then(function (data) {
                try {
                    resolve(JSON.parse(data) || val);
                }
                catch (e) {
                    if (!!e) {
                        console.error(e);
                    }
                    resolve(val);
                }
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

/**
 * 获取缓存数据
 * @param key 缓存key
 * @param val 默认值
 * @returns {Promise}
 */
function getCacheDataHM(hash, key, val) {
    return new Promise(function (resolve, reject) {
        redisUtil.select(dbClient, config.cache.db)
            .then(function () {
                return redisUtil.hget(dbClient, hash, key);
            })
            .then(function (data) {
                try {
                    resolve(JSON.parse(data) || val);
                }
                catch (e) {
                    if (!!e) {
                        console.error(e);
                    }
                    resolve(val);
                }
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

/**
 * 设置缓存数据
 * @param key
 * @param val
 * @param time 过期时间
 * @returns {Promise}
 */
function setCacheData(key, val, time) {
    return new Promise(function (resolve, reject) {
        redisUtil.select(dbClient, config.cache.db)
            .then(function () {
                if (typeof(val) != 'string') {
                    val = JSON.stringify(val);
                }
                addKey(key);
                return redisUtil.set(dbClient, key, val);
            })
            .then(function (data) {
                if (data === "OK" || data == 1) {
                    if (!!time) {
                        dbClient.expire(key, time);
                    }
                    resolve(true);
                }
                else {
                    reject(false);
                }
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

/**
 * 设置缓存数据
 * @param key
 * @param val
 * @param time 过期时间
 * @returns {Promise}
 */
function setCacheDataHM(hash, key, val, time) {
    return new Promise(function (resolve, reject) {
        redisUtil.select(dbClient, config.cache.db)
            .then(function () {
                if (typeof(val) != 'string') {
                    val = JSON.stringify(val);
                }
                addKey(hash + '-' + key);
                return redisUtil.hset(dbClient, hash, key, val);
            })
            .then(function (data) {
                //if (data ==1) {
                if (!!time) {
                    dbClient.expire(hash, time);
                }
                resolve(true);
                /*}
                 else {
                 reject(false);
                 }*/
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

/**
 * 删除缓存数据
 * @param key
 * @returns {Promise}
 */
function removeCache(key) {
    console.log('清除数据缓存:' + key);
    return new Promise(function (resolve, reject) {
        redisUtil.select(dbClient, config.cache.db)
            .then(function () {
                let index = cacheKeys.indexOf(key);
                if (index >= 0) {
                    cacheKeys.splice(index, 1);
                }
                return redisUtil.del(dbClient, key);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

/**
 * 删除缓存数据
 * @param key
 * @returns {Promise}
 */
function removeCacheHM(hash, key) {
    console.log('清除数据缓存:' + hash + '-' + key);
    return new Promise(function (resolve, reject) {
        redisUtil.select(dbClient, config.cache.db)
            .then(function () {
                let index = cacheKeys.indexOf(key);
                if (index >= 0) {
                    cacheKeys.splice(index, 1);
                }
                return redisUtil.hdel(dbClient, hash, key);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

function addKey(key) {
    redisUtil.select(dbClient, config.cache.db)
        .then(function () {
            return redisUtil.get(dbClient, 'allkeys');
        })
        .then(function (result) {
            var keys = [];
            if (!!result) {
                keys = JSON.parse(result);
            }
            if (keys.indexOf(key) == -1) {
                keys.push(key);
                redisUtil.set(dbClient, 'allkeys', JSON.stringify(keys));
            }
        })
        .catch(function (err) {
            if (!!err) {
                console.error(err);
            }
        });
}

/**
 * 通过正则清除缓存
 * @param key 清除key正则
 * @param except 排除清除key正则
 *
 */
function removeCacheByKey(key, except) {
    redisUtil.select(dbClient, config.cache.db)
        .then(function () {
            return redisUtil.get(dbClient, 'allkeys');
        })
        .then(function (result) {
            var keys = [];
            if (!!result) {
                keys = JSON.parse(result);
            }
            keys.forEach(function (item) {
                if (new RegExp(key).test(item) && !(except && new RegExp(except).test(item))) {
                    removeCache(item);
                }
            });
        })
        .catch(function (err) {
            if (!!err) {
                console.error(err);
            }
        });
}

/**
 * 获取缓存数据
 * @param key 缓存key
 * @param val 默认值
 * @returns {Promise}
 */
function hgetAll(key, val) {
    return new Promise(function (resolve, reject) {
        redisUtil.select(dbClient, config.cache.db)
            .then(function () {
                return redisUtil.hgetall(dbClient, key);
            })
            .then(function (data) {
                resolve(data);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

/*
 * 通过正则清除缓存
 * @param key 清除key正则
 * @param except 排除清除key正则
 *
 */
function removeCacheHMByKey(hash, key, except) {
    redisUtil.select(dbClient, config.cache.db)
        .then(function () {
            return redisUtil.get(dbClient, 'allkeys');
        })
        .then(function (result) {
            var keys = [];
            if (!!result) {
                keys = JSON.parse(result);
            }
            keys.forEach(function (item) {
                if (new RegExp(hash + '-' + key).test(item) && !(except && new RegExp(hash + '-' + except).test(item))) {
                    removeCacheHM(hash, item);
                }
            });
        })
        .catch(function (err) {
            if (!!err) {
                console.error(err);
            }
        });
}

module.exports.getCacheDataHM     = getCacheDataHM;
module.exports.setCacheDataHM     = setCacheDataHM;
module.exports.getCacheData       = getCacheData;
module.exports.setCacheData       = setCacheData;
module.exports.removeCache        = removeCache;
module.exports.removeCacheHM      = removeCacheHM;
module.exports.removeCacheHMByKey = removeCacheHMByKey;
module.exports.autoCacheData      = autoCacheData;
module.exports.autoCacheDataHM    = autoCacheDataHM;
module.exports.removeCacheByKey   = removeCacheByKey;
module.exports.hgetAll            = hgetAll;

