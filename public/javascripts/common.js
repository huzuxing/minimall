/*
 * @Author: anchen
 * @Date:   2017-03-02 14:22:40
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-03-03 10:43:15
 */

'use strict';

$(function () {
    let appId;
    let timeStamp;
    let nonceStr;
    let packageInfo;
    let signType;
    let paySign;
    //发放房卡
    $(".card").find("a").append("<em></em>");
    $(".card").find("a:gt(0)").find("em").hide();
    $(".card").find("a").click(function () {
        let rmb = $(this).data('rmb');
        $('#showRmb').find('em').text(rmb + '元');
        $(this).addClass("card-selected").siblings().removeClass("card-selected");
        $(this).find("em").show().parent().siblings().find("em").hide();
    });


    //确认支付
    $('.send-card').click(function () {
        let rmb = $('.card').find('.card-selected').data('rmb');
        let amount = $('.card').find('.card-selected').data('amount');
        let userId = $('input[name=userId]').val();
        let data = {
            cash: rmb,
            total: amount,
            userId: userId,
            desc: '公众号充值',
            subject: '购买房卡'
        };
        $.ajax({
            url: '/charge',
            type: 'POST',
            dataType: 'JSON',
            data: {
                data: encodeURIComponent(JSON.stringify(data))
            },
            beforeSend: function () {
                $(this).attr('disabled', 'disabled');
            },
            success: function (result) {
                alert(JSON.stringify(result));
                if (200 == result.code) {
                    appId = result.payInfo.appId;
                    timeStamp = result.payInfo.timeStamp;
                    nonceStr = result.payInfo.nonceStr;
                    packageInfo = 'prepay_id=' + result.payInfo.package;
                    signType = result.payInfo.signType;
                    paySign = result.payInfo.paySign;
                    callPay();
                    onBridgeReady();
                }
            },
            error: function () {
                alert('支付失败!');
            },
            complete: function () {
                $(this).removeAttr('disabled');
            }
        });
    });
    function onBridgeReady() {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": appId,     //公众号名称，由商户传入
                "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr": nonceStr, //随机串
                "package": packageInfo,
                "signType": signType,         //微信签名方式：
                "paySign": paySign //微信签名
            },
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request：ok") {
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                else if(res.err_msg == "get_brand_wcpay_request：cancel") {
                    alert('取消支付');
                }
            }
        );
    }

    function callPay() {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    }
});

