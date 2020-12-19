CREATE DATABASE proyectoweb; 
USE proyectoweb;
-- Sector de los usuarios
CREATE TABLE idiomas(
id int PRIMARY KEY AUTO_INCREMENT, 
idiomanombre VARCHAR(35), 
idiomanivel VARCHAR(150));


CREATE TABLE habilidades(
id int PRIMARY KEY AUTO_INCREMENT, 
habilidadtipo varchar(40), 
habilidaddescripcion varchar(40), 
habilidadnivel varchar(20)); 


CREATE TABLE herramientas(
id int PRIMARY KEY AUTO_INCREMENT, 
herramientanombre VARCHAR(120), 
herramientatipo VARCHAR(100), 
herramientadescripcion varchar(1000), 
herramientanombreIcono VARCHAR(75));


CREATE TABLE usuarios(
id INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(250),
contrasena VARCHAR(15),
fotoperfil VARCHAR(100), 
nombrearchivohojadevida VARCHAR(150),
anosdeexperiencia INT,
nombre VARCHAR(230),
descripcion  VARCHAR(1000),
pais  VARCHAR(100),
edad  INT,
github VARCHAR(130),
gitlab VARCHAR(130),
bitbucket VARCHAR(130),
linkedin VARCHAR(130)
);
CREATE TABLE palabrasclave (
id int PRIMARY KEY AUTO_INCREMENT,
pcusuario INT,
palabra VARCHAR(150),
FOREIGN KEY(pcusuario) REFERENCES usuarios(id)
); 
CREATE TABLE listaidiomas (
usuario INT,
idioma INT ,
FOREIGN KEY(usuario) REFERENCES usuarios(id),
FOREIGN KEY(idioma) REFERENCES idiomas(id));


CREATE TABLE contactos(
id int PRIMARY KEY AUTO_INCREMENT, 
contactousuario INT,
preferencias BOOLEAN, 
FOREIGN KEY(contactousuario) REFERENCES usuarios(id));

CREATE TABLE listacontactos(
usuario INT ,
contacto INT,
FOREIGN KEY(usuario) REFERENCES usuarios(id),
FOREIGN KEY(contacto) REFERENCES contactos(id));


CREATE TABLE listahabilidades(
usuario INT ,
habilidad INT,
FOREIGN KEY(usuario) REFERENCES usuarios(id),
FOREIGN KEY(habilidad) REFERENCES habilidades(id) );

CREATE TABLE listaherramientas(
usuario INT , 
herramientausada INT,
FOREIGN KEY(usuario) REFERENCES usuarios(id),
FOREIGN KEY(herramientausada) REFERENCES herramientas(id));

-- fin de la parte de usuarios


-- inicio de la parte de la metodologia

CREATE TABLE metodologias(
id int PRIMARY KEY AUTO_INCREMENT, 
metodologianombre VARCHAR(500), 
metodologiadescripcion VARCHAR(1500),
metodologiaconsejo VARCHAR(500));

CREATE TABLE practicas (
id int PRIMARY KEY AUTO_INCREMENT, 
practicanombre VARCHAR(500),
practicadescripcion VARCHAR(2000));

CREATE TABLE listapracticas(
metodologia INT,  
practica INT,
FOREIGN KEY(metodologia) REFERENCES metodologias(id),
FOREIGN KEY(practica) REFERENCES practicas(id));

CREATE TABLE alfas (
id int PRIMARY KEY AUTO_INCREMENT,
alfanombre VARCHAR(300),
alfadescripcion VARCHAR(1500),
alfaestado VARCHAR(35));


CREATE TABLE listaalfas(
practica INT,
alfa INT,
FOREIGN KEY(practica) REFERENCES practicas(id),
FOREIGN KEY(alfa) REFERENCES alfas(id)
); 

CREATE TABLE herramientasmetodologia(	
id int PRIMARY KEY AUTO_INCREMENT, 
nombre VARCHAR(150), 
descripcion VARCHAR(500), 
bibliografia VARCHAR(150));

CREATE TABLE tecnicas(
id INT PRIMARY KEY AUTO_INCREMENT,
tecnicatitulo VARCHAR(500), 
tecnicadescripcion VARCHAR(1500),
tecnicabibliografia VARCHAR(1500));

CREATE TABLE actividades(
id INT PRIMARY KEY AUTO_INCREMENT,
actividadtitulo VARCHAR(1000),
actividadestado VARCHAR(300),
actividaddescripcion VARCHAR(1200),
actividadfechacreacion DATE,
actividadfechaentrega DATE,
actividadrevision INT,
tecnica INT,
FOREIGN KEY(tecnica) REFERENCES tecnicas(id)
);


-- CREATE TABLE rutas(
-- id int PRIMARY KEY AUTO_INCREMENT, 
-- nombre varchar(20), 
-- descripcion varchar(100), 
-- actividad INT, 
-- FOREIGN KEY(actividad) REFERENCES ACTIVIDADES(id));
-- 
-- CREATE TABLE listarutas(
-- practica INT,
-- ruta INT,
-- FOREIGN KEY(practica) REFERENCES practicas(id),
-- FOREIGN KEY(ruta) REFERENCES rutas(id)
-- );
-- 
CREATE TABLE roles(
id int PRIMARY KEY AUTO_INCREMENT, 
roltitulo VARCHAR(100), 
roldescripcion VARCHAR(500), 
rolperfilRecomendado VARCHAR(1500));

