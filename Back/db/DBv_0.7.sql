CREATE DATABASE proyectoweb; 
USE proyectoweb;


CREATE TABLE HERRAMIENTAS(id int PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(120), tipo VARCHAR(100), descripcion varchar(1000), nombreIcono VARCHAR(75));

CREATE TABLE CHATS(id int PRIMARY KEY AUTO_INCREMENT, nombreArchivo VARCHAR(150), fecha DATE);

CREATE TABLE ANOTACIONES(id int PRIMARY KEY AUTO_INCREMENT, nombreArchivo VARCHAR(74), fecha DATE);

CREATE TABLE IDIOMAS(id int PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(35), nivel VARCHAR(100));

CREATE TABLE PERSONAS(id int PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(250), descripcion VARCHAR(1000), pais varchar(20), edad INT);

CREATE TABLE HERRAMIENTASMETODOLOGIA(	id int PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(150), descripcion VARCHAR(500), urlDocumento VARCHAR(350), bibliografia VARCHAR(150)  ); 

CREATE TABLE LISTAIDIOMAS (id INT PRIMARY KEY AUTO_INCREMENT, español INT, ingles INT, portugues INT,frances INT,ruso INT,japones INT,aleman INT  ,
FOREIGN KEY(español) REFERENCES IDIOMAS(id),
FOREIGN KEY(ingles) REFERENCES IDIOMAS(id),
FOREIGN KEY(portugues) REFERENCES IDIOMAS(id),
FOREIGN KEY(frances) REFERENCES IDIOMAS(id),
FOREIGN KEY(ruso) REFERENCES IDIOMAS(id),
FOREIGN KEY(japones) REFERENCES IDIOMAS(id),
FOREIGN KEY(aleman) REFERENCES IDIOMAS(id))


CREATE TABLE TECNICAS(id int PRIMARY KEY AUTO_INCREMENT, titulo varchar(50), descripcion varchar(100), urlDocumento varchar(50), bibliografia varchar(50), herramienta INT, 
FOREIGN KEY(herramienta) REFERENCES HERRAMIENTASMETODOLOGIA(id));

CREATE TABLE CONTACTOS(id int PRIMARY KEY AUTO_INCREMENT, personas int, preferencias BOOLEAN, 
FOREIGN KEY(personas) REFERENCES PERSONAS(id));

CREATE TABLE HABILIDADES(id int PRIMARY KEY AUTO_INCREMENT, tipo varchar(40), descripcion varchar(40), nivel varchar(20), herramientaUsada INT, 
FOREIGN KEY (herramientaUsada) REFERENCES HERRAMIENTAS(id));

CREATE TABLE USUARIOS(id int PRIMARY KEY AUTO_INCREMENT, correoElectronico VARCHAR(50), urlHojaVida VARCHAR(500), contrasena VARCHAR(15), experiencia int, contacto INT, persona INT , habilidad INT, listidioma INT
FOREIGN KEY(contacto) REFERENCES CONTACTOS(id),  
FOREIGN KEY(persona) REFERENCES PERSONAS(id),  
FOREIGN KEY(habilidad) REFERENCES HABILIDADES(id),
FOREIGN KEY(listidioma) REFERENCES LISTAIDIOMAS(id));

-- CREATE TABLE CONTENIDOS(id int primary key AUTO_INCREMENT, nombre varchar(50), descripcion varchar(200), bibliografica VARCHAR(1500), usariopropietario INT  , 
-- FOREIGN KEY(usariopropietario) REFERENCES USUARIOS(id)); 

CREATE TABLE CONTENIDOS(id int primary key AUTO_INCREMENT, nombre VARCHAR(150), descripcion varchar(200), bibliografica VARCHAR(1500));

CREATE TABLE ACTIVIDADES(id int PRIMARY KEY AUTO_INCREMENT, titulo VARCHAR(150), estado VARCHAR(50), descripcion varchar(1000), fechaCreacion date, fechaEntrega date, horaEntrega varchar(20), numeroRevisiones int, tecnica INT, 
FOREIGN KEY(tecnica) REFERENCES TECNICAS(id));

