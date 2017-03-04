'use strict';
let crypto = require('crypto');

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

module.exports.getRemoteIP = function (req) {
    if (!req) {
        return '';
    }
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

function getLogTime() {
    return new Date().format('yyyy-MM-dd hh:mm:ss:SSS');
}

function parseStatus() {
    var inputString = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        if (i % 2 != 0 && arguments[i] == inputString) {
            return arguments[i + 1];
        }
    }
    return '';
}

function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}
function randomStr(len) {
    var array = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    var str   = '';
    while (str.length < len) {
        var s = array[Math.round(Math.random() * 35)];
        if (Math.random() > 0.5) {
            s = s.toUpperCase();
        }
        str += s;
    }
    return str;
}
function dataUnit(originByte) {
    if (originByte < 1024) {
        return originByte + 'Byte';
    }
    else if (originByte >= 1024 && originByte < 1024000) {
        return (originByte / 1024).toFixed(2) + 'KB';
    }
    else if (originByte >= 1024000 && originByte < 1024000000) {
        return (originByte / 1024000).toFixed(2) + 'MB';
    }
    else {
        return originByte + 'Byte';
    }
}
//调用系统命令删除文件夹
function rmDir(path) {
    var config = require('../config');
    //防止误删,只删除特定文件夹下的内容
    if (path.substr(0, config.root.length) != config.root) {
        return;
    }
    var exec = require('child_process').exec, child;
    exec('rm -rf ' + path, function (err, out) {
        console.log(out);
        err && console.log(err);
    });
}

String.prototype.htmlDecode = function () {
    var str = this;
    var s   = "";
    if (str.length == 0) return "";
    s = str.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
};

module.exports.md5         = md5;
module.exports.parseStatus = parseStatus;
module.exports.getLogTime  = getLogTime;
module.exports.randomStr   = randomStr;
module.exports.dataUnit    = dataUnit;
module.exports.rmDir       = rmDir;


