'use strict';
var express = require('express');
var router = express.Router();
const CONSTANT = require('../../common/Constant');
const request = require('request');
let config = require('../../config');
const contentService = require('../../service/ContentService');
const contentTxtService = require('../../service/ContentTxtService');
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
router.get('/', function (req, res, next) {
    res.render('front/index', {title: 'Express'});
});

router.get('/service', function (req, res, next) {
    res.render('front/service', {title: 'Express'});
});

router.get('/case', function (req, res, next) {
    res.render('front/case', {title: 'Express'});
});

router.get('/knowledge', function (req, res, next) {

    let pageNo = req.query.pageNo || 1;
    let pageSize = req.query.pageSize || 10;
    let q = req.query.q;
    let bean = {
        title: q
    };
    let page = {
        pageNo: pageNo,
        pageSize: pageSize,
        q: q,
        prePage: (pageNo - 1) <= 0 ? 1 : pageNo - 1,
    };
    contentService.count(bean).then(count => {
        page.totalCount = count;
        page.totalPage = (count / pageSize) == 0 ? count / pageSize : Math.floor(count / pageSize) + 1;
        page.nextPage = (pageNo + 1) > page.totalPage ? page.totalPage : pageNo + 1;
        return contentService.findPage(bean, pageNo, pageSize);
    }).then(result => {
        res.locals.data = result;
        res.locals.page = page;
        res.render('front/knowledge', {title: 'Express'});
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    });

});

router.get('/knowledge', function (req, res, next) {
    res.render('front/knowledge', {title: 'Express'});
});

router.get('/about', function (req, res, next) {
    res.render('front/about', {title: 'Express'});
});

router.get('/contact', function (req, res, next) {
    let uri = req.originalUrl;
    let data;
    contentService.contact(uri).then(result => {
        data = result;
        return contentTxtService.getById(data.id);
    }).then(result => {
        data.txt = new Buffer(result.txt).toString('base64');
        res.render('front/contact', {data: data});
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    });

});

router.get('/default', function (req, res) {
    res.render('default');
});


module.exports = router;
