DROP DATABASE peliculas;

CREATE DATABASE peliculas;
USE peliculas;

CREATE TABLE `pelicula` (
    `id` INT NOT NULL auto_increment, 
    `titulo` VARCHAR(100) NOT NULL, 
    `duracion` INT NOT NULL, 
    `director` VARCHAR(400) NOT NULL, 
    `anio` INT NOT NULL, 
    `fecha_lanzamiento` DATE, 
    `puntuacion` INT, 
    `poster` VARCHAR(300), 
    `trama` VARCHAR(700),
    PRIMARY KEY(`id`)
);

CREATE TABLE `genero`(
    `id` INT NOT NULL auto_increment,
    `nombre` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE `pelicula` ADD COLUMN `genero_id` INT;

ALTER TABLE `pelicula` ADD FOREIGN KEY (`genero_id`) REFERENCES `genero`(`id`);

CREATE TABLE `actor`(
    `id` INT NOT NULL auto_increment,
    `nombre` VARCHAR(70) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `actor_pelicula`(
    `id` INT NOT NULL auto_increment,
    `actor_id` INT,
    `pelicula_id` INT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`),
    FOREIGN KEY (`pelicula_id`) REFERENCES `pelicula` (`id`)
);