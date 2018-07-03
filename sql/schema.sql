-- MySQL Script generated by MySQL Workbench
-- mar. 19 juin 2018 16:00:33 CEST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema alamo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema alamo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `alamo` DEFAULT CHARACTER SET utf8 ;
USE `alamo` ;

-- -----------------------------------------------------
-- Table `alamo`.`sport`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alamo`.`sport` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(45),
  `label` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alamo`.`booker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alamo`.`booker` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `familyName` VARCHAR(50) NULL DEFAULT NULL,
  `firstName` VARCHAR(50) NULL DEFAULT NULL,
  `pseudo` VARCHAR(50) NULL DEFAULT NULL,
  `password` VARCHAR(50) NULL DEFAULT NULL,
  `address` VARCHAR(250) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `favSport` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_idx` (`favSport` ASC),
  CONSTRAINT `id`
    FOREIGN KEY (`favSport`)
    REFERENCES `alamo`.`sport` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alamo`.`manager`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alamo`.`manager` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `clubName` VARCHAR(50) NULL DEFAULT NULL,
  `password` VARCHAR(50) NULL DEFAULT NULL,
  `address` VARCHAR(250) NULL DEFAULT NULL,
  `postalCode` INT UNSIGNED NULL DEFAULT NULL,
  `city` VARCHAR(50) NULL DEFAULT NULL,
  `lat` FLOAT NULL DEFAULT NULL,
  `lng` FLOAT NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alamo`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alamo`.`admin` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `password` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alamo`.`calendar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alamo`.`calendar` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `managerId` INT UNSIGNED NOT NULL,
  `sportId` INT UNSIGNED NOT NULL
  -- INDEX `id_idx1` (`managerId` ASC),
--   INDEX `id_idx` (`sportId` ASC),
)
ENGINE = InnoDB;

-- ALTER TABLE  `calendar`
--  ADD CONSTRAINT `fk_calendar_1`
--     FOREIGN KEY (`sportId`)
--     REFERENCES `alamo`.`sport` (`id`),
-- --     ON DELETE NO ACTION
-- --     ON UPDATE NO ACTION,
--  ADD CONSTRAINT `fk_calendar_2`
--     FOREIGN KEY (`managerId`)
--     REFERENCES `alamo`.`manager` (`id`);
-- --     ON DELETE NO ACTION
-- --     ON UPDATE NO ACTION;
-- -----------------------------------------------------
-- Table `alamo`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alamo`.`reservation` (
  `id` INT UNSIGNED NOT NULL PRIMARY KEY,
  `calendarId` INT UNSIGNED NOT NULL,
  `bookerId` INT UNSIGNED NOT NULL,
  `date` DATE NULL,
  `time` TIME NULL
  -- INDEX `id_idx` (`calendarId` ASC),
--   INDEX `id_idx1` (`bookerId` ASC),
)
ENGINE = InnoDB;

-- ALTER TABLE `alamo`.`reservation`
--   ADD CONSTRAINT `fk_reservation_1`
--     FOREIGN KEY (`calendarId`)
--     REFERENCES `alamo`.`calendar` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--   ADD CONSTRAINT `fk_reservation_2`
--     FOREIGN KEY (`bookerId`)
--     REFERENCES `alamo`.`booker` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION;
-- -----------------------------------------------------
-- Table `alamo`.`timeSlot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alamo`.`timeSlot` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `resourceId` INT(11) UNSIGNED NULL DEFAULT NULL,
  `title` VARCHAR(60) NULL DEFAULT '',
  `startHour` TIME NULL,
  `endHour` TIME NULL,
  `dayOfWeek` INT UNSIGNED NULL
 --  INDEX `id_idx` (`calendarId` ASC)
  )
ENGINE = InnoDB;

-- ALTER TABLE `alamo`.`timeSlot`
--  ADD CONSTRAINT `fk_timeslot_1`
--     FOREIGN KEY (`calendarId`)
--     REFERENCES `alamo`.`calendar` (`sportId`);
-- --     ON DELETE NO ACTION
--     ON UPDATE NO ACTION;
-- 

-- Modification du schéma 27/06/18
create table resource(
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  managerId INTEGER UNSIGNED NOT NULL,
  sportId INTEGER UNSIGNED NOT NULL,
  title VARCHAR(64)
);

ALTER TABLE resource
ADD CONSTRAINT fk_resource_1 FOREIGN KEY (managerId) REFERENCES manager(id);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
