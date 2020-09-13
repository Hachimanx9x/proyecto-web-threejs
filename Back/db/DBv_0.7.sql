CREATE DATABASE proyectoweb; 
USE proyectoweb;
create table CONTENIDOS(id int primary key AUTO_INCREMENT, nombre varchar(50), descripcion varchar(200), url_documentacion varchar (50), bibliografica varchar(50));

CREATE TABLE HERRAMIENTAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(30), tipo varchar(20), descripcion varchar(100), url_icono varchar(50));

CREATE TABLE CHATS(id int PRIMARY KEY AUTO_INCREMENT, url_archivo varchar(50), fecha DATE);

CREATE TABLE ANOTACIONES(id int PRIMARY KEY AUTO_INCREMENT, rl_archivo varchar(50), fecha DATE);

CREATE TABLE IDIOMAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(20), nivel varchar(20));

CREATE TABLE PERSONAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(50), descripcion varchar(200), otro varchar(100), pais varchar(20), edad INT);

CREATE TABLE HERRAMIENTASMETODOLOGIA(	id int PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(150), descripcion VARCHAR(500), urlDocumento VARCHAR(350), bibliografia VARCHAR(150)  ); 

CREATE TABLE TECNICAS(id int PRIMARY KEY AUTO_INCREMENT, titulo varchar(50), descripcion varchar(100), urlDocumento varchar(50), bibliografia varchar(50), herramienta INT, FOREIGN KEY(herramienta) REFERENCES HERRAMIENTASMETODOLOGIA(id));

CREATE TABLE CONTACTOS(id int PRIMARY KEY AUTO_INCREMENT, personas int, preferencias boolean, FOREIGN KEY(personas) REFERENCES PERSONAS(id));

CREATE TABLE HABILIDADES(id int PRIMARY KEY AUTO_INCREMENT, tipo varchar(40), descripcion varchar(40), nivel varchar(20), herramientaUsada int, FOREIGN KEY (herramientaUsada) REFERENCES HERRAMIENTAS(id));

CREATE TABLE ACTIVIDADES(id int PRIMARY KEY AUTO_INCREMENT, titulo varchar(50), estado varchar(20), descripcion varchar(100), fechaCreacion date, fechaEntrega date, horaEntrega varchar(20), numeroRevisiones int, tecnica int, FOREIGN KEY(tecnica) REFERENCES TECNICAS(id));

CREATE TABLE ENTREGABLES(id int PRIMARY KEY AUTO_INCREMENT, titulo varchar(50), descripcion varchar(100), estado varchar(20), numeroRevisiones int, tipoArchivo varchar(20), fechaEntrega date, contenido int, FOREIGN KEY(contenido) REFERENCES CONTENIDOS(id));

CREATE TABLE ROLES(id int PRIMARY KEY AUTO_INCREMENT, titulo varchar(20), descripcion varchar(20), perfilRecomencado varchar(50), habilidadRecomendada int, FOREIGN KEY(habilidadRecomendada) REFERENCES HABILIDADES(id));

CREATE TABLE RUTAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(20), descripcion varchar(100), actividad int, FOREIGN KEY(actividad) REFERENCES ACTIVIDADES(id));

CREATE TABLE ALFAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(50), descripcion varchar(100), estado varchar(20), entregable int, FOREIGN KEY(entregable) REFERENCES ENTREGABLES(id));

CREATE TABLE USUARIOS(id int PRIMARY KEY AUTO_INCREMENT, correoElectronico VARCHAR(50), urlHojaVida varchar(50), contrasena VARCHAR(15), experiencia int, contacto INT, persona INT , habilidad int, FOREIGN KEY(contacto) REFERENCES CONTACTOS(id),  FOREIGN KEY(persona) REFERENCES PERSONAS(id),  FOREIGN KEY(habilidad) REFERENCES HABILIDADES(id));

CREATE TABLE INTEGRANTES(id int PRIMARY KEY AUTO_INCREMENT, usuario varchar(50), rol int, actividad int, FOREIGN KEY(rol) REFERENCES ROLES(id),  FOREIGN KEY(actividad) REFERENCES ACTIVIDADES(id));

CREATE TABLE REUNIONES(id int PRIMARY KEY AUTO_INCREMENT,  titulo varchar(50), fecha date, hora varchar(20), duracion int, descripcion varchar(100), integrantes int, FOREIGN KEY(integrantes) REFERENCES INTEGRANTES(id));

CREATE TABLE ENTREGAS(id int PRIMARY KEY AUTO_INCREMENT,  titulo varchar(50), fecha date, hora varchar(20), duracion int, descripcion varchar(100),  integrantes int, entregable int,  FOREIGN KEY(integrantes) REFERENCES INTEGRANTES(id),  FOREIGN KEY(entregable) REFERENCES ENTREGABLES(id));

CREATE TABLE EVENTOS(id int PRIMARY KEY AUTO_INCREMENT,  tipo varchar(20), reunion int, entregas int,  FOREIGN KEY(reunion) REFERENCES REUNIONES(id), FOREIGN KEY(entregas) REFERENCES ENTREGAS(id));

CREATE TABLE HISTORIAL(id int PRIMARY KEY AUTO_INCREMENT, descripcion varchar(100), evento int, chat int, anotacion INT,FOREIGN KEY(evento) REFERENCES EVENTOS(id), FOREIGN KEY(chat) REFERENCES CHATS(id), FOREIGN KEY(anotacion) REFERENCES ANOTACIONES(id));

CREATE TABLE PRACTICAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(20), descripcion varchar(100), alfaUsada int, ruta int, rol int,  FOREIGN KEY(alfaUsada) REFERENCES ALFAS(id),  FOREIGN KEY(ruta) REFERENCES RUTAS(id),  FOREIGN KEY(rol) REFERENCES ROLES(id));

CREATE TABLE METODOLOGIAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(50), descripcion varchar(100), mensaje varchar(100), practica int,  FOREIGN KEY(practica) REFERENCES PRACTICAS(id));

CREATE TABLE PROYECTOS (id INT PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(350), descripcion VARCHAR(1350), estado VARCHAR(150), icon VARCHAR(1000), banner VARCHAR(1000), integrante INT , historia INT, practica INT,FOREIGN KEY(integrante) REFERENCES INTEGRANTES(id),FOREIGN KEY(historia) REFERENCES HISTORIAL(id),FOREIGN KEY(practica) REFERENCES PRACTICAS(id)); 