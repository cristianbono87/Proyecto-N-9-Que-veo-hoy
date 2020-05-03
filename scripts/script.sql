create database peliculas;
use peliculas;
create table pelicula(
    id int auto_increment primary key,
    titulo varchar(100) not null,
    duracion int(5),
    director varchar(400),
    anio int(5),
    fecha_lanzamiento date,
    puntuacion int(2),
    poster varchar(300),
    trama varchar(700)
);

create table genero(
    id int auto_increment primary key,
    nombre varchar(30)
);

alter table pelicula add column genero_id int not null foreign key references genero(id);

create table actor(
    id int auto_increment primary key,
    nombre varchar(70)
);

create table actor_pelicula(
    id int auto_increment primary key,
    actor_id int,
    pelicula_id int,
    foreign key (actor_id) references actor(id),
    foreign key (pelicula_id) references pelicula(id)
);
