/**
 * Created by zzy on 17/2/27.
 */
'use strict';

const express = require ('express');
const router    = express.Router();
const service = require ('../service');
const test = require ('../test/Test');

/**
 * 查询
 */
router.get('/', function (req, res) {

});

/**
 *新增,修改
 */
router.post('/', function (req, res) {
    let id = req.body.id;
    let bean = {};
    for(let i in req.body) {
        bean[i] = req.body[i];
    }
    if (!!id) {
        service.moduleService.update(bean);
    }
    else {
        service.moduleService.save(bean).then(result => {
            if (result && result == 1) {
                res.jsonp({code : 200});
            }
            else {
                res.jsonp({code : 0, msg : 'failed'});
            }
        }).catch(ex => {
            console.error(ex);
            res.jsonp({code : 0, msg : 'unkonw error'});
        });
    }
});

/**
 *删除
 */
router.delete('/:id', function (req, res) {
    let id = req.params.id;
    if (!!id) {
        service.moduleService.delete(id).then(result => {
            if (result && result == 1) {
                res.jsonp({code : 200});
            }
            else {
                res.jsonp({code : 0, msg : 'failed'});
            }
        }).catch(ex => {
            console.error(ex);
            res.jsonp({code : 0, msg : 'unkonw error'});
        });
    }
    else {
        res.jsonp({code : 0, msg : 'params error'});
    }
});

module.exports = router;