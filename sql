CREATE TABLE `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `key` varchar(128) NOT NULL DEFAULT '' COMMENT '请求路由',
  `link` varchar(255) NOT NULL,
  `parentId` int(11) DEFAULT 0,
  `isDisplay` tinyint(1) NOT NULL,
  `order` int(11) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `level` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL default '0000-00-00 00:0:00',
  PRIMARY KEY (`id`),
  KEY `modular_ibfk_1_idx` (`parentId`),
  CONSTRAINT `modular_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `modular` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '资源表';