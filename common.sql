/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Version : 50716
 Source Host           : localhost
 Source Database       : common

 Target Server Version : 50716
 File Encoding         : utf-8

 Date: 03/23/2017 18:07:48 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `admin_user`
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(64) NOT NULL COMMENT '登录账号',
  `username` varchar(64) NOT NULL COMMENT '姓名',
  `password` varchar(64) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `last_login_time` datetime NOT NULL,
  `login_count` int(11) NOT NULL DEFAULT '0',
  `group_id` int(11) NOT NULL DEFAULT '0' COMMENT '所属组ID',
  `is_super` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否是超级管理员',
  `email` varchar(125) NOT NULL DEFAULT '',
  `is_disabled` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否禁用，0-否，1-是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `admin_user`
-- ----------------------------
BEGIN;
INSERT INTO `admin_user` VALUES ('1', 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', '13808221061', '2017-03-21 10:12:14', '2017-03-21 10:12:33', '0', '0', '1', '', '0');
COMMIT;

-- ----------------------------
--  Table structure for `group`
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(64) NOT NULL,
  `create_time` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='组表';

-- ----------------------------
--  Table structure for `group_permission`
-- ----------------------------
DROP TABLE IF EXISTS `group_permission`;
CREATE TABLE `group_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL DEFAULT '0',
  `permission_id` int(11) NOT NULL DEFAULT '0',
  `permission_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '权限类型，0-可访问，1-可授权',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `group_role`
-- ----------------------------
DROP TABLE IF EXISTS `group_role`;
CREATE TABLE `group_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL DEFAULT '0',
  `role_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `module`
-- ----------------------------
DROP TABLE IF EXISTS `module`;
CREATE TABLE `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `en_name` varchar(50) NOT NULL DEFAULT '',
  `zh_name` varchar(50) NOT NULL DEFAULT '',
  `icon` varchar(50) NOT NULL DEFAULT '',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '菜单链接',
  `target` varchar(10) NOT NULL DEFAULT '' COMMENT 'html标签 target属性',
  `is_menu` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否是菜单 0-是，1-不是',
  `allow_expand` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否允许展开，0-不，1-允许',
  `is_publish` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否发布，0-是，1-不是',
  `allow_edit` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否允许编辑，0-是，1-不是',
  `allow_delete` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否允许删除，0-是，1-不',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `delete_mark` tinyint(4) NOT NULL DEFAULT '0',
  `enable_mark` tinyint(4) NOT NULL DEFAULT '1',
  `description` varchar(255) NOT NULL DEFAULT '',
  `create_time` datetime NOT NULL,
  `create_user_id` int(11) NOT NULL COMMENT '创建此菜单的用户ID',
  `create_username` varchar(125) NOT NULL COMMENT '创建此菜单的用户名',
  `update_time` datetime NOT NULL,
  `update_user_id` int(11) NOT NULL DEFAULT '0' COMMENT '更新此菜单的用户ID',
  `update_username` varchar(125) NOT NULL DEFAULT '' COMMENT '更新此菜单的用户名',
  `is_display` tinyint(4) DEFAULT NULL COMMENT '是否显示，0-是，1-否',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
--  Records of `module`
-- ----------------------------
BEGIN;
INSERT INTO `module` VALUES ('1', '0', 'SysManage', '系统管理', 'fa fa-desktop', 'javascript:;', 'expand', '0', '1', '0', '0', '0', '0', '0', '1', '', '2017-03-21 15:11:45', '1', 'admin', '2017-03-21 15:12:08', '1', 'admin', '0'), ('2', '1', 'MenuManage', '菜单管理', 'fa fa-folder', '/admin/menu/manage', 'main', '0', '1', '0', '0', '0', '0', '0', '1', '', '2017-03-21 15:11:45', '1', 'admin', '2017-03-21 15:12:08', '1', 'admin', '0'), ('6', '0', 'account', '账号管理', 'fa fa-folder', 'javascript:;', 'expand', '0', '1', '0', '0', '0', '0', '0', '1', '', '2017-03-23 11:12:54', '1', 'admin', '2017-03-23 16:51:15', '1', 'admin', '0');
COMMIT;

-- ----------------------------
--  Table structure for `permission`
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父ID',
  `name` varchar(64) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父ID',
  `name` varchar(64) NOT NULL,
  `create_time` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL COMMENT '角色描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `role_permission`
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) NOT NULL DEFAULT '0',
  `permission_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '权限类型，0-可访问，1-可授权',
  `role_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user_group`
-- ----------------------------
DROP TABLE IF EXISTS `user_group`;
CREATE TABLE `user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `group_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user_permission`
-- ----------------------------
DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE `user_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `permission_id` int(11) NOT NULL DEFAULT '0',
  `permission_type` tinyint(4) DEFAULT '0' COMMENT '权限类型：0-可访问，1-可授权',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
