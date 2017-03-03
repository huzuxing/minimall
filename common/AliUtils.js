/**
 * Created by matri on 16/6/5.
 */
'use strict';
let crypto = require('crypto');
let fs = require('fs');
let urlencode = require('urlencode');
let https = require('https');
var iconv = require("iconv-lite");
var aliConfig = require('../../configs').payConfig.ALI_SDK_PAY;


let ALGORITHM = 'RSA';
let SIGN_ALGORITHMS = 'sha1WithRSAEncryption';
let DEFAULT_CHARSET = 'base64';

let privatePem = fs.readFileSync('alipay_rsa_private_key_pkcs8.pem');
let privateKey = privatePem.toString();
//var publicPem = fs.readFileSync('alipay_rsa_public_key.pem');

//支付宝消息验证地址
let Https_veryfy_url = "https://mapi.alipay.com/gateway.do?service=notify_verify&";


module.exports.PublicKey = aliConfig.publicKey;
/**
 * 签名
 * @param content
 * @returns {number|*}
 */
module.exports.sign = function (content) {
  /*var md5sum = crypto.createHash('md5');
   md5sum.update(content);
   var str = md5sum.digest('hex');
   return str;*/
  let sign = crypto.createSign(SIGN_ALGORITHMS);
  sign.update(content);

  return sign.sign(privateKey, DEFAULT_CHARSET);
};

module.exports.getOrderInfo = function (order, subject, body, price) {
  // 签约合作者身份ID
  let orderInfo = 'partner="' + aliConfig.partner + '"';

  // 签约卖家支付宝账号
  orderInfo += '&seller_id="' + aliConfig.seller_email + '"';

  // 商户网站唯一订单号
  orderInfo += '&out_trade_no="' + order + '"';

  // 商品名称
  orderInfo += '&subject="' + urlencode(subject) + '"';

  // 商品详情
  orderInfo += '&body="' + urlencode(body) + '"';

  // 商品金额
  orderInfo += '&total_fee="' + price + '"';

  // 服务器异步通知页面路径
  //orderInfo += '&notify_url="' + 'http://notify.msp.hk/notify.htm' + '"';
  orderInfo += '&notify_url="' + aliConfig.notifyurl + '"';

  // 服务接口名称， 固定值
  orderInfo += '&service="mobile.securitypay.pay"';

  // 支付类型， 固定值
  orderInfo += '&payment_type="1"';

  // 参数编码， 固定值
  orderInfo += '&_input_charset="utf-8"';

  // 设置未付款交易的超时时间
  // 默认30分钟，一旦超时，该笔交易就会自动被关闭。
  // 取值范围：1m～15d。
  // m-分钟，h-小时，d-天，1c-当天（无论交易何时创建，都在0点关闭）。
  // 该参数数值不接受小数点，如1.5h，可转换为90m。
  orderInfo += '&it_b_pay="30m"';

  // extern_token为经过快登授权获取到的alipay_open_id,带上此参数用户将使用授权的账户进行支付
  // orderInfo += '&extern_token="' + extern_token + '"';

  // 支付宝处理完请求后，当前页面跳转到商户指定页面的路径，可空
  orderInfo += '&return_url="m.alipay.com"';

  // 调用银行卡支付，需配置此参数，参与签名， 固定值 （需要签约《无线银行卡快捷支付》才能使用）
  // orderInfo += '&paymethod="expressGateway"';

  return orderInfo;
};

module.exports.linkData = function (data) {
  let result = '';
  if (typeof(data) != 'object') {
    console.warn(new Error('args 1 of data must object'));
    return result;
  }
  let keys = [];
  let len = 0;
  for (var key in data) {
    len++;
    //console.log(d);
    keys.push(key);
  }
  keys.sort();

  let str = '';
  for (var i = 0; i < keys.length; i++) {
    let k = keys[i].toLowerCase();
    if (k != 'sign' && k != 'sign_type' && data[k] != '' && data[k] != null) {
      str += k;
      str += '=';
      str += data[k] + '&'
    }
  }
  str = str.substr(0, str.length - 1);
  return str;
};

/**
 * 阿里校验充值通知
 * @param notifyId
 * @returns {Promise}
 */
module.exports.checkResponse = function (notifyId) {
  let veryfy_url = Https_veryfy_url + "partner=" + aliConfig.partner + "&notify_id=" + notifyId;
  //console.log('checkResponse:' + veryfy_url);

  return new Promise(function (resolve, reject) {
    https.get(veryfy_url, function (res) {
        let datas = [];
        let size = 0;
        res.on('data', function (data) {
          datas.push(data);
          size += data.length;
        });
        res.on('end', function () {
          var buff = Buffer.concat(datas, size);
          var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring
          resolve(result);
        });
      })
      .on("error", function (err) {
        console.error(err);
        reject(err);
      });
  });
};