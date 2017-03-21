'use strict';
var express = require('express');
var router = express.Router();
let StringUtils = require('../../utils/StringUtils');
const CONSTANT = require('../../common/Constant');
const service = require('../../service/index');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 跳转到登录界面
router.get('/login', function (req, res) {
    res.render('admin/login');
});

/**
 * 执行登录
 */
router.post('/login', login);

/**
 * 执行安全退出
 */
router.get('/logout', logout);

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if (StringUtils.validateParams(username) || StringUtils.validateParams(password)) {
        res.jsonp({code : CONSTANT.PARAM_FAIL_CODE, msg : CONSTANT.PARAM_FAIL_MSG});
    }
    else {
        service.adminUserService.getUserInfo(username, password).then(result => {
            if (result && result.id > 0) {
                if (result.isDisabled == 1) {
                    return res.jsonp({code : CONSTANT.USER_DISABLED_CODE, msg : CONSTANT.USER_DISABLED_MSG});
                }
                req.session.admin = result;
                res.jsonp({code : CONSTANT.SUCCESS_CODE, data : result});
            }
            else
                res.jsonp({code : CONSTANT.USER_FAIL_CODE, msg : CONSTANT.USER_FAIL_MSG});
        }).catch(ex => {
            console.error(ex);
            res.jsonp({code : CONSTANT.FAIL_CODE, msg : ex.message});
        });
    }
}

function logout(req, res) {
    let session = req.session;
    let admin = session.admin;
    if (admin && admin.id > 0) {
        session.admin = null;
    }
    res.redirect('admin/index');
}


module.exports = router;
