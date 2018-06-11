/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : common

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-06-11 18:01:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(64) NOT NULL COMMENT '登录账号',
  `username` varchar(64) NOT NULL COMMENT '姓名',
  `password` varchar(64) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `login_time` datetime NOT NULL,
  `last_login_time` datetime NOT NULL,
  `login_count` int(11) NOT NULL DEFAULT '0',
  `group_id` int(11) NOT NULL DEFAULT '0' COMMENT '所属组ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_user
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_admin_user
-- ----------------------------
DROP TABLE IF EXISTS `cyc_admin_user`;
CREATE TABLE `cyc_admin_user` (
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
-- Records of cyc_admin_user
-- ----------------------------
INSERT INTO `cyc_admin_user` VALUES ('1', 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', '13808221061', '2017-03-21 10:12:14', '2017-03-21 10:12:33', '0', '0', '1', '', '0');

-- ----------------------------
-- Table structure for cyc_channel
-- ----------------------------
DROP TABLE IF EXISTS `cyc_channel`;
CREATE TABLE `cyc_channel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL COMMENT '栏目名称',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父级栏目',
  `channel_path` varchar(30) DEFAULT NULL COMMENT '栏目访问路径',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_channel
-- ----------------------------
INSERT INTO `cyc_channel` VALUES ('3', '关于我们', '0', '/about', '2', '2018-06-07 16:39:36');
INSERT INTO `cyc_channel` VALUES ('4', '公司简介', '0', '/about/copdescription', '3', '2018-06-07 16:40:09');
INSERT INTO `cyc_channel` VALUES ('5', '产品服务', '0', '/proservice', '5', '2018-06-07 16:40:49');
INSERT INTO `cyc_channel` VALUES ('6', '室内空气检测', '0', '/service/roomaircheck', '6', '2018-06-07 16:41:44');
INSERT INTO `cyc_channel` VALUES ('7', '室内空气治理', '0', '/service/roomairhandle', '4', '2018-06-07 16:42:30');
INSERT INTO `cyc_channel` VALUES ('8', '客户案例', '0', '/case', '22', '2018-06-07 16:43:27');
INSERT INTO `cyc_channel` VALUES ('9', '政府国企', '0', '/case/gov', '3', '2018-06-07 16:44:15');
INSERT INTO `cyc_channel` VALUES ('10', '家庭客户', '0', '/case/family', '33', '2018-06-07 16:44:35');
INSERT INTO `cyc_channel` VALUES ('11', '汽车案例', '0', '/case/car', '3', '2018-06-07 16:45:02');
INSERT INTO `cyc_channel` VALUES ('12', '其他机构', '0', '/case/other', '3', '2018-06-07 16:45:28');
INSERT INTO `cyc_channel` VALUES ('13', '科普知识', '0', '/knowledge', '6', '2018-06-07 16:51:40');
INSERT INTO `cyc_channel` VALUES ('14', '联系我们', '0', '/contact', '8', '2018-06-07 16:52:06');
INSERT INTO `cyc_channel` VALUES ('15', '首页', '0', '/index', '1', '2018-06-07 18:23:11');
INSERT INTO `cyc_channel` VALUES ('16', 'banner', '0', '/banner', '21', '2018-06-11 15:38:29');
INSERT INTO `cyc_channel` VALUES ('17', '品牌故事', '0', '/about/brandstory', '55', '2018-06-11 16:38:31');
INSERT INTO `cyc_channel` VALUES ('18', '品牌资质', '0', '/about/brandaptitude', '54', '2018-06-11 16:39:14');

-- ----------------------------
-- Table structure for cyc_content
-- ----------------------------
DROP TABLE IF EXISTS `cyc_content`;
CREATE TABLE `cyc_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) DEFAULT NULL COMMENT '标题',
  `short_title` varchar(150) DEFAULT NULL COMMENT '简短标题',
  `author` varchar(100) DEFAULT NULL COMMENT '作者',
  `origin` varchar(100) DEFAULT NULL COMMENT '来源',
  `origin_url` varchar(255) DEFAULT NULL COMMENT '来源链接',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `publish_time` datetime DEFAULT NULL COMMENT '发布日期',
  `link` varchar(255) DEFAULT NULL COMMENT '外部链接',
  `is_publish` tinyint(4) DEFAULT '0' COMMENT '是否发布，0-是，1-否',
  `create_time` datetime NOT NULL,
  `update_time` datetime DEFAULT NULL,
  `channel_id` int(11) NOT NULL COMMENT '栏目ID',
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_content
-- ----------------------------
INSERT INTO `cyc_content` VALUES ('32', '联系我们', '联系我们', '联系我们', '联系我们', null, '联系我们', null, '联系我们', '0', '2018-06-10 22:38:41', '2018-06-10 23:01:10', '14', '');
INSERT INTO `cyc_content` VALUES ('33', '滨江合成380户业主滨江合成380户业主', ' 滨江合成380户业主滨江合成380户业主', ' 滨江合成380户业主滨江合成380户业主', ' 滨江合成380户业主滨江合成380户业主', null, '浙大冰虫依托于浙江大学实验室科研力量，由来自浙大环境与资源学院、医学院、公共卫生学院以及中科院 日本理化学研究院和意大利维罗纳大学的多位博士和硕士支持创办。公司致力于室内空气检测、室内空气污染治理及空气净化产品的研发、 生产和销售。自成立以来，冰虫已为全国4500多家企事业单位及36000多户家庭提供了室内空气检测及治理服务， 其中包括杭州G20峰会、“一带一路”标志性建筑-敦煌文博会馆、宁夏银川中国-阿拉伯国家博览会、乌镇世界互联网大会、 世界工业设计大会等重大国家工程项目。目前，浙大冰虫在整个行业内拥', null, ' 滨江合成380户业主滨江合成380户业主', '0', '2018-06-11 10:40:15', '2018-06-11 15:34:07', '13', '\\upload\\73b0ba49b76d5a2d916b3c81db8553dd.jpg');
INSERT INTO `cyc_content` VALUES ('34', '滨江合成380户业主滨江合成380户业主', '滨江合成380户业主滨江合成380户业主', '业主', '', null, '浙大冰虫依托于浙江大学实验室科研力量，由来自浙大环境与资源学院、医学院、公共卫生学院以及中科院 日本理化学研究院和意大利维罗纳大学的多位博士和硕士支持创办。公司致力于室内空气检测、室内空气污染治理及空气净化产品的研发、 生产和销售。自成立以来，冰虫已为全国4500多家企事业单位及36000多户家庭提供了室内空气检测及治理服务， 其中包括杭州G20峰会、“一带一路”标志性建筑-敦煌文博会馆、宁夏银川中国-阿拉伯国家博览会、乌镇世界互联网大会、 世界工业设计大会等重大国家工程项目。目前，浙大冰虫在整个行业内拥', null, '业主', '0', '2018-06-11 10:42:33', '2018-06-11 15:33:54', '13', '\\upload\\a1a6fdcdac05b72a56ddd3250b8c884c.png');
INSERT INTO `cyc_content` VALUES ('35', '  滨江合成380户业主滨江合成38', '  滨江合成380户业主滨江合成38', '浙大冰', '浙大冰', null, '浙大冰虫依托于浙江大学实验室科研力量，由来自浙大环境与资源学院、医学院、公共卫生学院以及中科院 日本理化学研究院和意大利维罗纳大学的多位博士和硕士支持创办。公司致力于室内空气检测、室内空气污染治理及空气净化产品的研发、 生产和销售。自成立以来，冰虫已为全国4500多家企事业单位及36000多户家庭提供了室内空气检测及治理服务， 其中包括杭州G20峰会、“一带一路”标志性建筑-敦煌文博会馆、宁夏银川中国-阿拉伯国家博览会、乌镇世界互联网大会、 世界工业设计大会等重大国家工程项目。目前，浙大冰虫在整个行业内拥', null, '浙大冰', '0', '2018-06-11 10:43:26', '2018-06-11 17:47:44', '13', '');
INSERT INTO `cyc_content` VALUES ('37', 'banner1', 'banner1', 'banner1', 'banner1', null, 'banner1', null, 'banner1', '0', '2018-06-11 15:54:27', null, '16', '\\upload\\0f243864415d2e39d8b818fc7e65306f.jpg');
INSERT INTO `cyc_content` VALUES ('39', 'banner2', 'banner2', 'banner2', '', null, 'banner2', null, '', '0', '2018-06-11 15:54:52', null, '16', '\\upload\\6d2855ffe789d67fe8fa1710dd28068a.jpg');
INSERT INTO `cyc_content` VALUES ('40', 'banner3', 'banner2', 'banner2', '', null, 'banner2', null, '', '0', '2018-06-11 15:55:18', null, '16', '\\upload\\f92773cc7fe7bbe9a4fbcb39aca2440a.jpg');
INSERT INTO `cyc_content` VALUES ('41', 'ca', 'ca', 'a', 'fe', null, 'ca', null, 'fe', '0', '2018-06-11 16:27:56', null, '9', '\\upload\\4f215cfad89c2bbf61cbd2cb30029d0f.jpg');
INSERT INTO `cyc_content` VALUES ('42', 'afeffff', 'afe', 'af', 's', null, 'fe', null, 'af', '0', '2018-06-11 16:31:06', null, '10', '\\upload\\d7b3153add984bc8cfb0222593b5898a.jpg');
INSERT INTO `cyc_content` VALUES ('43', '空气检测', '空气检测', '空气检测', '空气检测', null, '空气检测', null, '空气检测', '0', '2018-06-11 16:33:59', null, '6', '\\upload\\5a0d0d3e3753f0bf37f373b74ff84468.jpg');
INSERT INTO `cyc_content` VALUES ('44', '公司简介', 'a', 'a', 'a', null, 'a', null, 'a', '0', '2018-06-11 17:21:45', null, '4', '');

-- ----------------------------
-- Table structure for cyc_contenttag
-- ----------------------------
DROP TABLE IF EXISTS `cyc_contenttag`;
CREATE TABLE `cyc_contenttag` (
  `content_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `ref_counter` int(11) NOT NULL DEFAULT '1' COMMENT '被引用的次数'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_contenttag
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_content_ext
-- ----------------------------
DROP TABLE IF EXISTS `cyc_content_ext`;
CREATE TABLE `cyc_content_ext` (
  `content_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL DEFAULT '0' COMMENT '属性ID',
  `sort_date` datetime NOT NULL COMMENT '排序日期',
  `top_level` tinyint(4) NOT NULL DEFAULT '0' COMMENT '固顶级别',
  `is_recommend` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否推荐，0-否，1-是',
  `status` tinyint(4) NOT NULL DEFAULT '2' COMMENT '状态，0-草稿，1-审核中，2-审核通过，3-回收站，4-投稿，5-归档',
  `views_day` int(11) NOT NULL DEFAULT '0' COMMENT '日访问数',
  `comments_day` smallint(6) NOT NULL DEFAULT '0' COMMENT '日评论数',
  `downloads_day` smallint(6) NOT NULL DEFAULT '0' COMMENT '日下载数',
  `ups_day` smallint(6) NOT NULL DEFAULT '0' COMMENT '日顶数',
  `score` int(11) NOT NULL DEFAULT '0' COMMENT '得分',
  `recommend_level` tinyint(4) NOT NULL DEFAULT '0' COMMENT '推荐级别',
  KEY `is_recommend` (`is_recommend`),
  KEY `recommend_level` (`recommend_level`),
  KEY `sort_date` (`sort_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_content_ext
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_content_tag
-- ----------------------------
DROP TABLE IF EXISTS `cyc_content_tag`;
CREATE TABLE `cyc_content_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL COMMENT '标签名',
  `ref_counter` int(11) NOT NULL DEFAULT '1' COMMENT '被引用的次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_content_tag
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_content_txt
-- ----------------------------
DROP TABLE IF EXISTS `cyc_content_txt`;
CREATE TABLE `cyc_content_txt` (
  `content_id` int(11) NOT NULL,
  `txt` longtext COMMENT '内容',
  UNIQUE KEY `content_id` (`content_id`),
  KEY `content_id_2` (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_content_txt
-- ----------------------------
INSERT INTO `cyc_content_txt` VALUES ('13', '<p>sss</p>');
INSERT INTO `cyc_content_txt` VALUES ('17', '<p>asdfefe</p>');
INSERT INTO `cyc_content_txt` VALUES ('18', '<p>adfefs</p>');
INSERT INTO `cyc_content_txt` VALUES ('19', '<p>fef</p>');
INSERT INTO `cyc_content_txt` VALUES ('20', '<p>afefef</p>');
INSERT INTO `cyc_content_txt` VALUES ('21', '<p><span style=\"color: rgb(255, 0, 0);\">afefe2018-06-08</span></p>');
INSERT INTO `cyc_content_txt` VALUES ('22', '<p>vdvd</p>');
INSERT INTO `cyc_content_txt` VALUES ('32', '<p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; font-family: 微软雅黑, 宋体, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); font-size: 18px; color: rgb(51, 51, 51); font-weight: bold;\">全国服务咨询热线</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; font-family: 微软雅黑, 宋体, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); color: rgb(136, 136, 136);\">4007-800-668　 135-8846-1199</p><p><br/></p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; font-family: 微软雅黑, 宋体, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); font-size: 18px; color: rgb(51, 51, 51); font-weight: bold;\">全国招商加盟热线</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; font-family: 微软雅黑, 宋体, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); color: rgb(136, 136, 136);\">400-900-7079</p><p><br/></p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; font-family: 微软雅黑, 宋体, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); font-size: 18px; color: rgb(51, 51, 51); font-weight: bold;\">渠道合作热线（杭州）</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; font-family: 微软雅黑, 宋体, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); color: rgb(136, 136, 136);\">156-6993-3107</p><p><br/></p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; font-family: 微软雅黑, 宋体, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); font-size: 18px; color: rgb(51, 51, 51); font-weight: bold;\">渠道合作热线（上海）</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; font-family: 微软雅黑, 宋体, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); color: rgb(136, 136, 136);\">135-1687-8984</p><p><br/></p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; font-family: 微软雅黑, 宋体, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); font-size: 18px; color: rgb(51, 51, 51); font-weight: bold;\">公司地址</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; font-family: 微软雅黑, 宋体, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); color: rgb(136, 136, 136);\">浙江省杭州市滨江区建业路511号浙大科技园华创大厦裙房4F</p><p><br/></p><p><br/></p><p><img width=\"740\" height=\"357\" src=\"http://api.map.baidu.com/staticimage?center=104.077982,30.550265&zoom=18&width=530&height=340&markers=104.083812,30.577544\"/></p><p><br/></p>');
INSERT INTO `cyc_content_txt` VALUES ('33', '<p><span style=\"color: rgb(51, 51, 51); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\">浙大冰虫依托于浙江大学实验室科研力量，由来自浙大环境与资源学院、医学院、公共卫生学院以及中科院 日本理化学研究院和意大利维罗纳大学的多位博士和硕士支持创办。公司致力于室内空气检测、室内空气污染治理及空气净化产品的研发、 生产和销售。自成立以来，冰虫已为全国4500多家企事业单位及36000多户家庭提供了室内空气检测及治理服务， 其中包括杭州G20峰会、“一带一路”标志性建筑-敦煌文博会馆、宁夏银川中国-阿拉伯国家博览会、乌镇世界互联网大会、 世界工业设计大会等重大国家工程项目。目前，浙大冰虫在整个行业内拥</span></p><p><br/></p>');
INSERT INTO `cyc_content_txt` VALUES ('34', '<p>浙大冰虫依托于浙江大学实验室科研力量，由来自浙大环境与资源学院、医学院、公共卫生学院以及中科院 日本理化学研究院和意大利维罗纳大学的多位博士和硕士支持创办。公司致力于室内空气检测、室内空气污染治理及空气净化产品的研发、 生产和销售。自成立以来，冰虫已为全国4500多家企事业单位及36000多户家庭提供了室内空气检测及治理服务， 其中包括杭州G20峰会、“一带一路”标志性建筑-敦煌文博会馆、宁夏银川中国-阿拉伯国家博览会、乌镇世界互联网大会、 世界工业设计大会等重大国家工程项目。目前，浙大冰虫在整个行业内拥</p><p><br/></p>');
INSERT INTO `cyc_content_txt` VALUES ('35', '<p style=\"margin-top: 10px; margin-bottom: 10px;\"><span style=\"color: rgb(51, 51, 51); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\">&nbsp;&nbsp;&nbsp;&nbsp;浙大冰虫依托于浙江大学实验室科研力量，由来自浙大环境与资源学院、医学院、公共卫生学院以及中科院 日本理化学研究院和意大利维罗纳大学的多位博士和硕士支持创办。公司致力于室内空气检测、室内空气污染治理及空气净化产品的研发、 生产和销售。自成立以来，冰虫已为全国4500多家企事业单位及36000多户家庭提供了室内空气检测及治理服务， 其中包括杭州G20峰会、“一带一路”标志性建筑-敦煌文博会馆、宁夏银川中国-阿拉伯国家博览会、乌镇世界互联网大会、 世界工业设计大会等重大国家工程项目。目前，浙大冰虫在整个行业内拥</span></p><p><br/></p><p style=\"white-space: normal;\"><span style=\"color: rgb(51, 51, 51); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\">&nbsp; &nbsp; 浙大冰虫依托于浙江大学实验室科研力量，由来自浙大环境与资源学院、医学院、公共卫生学院以及中科院 日本理化学研究院和意大利维罗纳大学的多位博士和硕士支持创办。公司致力于室内空气检测、室内空气污染治理及空气净化产品的研发、 生产和销售。自成立以来，冰虫已为全国4500多家企事业单位及36000多户家庭提供了室内空气检测及治理服务， 其中包括杭州G20峰会、“一带一路”标志性建筑-敦煌文博会馆、宁夏银川中国-阿拉伯国家博览会、乌镇世界互联网大会、 世界工业设计大会等重大国家工程项目。目前，浙大冰虫在整个行业内拥</span></p><p><span style=\"color: rgb(51, 51, 51); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\"><br/></span></p><p><span style=\"color: rgb(51, 51, 51); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\"></span></p><p style=\"white-space: normal;\"><span style=\"color: rgb(51, 51, 51); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\">浙大冰虫依托于浙江大学实验室科研力量，由来自浙大环境与资源学院、医学院、公共卫生学院以及中科院 日本理化学研究院和意大利维罗纳大学的多位博士和硕士支持创办。公司致力于室内空气检测、室内空气污染治理及空气净化产品的研发、 生产和销售。自成立以来，冰虫已为全国4500多家企事业单位及36000多户家庭提供了室内空气检测及治理服务， 其中包括杭州G20峰会、“一带一路”标志性建筑-敦煌文博会馆、宁夏银川中国-阿拉伯国家博览会、乌镇世界互联网大会、 世界工业设计大会等重大国家工程项目。目前，浙大冰虫在整个行业内拥</span></p><p><span style=\"color: rgb(51, 51, 51); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\"><br/></span></p><p><span style=\"color: rgb(51, 51, 51); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\"><img src=\"/uepicture/1006075535153041408.jpg\" title=\"\" alt=\"4.jpg\"/></span><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p>');
INSERT INTO `cyc_content_txt` VALUES ('37', '');
INSERT INTO `cyc_content_txt` VALUES ('39', '');
INSERT INTO `cyc_content_txt` VALUES ('40', '');
INSERT INTO `cyc_content_txt` VALUES ('41', '<p>ae<br/></p>');
INSERT INTO `cyc_content_txt` VALUES ('42', '');
INSERT INTO `cyc_content_txt` VALUES ('43', '');
INSERT INTO `cyc_content_txt` VALUES ('44', '<pre style=\"background-color: rgb(255, 255, 255); font-family: 宋体; font-size: 9pt;\">冰虫是一种极地生物，于南北极极寒冰雪中生存，具有顽强生命力。这种顽强的生命力恰如冰虫公司的企业文化精神，自立、自强、生生不息。\n&nbsp;&nbsp;&nbsp;&nbsp;冰虫生命力顽强，但极怕污染，一点点污染都会让其生命终结，正如人类本应生活在原生态的自然条件下，享受蓝天白云碧水青山，但现实居住环境却被污染层层包围，人类健康面临着巨大的威胁</pre><p><br/></p>');

-- ----------------------------
-- Table structure for cyc_content_type
-- ----------------------------
DROP TABLE IF EXISTS `cyc_content_type`;
CREATE TABLE `cyc_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL COMMENT '类型名称',
  `img_width` int(11) DEFAULT NULL COMMENT '图片宽度',
  `img_height` int(11) DEFAULT NULL COMMENT '图片高度',
  `has_img` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否有图片,0-有，1-否',
  `is_disabled` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否禁用,0-否，1-是',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_content_type
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_group
-- ----------------------------
DROP TABLE IF EXISTS `cyc_group`;
CREATE TABLE `cyc_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(64) NOT NULL,
  `create_time` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='组表';

-- ----------------------------
-- Records of cyc_group
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_group_permission
-- ----------------------------
DROP TABLE IF EXISTS `cyc_group_permission`;
CREATE TABLE `cyc_group_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL DEFAULT '0',
  `permission_id` int(11) NOT NULL DEFAULT '0',
  `permission_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '权限类型，0-可访问，1-可授权',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_group_permission
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_group_role
-- ----------------------------
DROP TABLE IF EXISTS `cyc_group_role`;
CREATE TABLE `cyc_group_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL DEFAULT '0',
  `role_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_group_role
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_module
-- ----------------------------
DROP TABLE IF EXISTS `cyc_module`;
CREATE TABLE `cyc_module` (
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Records of cyc_module
-- ----------------------------
INSERT INTO `cyc_module` VALUES ('1', '0', 'SysManage', '系统设置', 'fa fa-windows', 'javascript:;', 'main', '0', '1', '0', '0', '1', '2', '0', '1', '', '2017-03-21 15:11:45', '1', 'admin', '2018-06-07 21:46:24', '1', 'admin', '0');
INSERT INTO `cyc_module` VALUES ('2', '1', 'MenuManage', '菜单', 'glyphicon glyphicon-th-list', '/admin/menu/manage', 'main', '0', '1', '0', '0', '1', '0', '0', '1', '', '2017-03-21 15:11:45', '1', 'admin', '2017-03-24 16:25:02', '1', 'admin', '0');
INSERT INTO `cyc_module` VALUES ('24', '0', 'channel', '栏目', 'fa fa-folder', '/admin/channel', 'main', '0', '1', '0', '0', '0', '0', '0', '1', '', '2017-03-24 15:46:24', '1', 'admin', '2018-06-07 15:15:09', '1', 'admin', '0');
INSERT INTO `cyc_module` VALUES ('25', '0', 'content', '内容', 'fa fa-folder', '/admin/content', 'main', '0', '1', '0', '0', '0', '0', '0', '1', '', '2017-03-24 15:46:52', '1', 'admin', '2018-06-07 16:26:17', '1', 'admin', '0');
INSERT INTO `cyc_module` VALUES ('26', '0', 'user', '用户', 'fa fa-folder', 'javascript:;', 'expand', '0', '1', '0', '0', '0', '0', '0', '1', '', '2017-03-24 15:47:45', '1', 'admin', '2017-03-24 15:36:32', '0', '', '0');
INSERT INTO `cyc_module` VALUES ('27', '0', 'protect', '维护', 'fa fa-folder', 'javascript:;', 'expand', '0', '1', '0', '0', '0', '0', '0', '1', '', '2017-03-24 15:52:00', '1', 'admin', '2017-03-24 15:36:32', '0', '', '0');
INSERT INTO `cyc_module` VALUES ('28', '0', 'data', '数据', 'fa fa-folder', 'javascript:;', 'expand', '0', '1', '0', '0', '0', '0', '0', '1', '', '2017-03-24 15:52:27', '1', 'admin', '2017-03-24 15:36:32', '0', '', '0');
INSERT INTO `cyc_module` VALUES ('29', '0', 'content_type', '内容类型', 'fa fa-folder', 'javascript:;', 'main', '0', '1', '0', '0', '0', '0', '0', '1', '', '2017-03-24 16:22:38', '1', 'admin', '2017-03-24 17:00:09', '1', 'admin', '0');

-- ----------------------------
-- Table structure for cyc_permission
-- ----------------------------
DROP TABLE IF EXISTS `cyc_permission`;
CREATE TABLE `cyc_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父ID',
  `name` varchar(64) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_permission
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_role
-- ----------------------------
DROP TABLE IF EXISTS `cyc_role`;
CREATE TABLE `cyc_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父ID',
  `name` varchar(64) NOT NULL,
  `create_time` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL COMMENT '角色描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_role
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `cyc_role_permission`;
CREATE TABLE `cyc_role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) NOT NULL DEFAULT '0',
  `permission_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '权限类型，0-可访问，1-可授权',
  `role_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_role_permission
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_user_group
-- ----------------------------
DROP TABLE IF EXISTS `cyc_user_group`;
CREATE TABLE `cyc_user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `group_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_user_group
-- ----------------------------

-- ----------------------------
-- Table structure for cyc_user_permission
-- ----------------------------
DROP TABLE IF EXISTS `cyc_user_permission`;
CREATE TABLE `cyc_user_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `permission_id` int(11) NOT NULL DEFAULT '0',
  `permission_type` tinyint(4) DEFAULT '0' COMMENT '权限类型：0-可访问，1-可授权',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cyc_user_permission
-- ----------------------------

-- ----------------------------
-- Table structure for group
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
-- Records of group
-- ----------------------------

-- ----------------------------
-- Table structure for group_permission
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
-- Records of group_permission
-- ----------------------------

-- ----------------------------
-- Table structure for group_role
-- ----------------------------
DROP TABLE IF EXISTS `group_role`;
CREATE TABLE `group_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL DEFAULT '0',
  `role_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group_role
-- ----------------------------

-- ----------------------------
-- Table structure for module
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
  `user_id` int(11) NOT NULL COMMENT '创建此菜单的用户ID',
  `username` varchar(125) NOT NULL COMMENT '创建此菜单的用户名',
  `update_time` datetime NOT NULL,
  `update_user_id` int(11) NOT NULL COMMENT '更新此菜单的用户ID',
  `update_username` varchar(125) NOT NULL COMMENT '更新此菜单的用户名',
  `is_display` tinyint(4) DEFAULT NULL COMMENT '是否显示，0-是，1-否',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Records of module
-- ----------------------------

-- ----------------------------
-- Table structure for permission
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
-- Records of permission
-- ----------------------------

-- ----------------------------
-- Table structure for role
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
-- Records of role
-- ----------------------------

-- ----------------------------
-- Table structure for role_permission
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
-- Records of role_permission
-- ----------------------------

-- ----------------------------
-- Table structure for user_group
-- ----------------------------
DROP TABLE IF EXISTS `user_group`;
CREATE TABLE `user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `group_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_group
-- ----------------------------

-- ----------------------------
-- Table structure for user_permission
-- ----------------------------
DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE `user_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `permission_id` int(11) NOT NULL DEFAULT '0',
  `permission_type` tinyint(4) DEFAULT '0' COMMENT '权限类型：0-可访问，1-可授权',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_permission
-- ----------------------------
