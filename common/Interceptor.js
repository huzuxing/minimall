'use strict';
const ADMIN_URL_BEGIN = '/admin';
const ADMIN_URL_LOGIN = '/admin/user/login';
const CONSTANT = require('./Constant');
module.exports = {
    intercept: function (req, res, next) {
        let originUrl = req.originalUrl;
        if (ADMIN_URL_LOGIN == originUrl) {
            next();
            return;
        }
        if (!originUrl.startsWith(ADMIN_URL_BEGIN)) {
            next();
            return;
        }
        let admin = req.session.admin;
        if (!admin || !admin.id) {
            return res.redirect(ADMIN_URL_LOGIN);
        }
        // 超级管理员
        if (admin && admin.isSuper == 1) {
            next();
            return;
        }
        return res.jsonp({code : CONSTANT.FAIL_CODE, msg : CONSTANT.COMMON_MSG});
    }
};