CREATE TABLE ENTREGABLES(id int PRIMARY KEY AUTO_INCREMENT, titulo varchar(50), descripcion varchar(100), estado varchar(20), numeroRevisiones int, tipoArchivo varchar(20), fechaEntrega date, contenido INT, 
FOREIGN KEY(contenido) REFERENCES CONTENIDOS(id));

CREATE TABLE ROLES(id int PRIMARY KEY AUTO_INCREMENT, titulo varchar(20), descripcion varchar(20), perfilRecomencado varchar(50), habilidadRecomendada INT, 
FOREIGN KEY(habilidadRecomendada) REFERENCES HABILIDADES(id));

CREATE TABLE RUTAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(20), descripcion varchar(100), actividad INT, 
FOREIGN KEY(actividad) REFERENCES ACTIVIDADES(id));

CREATE TABLE ALFAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(50), descripcion varchar(100), estado varchar(20), entregable INT, 
FOREIGN KEY(entregable) REFERENCES ENTREGABLES(id));

CREATE TABLE INTEGRANTES(id int PRIMARY KEY AUTO_INCREMENT, usuario varchar(50), rol int, actividad INT, 
FOREIGN KEY(rol) REFERENCES ROLES(id),  
FOREIGN KEY(actividad) REFERENCES ACTIVIDADES(id));

CREATE TABLE REUNIONES(id int PRIMARY KEY AUTO_INCREMENT,  titulo varchar(50), fecha date, hora varchar(20), duracion int, descripcion varchar(100), integrantes INT, 
FOREIGN KEY(integrantes) REFERENCES INTEGRANTES(id));

CREATE TABLE ENTREGAS(id int PRIMARY KEY AUTO_INCREMENT,  titulo varchar(50), fecha date, hora varchar(20), duracion int, descripcion varchar(100),  integrantes int, entregable INT,  
FOREIGN KEY(integrantes) REFERENCES INTEGRANTES(id),  
FOREIGN KEY(entregable) REFERENCES ENTREGABLES(id));

CREATE TABLE EVENTOS(id int PRIMARY KEY AUTO_INCREMENT,  tipo varchar(20), reunion int, entregas INT,  
FOREIGN KEY(reunion) REFERENCES REUNIONES(id), 
FOREIGN KEY(entregas) REFERENCES ENTREGAS(id));

CREATE TABLE HISTORIAL(id int PRIMARY KEY AUTO_INCREMENT, descripcion varchar(100), evento int, chat int, anotacion INT,
FOREIGN KEY(evento) REFERENCES EVENTOS(id), 
FOREIGN KEY(chat) REFERENCES CHATS(id), 
FOREIGN KEY(anotacion) REFERENCES ANOTACIONES(id));

CREATE TABLE PRACTICAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(20), descripcion varchar(100), alfaUsada int, ruta int, rol INT,  
FOREIGN KEY(alfaUsada) REFERENCES ALFAS(id),  
FOREIGN KEY(ruta) REFERENCES RUTAS(id),  
FOREIGN KEY(rol) REFERENCES ROLES(id));

CREATE TABLE METODOLOGIAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(50), descripcion varchar(100), mensaje varchar(100), practica INT,  
FOREIGN KEY(practica) REFERENCES PRACTICAS(id));

CREATE TABLE PROYECTOS (id INT PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(350), descripcion VARCHAR(1350), estado VARCHAR(150), icon VARCHAR(1000), banner VARCHAR(1000), integrante INT , historia INT, practica INT, contenedor VARCHAR(1000),
FOREIGN KEY(integrante) REFERENCES INTEGRANTES(id),
FOREIGN KEY(historia) REFERENCES HISTORIAL(id),
FOREIGN KEY(practica) REFERENCES PRACTICAS(id));

