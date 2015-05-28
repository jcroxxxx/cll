create table cottage_rates (
internalKey int NOT NULL AUTO_INCREMENT,
cottageNumber int NOT NULL,
daily decimal(9,2),
deposit decimal(9,2),
fall decimal(9,2),
occupants int,
spring decimal(9,2),
summer decimal(9,2),
winter decimal(9,2),
winterDaily decimal(9,2),
PRIMARY KEY(internalKey))
ENGINE=InnoDB;