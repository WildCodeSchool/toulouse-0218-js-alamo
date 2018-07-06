ALTER TABLE sport ADD column slug varchar(45) after id;
ALTER TABLE resource ADD column sportId INTEGER UNSIGNED NOT NULL AFTER managerId;
