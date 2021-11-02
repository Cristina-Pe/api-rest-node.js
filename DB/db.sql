CREATE DATABASE IF NOT EXISTS mascotas;

use mascotas;

CREATE TABLE mascota(
id int(11)not null auto_increment,
nombre varchar(45)default null,
especie varchar(45)default null,
genero varchar(45)default null,
edad int (10),
fec_nac varchar(45)default null,
primary key(id)
);

insert into mascota values
(1, 'Golden', 'mamifero','M', 2, '12/02/2019'),
(2, 'Caniche', 'mamifero','M', 3, '02/12/2018'),
(3, 'Siames', 'mamifero','F', 2, '19/04/2019'),
(4, 'Rana', 'reptil','M', 1, '12/02/2020'),
(5, 'Loro', 'ave','M', 3, '12/02/2018'),
(6, 'Serpiente', 'reptil','F', 5, '12/02/2016'),
(7, 'Hámster', 'mamifero','M', 2, '04/03/2019')


select*from mascota;


