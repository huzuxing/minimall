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
    let uri = req.path;
    let data = {};
    contentService.getContentByChannel("/banner", 1,3).then(result => {
        data.banner = result;
        return contentService.findContentByChannel("/case", 1, 6);
    }).then(result => {
        data.case = result;
        return contentService.findContentByChannel("/service", 1, 6);
    }).then(result => {
        data.service = result;
        res.render('front/index', {data: data});
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    });
});

router.get('/service', function (req, res, next) {
    let uri = req.path;
    contentService.getContentByChannel(uri, 1, 1).then(result => {
        if (result && result.length > 0) {
            result = result[0];
        }
        if (result && result.txt) {
            result.txt = new Buffer(result.txt).toString("base64");
        }
        res.render('front/service', {data: result});
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    });


});

router.get('/case', function (req, res, next) {
    var data = {};
    contentService.getContentByChannel("/case/gov", 1,6).then(result => {
        data.gov = result;
        return contentService.getContentByChannel("/case/family", 1,6);
    }).then(result => {
        data.family = result;
        return contentService.getContentByChannel("/case/car", 1,6);
    }).then(result => {
        data.car = result;
        return contentService.getContentByChannel("/case/other", 1,6);
    }).then(result => {
        data.other = result;
        res.render('front/case', {data: data});
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    })

});

router.get('/knowledge', function (req, res, next) {

    let pageNo = req.query.pageNo || 1;
    let pageSize = req.query.pageSize || 10;
    let uri = req.path;
    let q = req.query.q;
    let page = {
        pageNo: pageNo,
        pageSize: pageSize,
        q: q,
        prePage: (pageNo - 1) <= 0 ? 1 : pageNo - 1,
    };
    contentService.knowledgeCount(uri).then(count => {
        page.totalCount = count;
        page.totalPage = (count / pageSize) == 0 ? count / pageSize : Math.floor(count / pageSize) + 1;
        page.nextPage = (pageNo + 1) > page.totalPage ? page.totalPage : pageNo + 1;
        return contentService.knowledgePage(uri, pageNo, pageSize);
    }).then(result => {
        let data = result;
        if (data) {
            data.forEach(function (bean) {
                bean.createTime = new Date(bean.create_time).format('yyyy-MM-dd hh:mm:ss');
            })
        }
        res.locals.data = data;
        res.locals.page = page;
        res.render('front/knowledge', {title: 'Express'});
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    });

});
router.get('/about', function (req, res, next) {
    var data = {};
    contentService.getContentByChannel("/about/copdescription", 1,1).then(result => {
        if (result) {
            result = result[0];
            result.txt = new Buffer(result.txt).toString("base64");
        }
        res.render('front/about', {data: result});
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    })
});

router.post('/about', function (req, res, next) {
    let count = req.body.count || 1;
    let data = {};
    contentService.findContentByChannel("/about", 1,count).then(result => {
        if (result && result.length > 0) {
            result = result[0];
        }
        data = result;
        res.jsonp({code: CONSTANT.SUCCESS_CODE,data: data});
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    });
});


router.post('/knowledge', function (req, res, next) {
    let count = req.body.count || 8;
    contentService.findContentByChannel("/knowledge", 1,count).then(result => {
        res.jsonp({code: CONSTANT.SUCCESS_CODE,data: result});
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    });
});


router.get('/contact', function (req, res, next) {
    let uri = req.path;
    let data;
    contentService.getContentByChannel(uri, 1,1).then(result => {
        if (result && result.length > 0) {
            result = result[0];
        }
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


router.get('/content/detail/:id', function (req, res, next) {
    let id = req.params.id;
    if (!id) {
       return res.jsonp({code: CONSTANT.FAIL_CODE, msg: CONSTANT.ARGS_ERROR});
    }
    let data;
    contentService.getById(id).then(result => {
        data = result;
        return contentTxtService.getById(id);
    }).then(result => {
        data.txt = new Buffer(result.txt).toString('base64');
        res.render('front/detail', {data: data});
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code: CONSTANT.FAIL_CODE, msg: ex.message});
    });

});

router.get('/default', function (req, res) {
    res.render('default');
});


module.exports = router;
