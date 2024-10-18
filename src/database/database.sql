CREATE DATABASE desafioRadix;

CREATE TABLE usuario(
id INT PRIMARY KEY, 
nome VARCHAR(60),
email VARCHAR(60),
senha VARCHAR(60)
)AUTO_INCREMENT=1;

CREATE TABLE Sensores(
id INT PRIMARY KEY,
equipmentId VARCHAR(20),
timestamp TIMESTAMP,
value DECIMAL(10,2)
)AUTO_INCREMENT=0;

select * from usuarios;
select * from Sensores;
drop table Sensores;
select * from leituraArquivos;