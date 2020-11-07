-- MySQL Script generated by MySQL Workbench
-- Fri Nov  6 21:33:10 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema reddut
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema reddut
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reddut` DEFAULT CHARACTER SET utf8 ;
USE `reddut` ;

-- -----------------------------------------------------
-- Table `reddut`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reddut`.`user` (
  `id` VARCHAR(100) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `iduser_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `reddut`.`subreddut`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reddut`.`subreddut` (
  `id` VARCHAR(100) NOT NULL,
  `key` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `key_UNIQUE` (`key` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `reddut`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reddut`.`post` (
  `id` VARCHAR(100) NOT NULL,
  `title` VARCHAR(300) NOT NULL,
  `content` TEXT NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  `sub_reddut_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_post_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_post_sub_reddut1_idx` (`sub_reddut_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `reddut`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_sub_reddut1`
    FOREIGN KEY (`sub_reddut_id`)
    REFERENCES `reddut`.`subreddut` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `reddut`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reddut`.`comment` (
  `id` VARCHAR(100) NOT NULL,
  `content` TEXT NOT NULL,
  `upvotes` INT NOT NULL,
  `downvotes` INT NOT NULL,
  `post_id` VARCHAR(100) NOT NULL,
  UNIQUE INDEX `idcomment_UNIQUE` (`id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_post1_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `reddut`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `reddut`.`member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reddut`.`member` (
  `sub_reddut_id` VARCHAR(100) NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  INDEX `fk_member_user1_idx` (`user_id` ASC) VISIBLE,
  PRIMARY KEY (`sub_reddut_id`, `user_id`),
  CONSTRAINT `fk_member_sub_reddut1`
    FOREIGN KEY (`sub_reddut_id`)
    REFERENCES `reddut`.`subreddut` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_member_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `reddut`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;