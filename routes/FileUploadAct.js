'use strict';
var express = require('express');
var router = express.Router();
const CONSTANT = require('../common/Constant');
const fs = require('fs');
var path = require('path');

router.post('/', function (req, res) {
    if (!req.files || req.files.length <= 0) {
        return res.jsonp({code: CONSTANT.PARAM_FAIL_CODE, msg: CONSTANT.ARGS_ERROR});
    }
    let array = [];
    for (var i = 0, length = req.files.length; i < length; i++) {
        let newName = req.files[i].path + path.parse(req.files[i].originalname).ext;
        let imgUrl = newName;
        imgUrl = newName.slice(6);
        array.push(imgUrl);
        fs.rename(req.files[i].path, newName);
    }
    return res.jsonp({code: CONSTANT.SUCCESS_CODE, imgs : array});
});

module.exports = router;
