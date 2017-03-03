'use strict';
var express = require('express');
var router = express.Router();
const wxPay = require('../common/WxPay');

const request = require('request');
let config = require('../config');
const APPID = config.WX_PUB_PAY.PUB_APPID;
const SECRET = config.WX_PUB_PAY.SECRET;
let user_url = config.WX_PUB_PAY.USER_URL;
const service = require('../service');


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
    res.render('index', {title: 'Express'});
});
//授权
router.get('/wxpub', function (req, res) {
    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=http://www.baidu.com?' +
        'response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect');
});
//认证
router.get('/oauth', function (req, res) {
    let userInfo ;
    let unionId = 'o3vWMxA560Fc_xcNddL8gXds_DaI';//o3vWMxA560Fc_xcNddL8gXds_DaI
    service.userService.getUserByUnionId(unionId).then(result => {
        if (result && result.id > 0) {
            userInfo = result;
            return service.goodsService.list({cate : 0});
        }
        else {
            return res.jsonp({code : 0, msg : '您尚未在游戏里面登录过!请登录游戏'});
        }
    }).then(result => {
        res.render('purchase/charge', {data : {user : userInfo, cards : result}});
    }).catch(ex => {
        console.error(ex);
        res.render('purchase/charge', {data : {}});
    });
    //let code =  req.query.code || '';
    //wxPay.accessToken(code).then(result => {
    //    if (result.error) {
    //        return res.jsonp({code : result.code, msg : result.error});
    //    }
    //    else {
    //        let unionId = result.data.unionid;//o3vWMxA560Fc_xcNddL8gXds_DaI
    //        return service.userService.getUserByUnionId(unionId);
    //    }
    //}).then(result => {
    //    if (result && result.id > 0) {
    //        return service.goodsService.getGoodsByCate(0);
    //    }
    //    else {
    //        return res.jsonp({code : 0, msg : '您尚未在游戏里面登录过!请登录游戏'});
    //    }
    //}).then(result => {
    //    res.render('charge', {data : result});
    //}).catch(ex => {
    //    console.error(ex);
    //    res.render('charge', {data : {}});
    //});
});

//充值/购买
router.post('/charge', function (req, res) {
    let data = JSON.parse(decodeURIComponent(req.body.data));
    let total = data.total;
    let cash = data.cash;
    let userId = data.userId;

    let callback = data.callback || '';

    let payway = data.payway || 0;

    let desc = data.desc;

    if (!cash || !total)
        res.jsonp({code: -1, msg: '充值金额必须大于0',data:{}});

    // 创建创建交易订单
    let bean = {};
    bean.total = total;
    bean.userId = userId;
    bean.status = 0;// 已下单
    bean.createTime = new Date();
    bean.callback = callback;
    let orderNum = payway + new Date().format('yyyyMMddhhmmssS') + '' + parseInt(100000 + (Math.random() * 999999));
    bean.orderNum = orderNum;

    let params = {};
    params.total_fee = cash;
    //params.spbill_create_ip = (req.headers['x-forwarded-for']
    //|| req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress);
    params.spbill_create_ip = '139.196.112.30';
    params.trade_type = 'APP';
    params.body = data.subject;
    params.out_trade_no = orderNum;

    //
    let returnInfo ;
    wxPay.wxPayUnifiedOrder(params).then(result => {
        returnInfo = result;
        if (!!result.err) {
            return res.jsonp({code: 0, msg: '请求支付异常',data:{}});
        }
        else {
            if ('SUCCESS' == result.return_code) {
                // 创建业务充值订单
                return service.orderService.saveOrder(bean);
            }
            else
                return res.jsonp({code: 0, msg: '支付失败'});
        }
    }).then(result => {
        if (result) {
            let entity = {};
            entity.payamount = cash;
            entity.userId = userId;
            entity.orderNum = orderNum;
            entity.cate = 0;
            entity.extorder = returnInfo.data.prepay_id;
            entity.status = 0;//待付款
            entity.payway = 0;// 微信付款
            entity.amount = total;
            entity.subject = data.subject;
            entity.description = desc;
            entity.createTime = new Date();
            entity.payTime = data.payTime || 0;
            // 创建交易充值订单
            return service.orderService.saveChargeOrder(entity);
        }
        else
            return null;
    }).then(result => {
        if (result) {
            res.jsonp({code : 200, ordeNum : orderNum, payInfo : returnInfo});
        }
        else
            res.jsonp({code : 0});
    }).catch(ex => {
        console.error(ex);
        res.jsonp({code : 0, msg : ex.message});
    });
});

/**
 * 微信流程处理完后的回调
 */
router.all('/wxpaynotify', function (req, res) {
    let orderNum ;
    let r;
    let SUCCESS = {
            return_code: {isHide: true, value: 'SUCCESS'},
            return_msg : {isHide: true, value: 'OK'}
        },
        FAIL    = {
            return_code: {isHide: true, value: 'FAIL'},
            return_msg : {isHide: true, value: '签名失败'}
        };
    wxPay.pipe(req).then(function (result) {
        if (result) {
            let xmlData = result.toString('utf-8');
            return wxPay.payCallback(xmlData);
        }
        else {
            return res.send(wxPay.json2xml(FAIL));
        }
    }).then(result => {
        if(result && result.code == 1 && !result.error) {
            orderNum = result.data.out_trade_no;
            r = result;
            return service.orderService.getOrderByOrderNum(orderNum);
        }
        else {
            console.error('微信回调参数解析错误' + result.error);
            return res.send(wxPay.json2xml(FAIL));
        }
    }).then(result => {
        if (result && result.id > 0) {
            if (result.status != 0) {
                if (r.data.mch_id != config.WX_PUB_PAY.MCHID) {
                    console.error('订单校验失败: ' + config.WX_PUB_PAY.MCHID + ' != ' + r.data);
                    Promise.reject();
                }
                else {
                    result.status = 1;//已付款
                    return service.orderService.updateOrder(result);
                }
            }
            else {
                console.log('该订单已经处理: ' + orderNum);
                return res.send(wxPay.json2xml(SUCCESS));
            }
        }
        else
            Promise.reject('找不到订单:' + orderNum);
    }).then(result => {
        if (result && result == 1) {
            result.status = 1;// 已付款
            result.payTime = new Date();
            return service.orderService.updateChargeOrder(result);
        }
        else
            Promise.reject('处理业务订单失败: ' + orderNum);
    }).then(result => {
        if (result && result == 1)
            res.send(wxPay.json2xml(SUCCESS));
        else
            Promise.reject('处理充值订单失败: ' + orderNum);
    }).catch(ex => {
        console.error(ex);
        res.send(wxPay.json2xml(FAIL));
    });
});

//查询充值记录
router.get('/record', function (req, res) {
    let pageNo = req.query.pageNo || 1;
    let pageSize = req.query.pageSize || 10;
    let bean = {
        pageNo : pageNo,
        pageSize : pageSize
    };

    service.orderService.listChargeOrder(bean).then(result => {
        let page = {
            pageNo : pageNo,
            pageSize: pageSize
        };
        result.forEach(function (bean) {
            bean.payTime = new Date(bean.payTime).format('yyyy-MM-dd hh:mm:ss');
        });
        res.render('purchase/record', {page : page, data : result});
    }).catch(ex => {
        console.error(ex);
        res.render('purchase/record', {page : page, data : {}});
    });
});

module.exports = router;
