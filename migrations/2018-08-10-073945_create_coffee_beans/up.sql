-- Your SQL goes here
SET character_set_client = 'utf8';
SET character_set_connection = 'utf8';
SET character_set_database = 'utf8';

CREATE TABLE `coffee_beans` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `processing` VARCHAR(100) NOT NULL,
  `roasting` VARCHAR(100) NOT NULL,
  `origin` VARCHAR(100) NOT NULL,
  `image_url` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB;