CREATE TABLE listaroles(
practica INT, 
rol INT,
FOREIGN KEY(practica) REFERENCES practicas(id),
FOREIGN KEY(rol) REFERENCES roles(id)
);

CREATE TABLE integrantes(
id int PRIMARY KEY AUTO_INCREMENT, 
usuario INT, 
rol INT,
FOREIGN KEY(rol) REFERENCES ROLES(id),
FOREIGN KEY(usuario) REFERENCES usuarios(id));

CREATE TABLE listaactividades(
integrante INT, 
actividad INT,
FOREIGN KEY(integrante) references integrantes(id),
FOREIGN KEY(actividad) references actividades(id)
);

CREATE TABLE contenidos(
id int primary key AUTO_INCREMENT, 
contenidonombre VARCHAR(250),
contenidonombrearchivo VARCHAR(500), 
contenidodescripcion varchar(200), 
contenidobibliografica VARCHAR(1500));

CREATE TABLE entregables(
id int PRIMARY KEY AUTO_INCREMENT, 
entregatitulo VARCHAR(200), 
entregadescripcion VARCHAR(1000), 
entregaestado varchar(20),
entregatipoArchivo varchar(20), 
entregafechaEntrega DATE, 
entreganumeroRevisiones INT );

CREATE TABLE listaentregables(
alfa INT,
entregable INT,
FOREIGN KEY(alfa) REFERENCES alfas(id),
FOREIGN KEY(entregable) REFERENCES entregables);

CREATE TABLE listaherramientasmetodologia(
entregable INT , 
herramientametodologia INT,
FOREIGN KEY(entregable) REFERENCES entregables(id),
FOREIGN KEY(herramientametodologia) REFERENCES herramientasmetodologia(id));

CREATE TABLE listacontenidos(
entregable INT , 
contenido INT,
FOREIGN KEY(entregable) REFERENCES entregables(id),
FOREIGN KEY(contenido) REFERENCES contenidos(id));

CREATE TABLE entregas(
id int PRIMARY KEY AUTO_INCREMENT, 
entregastitulo VARCHAR(300),
entregasdescripcion VARCHAR(1000),
entregasnombrearchivoguardado VARCHAR(300),
actividad INT,
entragable INT ,
FOREIGN KEY(actividad) REFERENCES actividades(id),
FOREIGN KEY(entragable) REFERENCES entregables(id));

CREATE TABLE chats(
id int PRIMARY KEY AUTO_INCREMENT, 
chatnombreArchivo VARCHAR(150), 
chatfecha DATE);

CREATE TABLE historiales(
id int PRIMARY KEY AUTO_INCREMENT, 
historiadescripcion VARCHAR(1000)
);


CREATE TABLE listachats(
historial int,
chat INT,
FOREIGN KEY(historial) REFERENCES historiales(id),
FOREIGN KEY(chat) REFERENCES chats(id)
); 

CREATE TABLE proyectos (
id INT PRIMARY KEY AUTO_INCREMENT, 
proyectonombre VARCHAR(350), 
proyectodescripcion VARCHAR(1350), 
proyectoestado VARCHAR(150), 
proyectoicon VARCHAR(1000), 
proyectobanner VARCHAR(1000), 
historia INT, 
metodologia INT,
FOREIGN KEY(historia) REFERENCES HISTORIALES(id),
FOREIGN KEY(metodologia) REFERENCES metodologias(id));

CREATE TABLE eventos(
id int PRIMARY KEY AUTO_INCREMENT,  
eventofechacreacion DATE);

CREATE TABLE reuniones(
id int PRIMARY KEY AUTO_INCREMENT,
reuniontitulo VARCHAR(500),
reunionfecha DATE,
reunionhora VARCHAR(15),
reuniondurancion DOUBLE,
reuniondescripcion VARCHAR(1000),
vigente BOOL); 

CREATE TABLE listareuniones(
evento INT ,
reunion INT,
FOREIGN KEY(evento) REFERENCES eventos(id),
FOREIGN KEY(reunion) REFERENCES reuniones(id)); 

CREATE TABLE listaentregas(
evento INT ,
entregable INT,
FOREIGN KEY(evento) REFERENCES eventos(id),
FOREIGN KEY(entregable) REFERENCES entregables(id) ); 

CREATE TABLE listaeventos(
historial INT,
evento INT,
integrante INT, 
FOREIGN KEY(historial) REFERENCES historiales(id),
FOREIGN KEY(evento) REFERENCES eventos(id),
FOREIGN KEY(integrante) REFERENCES integrantes(id)
);


CREATE TABLE listaintegrantes(
proyecto INT,  
integrante INT,
FOREIGN KEY(proyecto) REFERENCES proyectos(id),
FOREIGN KEY(integrante) REFERENCES integrantes(id));
-- fin de la seccion de la metodologia


































 


