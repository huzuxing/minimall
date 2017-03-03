/**
 * Created by zzy on 17/2/28.
 */
'use strict';
let config = require('../config');
let crypto = require('crypto');
let request = require('request');
let xml2js = require('xml2js');
const APPID = config.WX_PUB_PAY.PUB_APPID;
const SECRET = config.WX_PUB_PAY.SECRET;
let user_url = config.WX_PUB_PAY.USER_URL;

let WxPay = {
        // 参数处理
        handleParams: function (params) {
            params.appid = config.WX_PUB_PAY.APPID;
            params.mch_id = config.WX_PUB_PAY.MCHID;
            params.notify_url = config.WX_PUB_PAY.CALLBACKURL;
            params.nonce_str = params.nonce_str || this.createNonceStr();
            params.time_start = this.handleTime().begin;
            params.time_expire = this.handleTime().end;
            return params;
        },
        // 生成随机字符串,要求不能多于32位
        createNonceStr: function () {
            return Math.random().toString(36).substring(2, 5);
        },
        /**
         * 生成签名:MD5加密
         * 规则如下:
         * 参数名ASCII码从小到大排序（字典序）；
         * 如果参数的值为空不参与签名；
         * 参数名区分大小写；
         * 验证调用返回或微信主动通知签名时，传送的sign参数不参与签名，将生成的签名与该sign值作校验。
         * 微信接口可能增加字段，验证签名时必须支持增加的扩展字段
         * 字符转换为大写
         * @param params
         */
        sign: function (params, alg) {
            alg = alg || 'md5';
            params = this.handleParams(params);
            let keys = Object.keys(params);
            keys = keys.sort();
            let newArgs = {};
            keys.forEach(function (key) {
                newArgs[key.toLowerCase()] = params[key];
            });

            let string = '';
            for (var k in newArgs) {
                string += '&' + k + '=' + newArgs[k];
            }
            string = string.substr(1);
            string += '&key=' + config.WX_PUB_PAY.KEY;
            console.log(string);
            newArgs.sign = crypto.createHash(alg).update(string, 'utf-8').digest('hex').toUpperCase();
            return newArgs;
        },
        // 设置有效时间
        handleTime: function () {
            let time = new Date();
            time.setMinutes(time.getMinutes() + config.WX_PUB_PAY.EXPIREDTIME, time.getMilliseconds(), 0);
            let result = {
                begin: new Date().format(config.WX_PUB_PAY.FORMAT),
                end: time.format(config.WX_PUB_PAY.FORMAT)
            };
            return result;
        },
        /**
         * 字典转换成XML
         * @param jsonData
         * @returns {string}
         */
        json2xml: function (jsonData) {
            var keys = Object.keys(jsonData);
            var xml = '<xml>';
            keys.forEach(function (key) {
                xml += '<' + key + '>'
                if (typeof jsonData[key] == 'object' && jsonData[key].isHide) {
                    xml += '<![CDATA[' + jsonData[key].value + ']]>';
                }
                else {
                    xml += jsonData[key];
                }
                xml += '</' + key + '>'
            });
            xml += "</xml>";
            return xml;
        },
        // 调用微信统一下单接口
        wxPayUnifiedOrder: function (params) {
            let $this = this;
            return new Promise(function (resolve, reject) {
                let sign = $this.sign(params, 'md5');
                request({
                    url: config.WX_PUB_PAY.UTL,
                    method: 'POST',
                    body: $this.json2xml(sign)
                }, function (err, response, body) {
                    if (!err && response.statusCode == 200) {
                        let parser = new xml2js.Parser({trim: true, explicitArray: false, explicitRoot: false});
                        parser.parseString(body, function (error, result) {
                            if (!error && 'FAIL' != result.return_code) {
                                let nonStr = result.nonce_str;
                                let prepay_id = result.prepay_id;
                                let sign = result.sign;
                                let args = {
                                    nonce_str: nonStr,
                                    prepay_id: prepay_id
                                };
                                let paySign = $this.sign(args);
                                let returnInfo = {
                                    appId: result.appid,
                                    nonceStr: nonStr,
                                    paySign: paySign,
                                    package: sign,
                                    sigeAlg: 'md5',
                                    prepay_id: prepay_id
                                };
                                resolve({err: null, data: returnInfo, return_code : result.return_code, return_msg : result.return_msg});
                            }
                            resolve({err: error, data: result});
                        });
                    }
                    else {
                        resolve({err: err.message, data: {}});
                    }
                });
            });
        },
        // 以流的方式处理支付回调xml数据
        pipe: function (stream) {
            let $stream = stream;
            return new Promise(function (resolve, reject) {
                let buffers = [];
                $stream.on('data', function (chunk) {
                    console.log('chunk : ' + chunk);
                    buffers.push(chunk);
                });
                $stream.on('end', function () {
                    resolve(Buffer.concat(buffers))
                });
                $stream.on('error', function () {
                    resolve(null);
                });
            });
        },
        // 回调处理
        payCallback: function (xmlParams) {
            let $this = this;
            return new Promise(function (resolve, reject) {
                let parser = new xml2js.Parser({trim: true, explicitArray: false, explicitRoot: false});
                parser.parseString(xmlParams, function (error, resultData) {
                    if (error || !resultData) {
                        let result = {
                            return_code: {isHide: true, value: 'FAIL'},
                            return_msg: {isHide: true, value: '参数格式校验错误'}
                        };
                        resolve({error: error, code: -99, body: $this.json2xml(result)});
                    }
                    else {
                        let wxSign = resultData.sign;
                        delete resultData.sign;
                        let sign = $this.sign(resultData);
                        if (wxSign == sign) {
                            let result = {
                                return_code: {isHide: true, value: 'SUCCESS'},
                                return_msg: {isHide: true, value: 'OK'}
                            };
                            resolve({code: 1, data: resultData, body: $this.json2xml(result)});
                        }
                        else {
                            let result = {
                                return_code: {isHide: true, value: 'FAIL'},
                                return_msg: {isHide: true, value: '签名失败'}
                            };
                            resolve({code: 0, data: resultData, body: $this.json2xml(result)});
                        }
                    }
                });
            });
        },
        // 参数校验
        validateParams: function (param) {

        },
        //获取code
        code : function (appId) {
            return new Promise(function (resolve, reject) {
                    let $appId = appId || APPID;
                    let code_url = config.WX_PUB_PAY.CODE_URL;
                    code_url = code_url.replace('APPID', $appId);
                    request({
                            url: code_url,
                            method: 'GET'
                        },
                        function (error, response, result) {
                            result = JSON.parse(result);
                            if (error)
                                resolve({code : 0, error: error.message, data: {}});
                            else if (!error && result.errcode) {
                                resolve({code : result.errcode, error: result.errmsg, data: {}});
                            }
                            else
                                resolve({error: null, data: result});

                        });
                }
            );
        },
        // 通过code获取access_token信息
        accessToken: function (appId, secret, code) {
            return new Promise(function (resolve, reject) {
                    let $appId = appId || APPID;
                    let $secret = secret || SECRET;
                    let token_url = config.WX_PUB_PAY.TOKEN_URL;
                    token_url = token_url.replace('APPID', $appId).replace('SECRET', $secret).replace('CODE', code);
                    request({
                            url: token_url,
                            method: 'GET'
                        },
                        function (error, response, result) {
                            result = JSON.parse(result);
                            if (error)
                                resolve({code : 0, error: error.message, data: {}});
                            else if (!error && result.errcode) {
                                resolve({code : result.errcode, error: result.errmsg, data: {}});
                            }
                            else
                                resolve({error: null, data: result});

                        });
                }
            );
        }
    }
    ;

module.exports = WxPay;