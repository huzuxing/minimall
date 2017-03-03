/**
 * Created by zzy on 17/3/1.
 */
'use strict';
const wxPay = require('../common/WxPay');
const service = require('../service');
const http = require('http');

let Test = {
    wxPayUnifiedOrder: function () {
        let params = {};
        params.total_fee = 5;
        params.spbill_create_ip = '139.196.112.30';
        params.trade_type = 'APP';
        params.body = '测试';
        params.out_trade_no = 0 + new Date().format('yyyyMMddhhmmssS') + '' + parseInt(100000 + (Math.random() * 999999));

        wxPay.wxPayUnifiedOrder(params).then(result => {
            if (!!result.err) {
                console.error(result.err);
            }
            else {
                console.log(result.data.prepay_id);
            }
        });
    },
    wxpaynotify: function () {
        let req = http.request({
            host: '10.0.0.55',
            port: 9000,
            path: '/pay/test',
            method: 'get'
        }, function (res) {
            console.log('Status : ' + res.statusCode);
            res.setEncoding('utf-8');
            res.on('data', function (chunk) {
                console.log('Body : ' + chunk);
            });
        });
        req.on('error', function (ex) {
            console.error("error : " + ex);
        });
        req.end();
    },
    getGoodsByCate : function (cate) {
        return service.goodsService.list({cate : cate});
    },
    code : function () {
        return wxPay.code('wxb010c351255a17ff');
    },
    //
    accessToken : function () {
        return wxPay.accessToken('wxb010c351255a17ff', 'a8d6bf1c145648a98fdbaebaba03c87d', 'feaffes9234dfevvmaseddw');
    },
    //根据unionid获取用户信息
    getUserByUnionId : function (unionId) {
        return service.userService.getUserByUnionId(unionId);
    },
    //
    saveOrder : function () {
        // 创建创建交易订单
        let bean = {};
        bean.total = 5;
        bean.userId = 12;
        bean.status = 0;// 已下单
        bean.createTime = new Date();
        bean.callback = 'testurl';
        let orderNum = 0 + new Date().format('yyyyMMddhhmmssS') + '' + parseInt(100000 + (Math.random() * 999999));
        bean.orderNum = orderNum;
        service.orderService.saveOrder(bean).then(result => {
            console.log(result);
        });
    },
    //
    saveChargeOrder : function() {

    }
};

module.exports = Test;