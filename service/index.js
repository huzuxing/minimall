/**
 * Created by zzy on 17/2/24.
 */
'use strict';

const adminUserService = require('./AdminUserService');
const moduleService = require('./ModuleService');
const channelService = require('./ChannelService');
const contentService = require('./ContentService');
const contentExtService = require('./ContentService');

module.exports.adminUserService = adminUserService;
module.exports.moduleService = moduleService;
module.exports.channelService = channelService;
module.exports.contentService = contentService;
module.exports.contentExtService = contentExtService;