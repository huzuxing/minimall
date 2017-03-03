/**
 * Created by zzy on 17/2/27.
 */
'use strict';
const express = require ('express');
const router    = express.Router();
const wxPay = require ('../common/WxPay');
const aliUtils = require ('../common/AliUtils');
const service = require ('../service');
const urlencode    = require('urlencode');
const test = require ('../test/Test');

/**
 * 请求支付
 */
router.post('/', function (req, res) {
    let data = req.body.data;
    let total = req.body.data.total;
    let cash = req.body.data.cash;
    let userId = req.body.data.userId;

    let callback = req.body.data.callback;

    let payway = req.body.data.payway || 0;

    let desc = req.body.data.desc;

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
    if (0 == payway) {
        let params = {};
        params.total_fee = cash;
        params.spbill_create_ip = (req.headers['x-forwarded-for']
        || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress);
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
                res.jsonp({code : 200, data : {ordeNum : orderNum, payInfo : returnInfo.data.prepay_id}});
            }
            else
                res.jsonp({code : 0});
        }).catch(ex => {
            console.error(ex);
            res.jsonp({code : 0, msg : ex.message});
        });
    }
    else if (1 == payway) {
        let payInfo ;
        // 先创建业务订单
        service.orderService.saveOrder(bean).then(result => {
            if (result) {
                let orderInfo = aliUtils.getOrderInfo(orderNum, data.subject, desc, cash);
                console.log('orderInfo:' + orderInfo);
                let sign = aliUtils.sign(orderInfo);
                payInfo  = orderInfo + '&sign="' + urlencode(sign) + '"&sign_type="RSA"';

                let entity = {};
                entity.payamount = cash;
                entity.userId = userId;
                entity.orderNum = orderNum;
                entity.cate = 0;
                entity.extorder = result.prepay_id;
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
                res.jsonp({code : 200, data : {ordeNum : orderNum, payInfo : result.prepay_id}});
            }
            else
                res.jsonp({code : 0});
        }).catch(ex => {
            console.error(ex);
            res.jsonp({code : 0, msg : ex.message});
        });
    }
    else {
        res.jsonp({code : 0, msg : '未知的支付方式'});
    }
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
                if (r.data.mch_id != config.payConfig.WX_SDK_PAY.MCHID) {
                    console.error('订单校验失败: ' + config.payConfig.WX_SDK_PAY.MCHID + ' != ' + r.data)
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

//公众号请求购买房卡
router.get('/pubpurchase', function () {
    
});

router.get('/test', function (req, res) {
    console.log('3333');
    test.wxpaynotify();
});


module.exports = router;