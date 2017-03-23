'use strict';
var express = require('express');
let app = express();
var router = express.Router();
const wxPay = require('../../common/WxPay');
const CONSTANT = require('../../common/Constant');
const request = require('request');
let config = require('../../config');
const APPID = config.WX_PUB_PAY.PUB_APPID;
const SECRET = config.WX_PUB_PAY.SECRET;
let user_url = config.WX_PUB_PAY.USER_URL;
const service = require('../../service/index');
const adminUser = require('./users');
const menuAct = require('./MenuAct');


/**
 * 时间对象的格式化
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M{1,2}": this.getMonth() + 1, //月份
        "d{1,2}": this.getDate(), //日
        "h{1,2}": this.getHours(), //小时
        "m{1,2}": this.getMinutes(), //分
        "s{1,2}": this.getSeconds(), //秒
        "q{1,2}": Math.floor((this.getMonth() + 3) / 3), //季度
        "S{1,3}": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) {
            var v = o[k] + '';
            while (v.length < RegExp.$1.length) {
                v = '0' + v;
            }
            fmt = fmt.replace(RegExp.$1, v);
            /*fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
             ? (o[k])
             : (("00" + o[k]).substr(("" + o[k]).length)));*/
        }
    return fmt;
};

/* GET home page. */
router.get('/index', function (req, res) {
    res.render('admin/index', {title: 'Express'});
});

router.get('/default', function (req, res) {
    res.render('admin/default');
});

router.use('/user', adminUser);
router.use('/menu', menuAct);

module.exports = router;
