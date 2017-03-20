'use strict';
var express = require('express');
var router = express.Router();
let StringUtils = require('../utils/StringUtils');
const CONSTANT = require('../common/Constant');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('admin/login', login);

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if (StringUtils.validateParams(username) || StringUtils.validateParams(paswsord)) {
        res.jsonp({code : CONSTANT.PARAM_FAIL_CODE, msg : CONSTANT.PARAM_FAIL_MSG});
    }
}


module.exports = router;
