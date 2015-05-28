CREATE TABLE cll_images (
	imageKey int NOT NULL AUTO_INCREMENT,
	activeStart int,
	activeEnd int,
	imageId varchar(100),
	imagePage varchar(50),
	imagePath varchar(255),
	relatedId varchar(50),
	PRIMARY KEY(imageKey))
ENGINE=InnoDB;

INSERT INTO cll_images (activeStart, activeEnd, imageId, imagePath, relatedId)
VALUES
	(101,1231,'img_restaurant', 'imgs/bar1.jpg', 1),
	(101,1231,'img_restaurant', 'imgs/bar2.jpg', 1),
	(101,1231,'img_restaurant', 'imgs/sundeck.jpg', 1),
	(101,1231,'img_restaurant', 'imgs/sundeck2.jpg', 1),
	(101,1231,'img_cabin', 'imgs/cabins/cabin1/01_cover.JPG', 1),
	(101,1231,'img_cabin', 'imgs/cabins/cabin2/02_cover.jpg', 2),
	(101,1231,'img_cabin', 'imgs/cabins/cabin3/03_cover.JPG', 3),
	(101,1231,'img_cabin', 'imgs/cabins/cabin4/04_cover.JPG', 4),
	(101,1231,'img_cabin', 'imgs/cabins/cabin5/05_cover.JPG', 5),
	(101,1231,'img_cabin', 'imgs/cabins/cabin6/06_cover.JPG', 6),
	(101,1231,'img_cabin', 'imgs/cabins/cabin7/07_cover.JPG', 7),
	(101,1231,'img_cabin', 'imgs/cabins/cabin8/08_cover.JPG', 8),
	(101,1231,'img_cabin', 'imgs/cabins/cabin9/09_cover.jpg', 9),
	(101,1231,'img_cabin', 'imgs/cabins/cabin10/10_cover.jpg', 10),
	(101,1231,'img_resort', 'imgs/resort/boats_1.jpg', 1),
	(101,1231,'img_resort', 'imgs/resort/cabins_1.jpg', 1),
	(101,1231,'img_resort', 'imgs/resort/grounds_new.jpg', 1),
	(101,1231,'img_resort', 'imgs/resort/playground.jpg', 1);
	