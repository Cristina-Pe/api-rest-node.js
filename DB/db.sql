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
(1, 'Caniche', 'perro','M', 2, '12/02/2019'),
(2, 'Dalmata', 'perro','M', 3, '12/02/2018'),
(3, 'Golden', 'perro','F', 4, '12/02/2017');

select*from mascota;


