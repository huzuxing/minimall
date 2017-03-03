/**
 * Created by zzy on 17/2/24.
 */
'use strict';
let taskService = require('./TaskService');

let goodsService = require('./GoodsService');

let orderService = require('./OrderService');

let userService = require('./UserService');


module.exports.taskService = taskService;
module.exports.goodsService = goodsService;
module.exports.orderService = orderService;
module.exports.userService = userService;