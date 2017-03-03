/**
 * Created by zzy on 17/3/2.
 */
'use strict';

let config = {
    db : {
        host : '116.62.33.43',
        db   : 'njmj',
        user : 'root',
        pwd  : 'test1231'
    },
    WX_PUB_PAY: {
        UTL:'https://api.mch.weixin.qq.com/pay/unifiedorder',
        FORMAT:'yyyyMMddhhmmss',
        APPID:'wxc95cb7398a12d8e7',
        MCHID:'1410067902',
        CALLBACKURL:'http://sdk.api.bdgames.com/pay/wechatpaynotify',
        KEY:'0cd10a77b9ce597df877f14ad1712ebd',
        EXPIREDTIME:30,
        PUB_APPID: 'wxb010c351255a17ff',
        SECRET: 'a8d6bf1c145648a98fdbaebaba03c87d',
        CODE_URL: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=http://www.baidu.com?response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect',
        TOKEN_URL: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code',
        USER_URL: 'https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN'
    }
};

module.exports = config;