/*
Copyright (C) 2013 Jukka Stenlund

This file is part of HymnGadget.

HymnGadget is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

HymnGadget is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with HymnGadget.  If not, see <http://www.gnu.org/licenses/>.

*/

-- This file was edited from phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE IF NOT EXISTS `book` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_swedish_ci NOT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci ;


CREATE TABLE IF NOT EXISTS `customisation` (
  `user` int(10) unsigned NOT NULL,
  `song` int(10) unsigned NOT NULL,
  `transpose_interval` tinyint(4) DEFAULT '0',
  `transpose_interval_quality` tinyint(4) DEFAULT '0',
  `verses` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `harmonisation` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`user`,`song`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `harmonisation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `notation` varchar(10000) COLLATE utf8_swedish_ci DEFAULT NULL,
  `melody` int(10) unsigned NOT NULL,
  `description` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `owner` int(10) unsigned DEFAULT NULL,
  `public` enum('N','Y') COLLATE utf8_swedish_ci NOT NULL DEFAULT 'N',
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci ;

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(10) unsigned DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_swedish_ci NOT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci ;

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `list_item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_no` int(10) unsigned DEFAULT NULL,
  `song` int(10) unsigned NOT NULL,
  `list` int(10) unsigned NOT NULL,
  `verses` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `transpose_interval` tinyint(4) DEFAULT '0',
  `transpose_interval_quality` tinyint(4) DEFAULT '0',
  `harmonisation` int(10) unsigned DEFAULT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci ;

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `melody` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `notation` varchar(10000) COLLATE utf8_swedish_ci DEFAULT NULL,
  `origin` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci ;

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `rights` (
  `user` int(10) unsigned NOT NULL,
  `book` int(10) unsigned NOT NULL,
  `add_song` enum('N','Y') COLLATE utf8_swedish_ci NOT NULL DEFAULT 'N',
  `add_harmonisation` enum('N','Y') COLLATE utf8_swedish_ci NOT NULL DEFAULT 'N',
  `edit_metadata` enum('N','Y') COLLATE utf8_swedish_ci NOT NULL DEFAULT 'N',
  `edit_melody` enum('N','Y') COLLATE utf8_swedish_ci NOT NULL DEFAULT 'N',
  `edit_any_harmonisation` enum('N','Y') COLLATE utf8_swedish_ci NOT NULL DEFAULT 'N',
  `edit_own_harmonisation` enum('N','Y') COLLATE utf8_swedish_ci NOT NULL DEFAULT 'N',
  `edit_lyrics` enum('N','Y') COLLATE utf8_swedish_ci NOT NULL DEFAULT 'N',
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user`,`book`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;


CREATE TABLE IF NOT EXISTS `song` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number` int(10) unsigned DEFAULT NULL,
  `variant` char(1) COLLATE utf8_swedish_ci DEFAULT '',
  `book` int(10) unsigned DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_swedish_ci DEFAULT NULL,
  `melody` int(10) unsigned DEFAULT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `information` varchar(1000) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci ;


-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) COLLATE utf8_swedish_ci NOT NULL,
  `password` char(41) COLLATE utf8_swedish_ci NOT NULL,
  `first_name` varchar(50) COLLATE utf8_swedish_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8_swedish_ci DEFAULT NULL,
  `admin` enum('N','Y') COLLATE utf8_swedish_ci DEFAULT 'N',
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `wrong_passwd_after_last_login` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `wrong_guesses_for_current_passwd` smallint(5) unsigned NOT NULL DEFAULT '0',
  `enabled` enum('N','Y') COLLATE utf8_swedish_ci NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci ;


-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `verse` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number` tinyint(3) unsigned DEFAULT NULL,
  `text` varchar(3000) COLLATE utf8_swedish_ci DEFAULT NULL,
  `song` int(10) unsigned NOT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci ;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
