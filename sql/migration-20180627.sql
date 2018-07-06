-- Modification du schéma 27/06/18
create table resource(
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  managerId INTEGER UNSIGNED NOT NULL,
  title VARCHAR(64)
);

ALTER TABLE resource
ADD CONSTRAINT fk_resource_1 FOREIGN KEY (managerId) REFERENCES manager(id);

ALTER TABLE `timeSlot` CHANGE `calendarId` `resourceId` INT(11) UNSIGNED NULL DEFAULT NULL;
