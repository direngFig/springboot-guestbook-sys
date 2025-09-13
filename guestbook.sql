/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 80031
Source Host           : localhost:3306
Source Database       : guestbook

Target Server Type    : MYSQL
Target Server Version : 80031
File Encoding         : 65001

Date: 2025-09-13 14:42:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for guest_book_message
-- ----------------------------
DROP TABLE IF EXISTS `guest_book_message`;
CREATE TABLE `guest_book_message` (
  `nickname` varchar(20) NOT NULL,
  `users` varchar(10) NOT NULL,
  `message` varchar(255) NOT NULL,
  `update_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of guest_book_message
-- ----------------------------
INSERT INTO `guest_book_message` VALUES ('下回小xin点吧', '111', '你所见即是我，好与坏我都不反驳，我所爱即使你，好与坏我都能接受', '2025-08-13 13:07:09');
INSERT INTO `guest_book_message` VALUES ('下回小xin点吧', '111', '总觉得你放不下一个人，那未必是爱，那只是执着与回忆', '2025-08-13 10:14:09');
INSERT INTO `guest_book_message` VALUES ('下回小xin点吧', '111', '你大概不知道，我曾那么努力的想在你的世界里存在的久一点，再久一点', '2025-08-13 23:18:16');

-- ----------------------------
-- Table structure for guest_book_user
-- ----------------------------
DROP TABLE IF EXISTS `guest_book_user`;
CREATE TABLE `guest_book_user` (
  `nickname` varchar(10) NOT NULL,
  `user_account` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of guest_book_user
-- ----------------------------
INSERT INTO `guest_book_user` VALUES ('下回小xin点吧', '111', '111');
INSERT INTO `guest_book_user` VALUES ('已读不回专业户', '222', '222');
INSERT INTO `guest_book_user` VALUES ('懒羊羊大将军', '333', '333');
INSERT INTO `guest_book_user` VALUES ('惰', '444', '444');
INSERT INTO `guest_book_user` VALUES ('不要吵我睡觉', '555', '555');
