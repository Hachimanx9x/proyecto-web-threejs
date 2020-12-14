CREATE DATABASE proyectoweb; 
USE proyectoweb;
-- Sector de los usuarios
CREATE TABLE idiomas(
id int PRIMARY KEY AUTO_INCREMENT, 
nombre VARCHAR(35), 
nivel VARCHAR(150));


CREATE TABLE habilidades(
id int PRIMARY KEY AUTO_INCREMENT, 
tipo varchar(40), 
descripcion varchar(40), 
nivel varchar(20)); 


CREATE TABLE herramientas(
id int PRIMARY KEY AUTO_INCREMENT, 
nombre VARCHAR(120), 
tipo VARCHAR(100), 
descripcion varchar(1000), 
nombreIcono VARCHAR(75));


CREATE TABLE usuarios(
id INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(250),
contrasena VARCHAR(15),
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

CREATE TABLE listaidiomas (
usuario INT,
idioma INT ,
FOREIGN KEY(usuario) REFERENCES usuarios(id),
FOREIGN KEY(idioma) REFERENCES idiomas(id));


CREATE TABLE contactos(
id int PRIMARY KEY AUTO_INCREMENT, 
usuario INT,
preferencias BOOLEAN, 
FOREIGN KEY(usuario) REFERENCES usuarios(id));

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
nombre VARCHAR(500), 
descripcion VARCHAR(1500),
consejo VARCHAR(500));

CREATE TABLE practicas (
id int PRIMARY KEY AUTO_INCREMENT, 
nombre VARCHAR(500),
descripcion VARCHAR(2000));

CREATE TABLE listapracticas(
metodologia INT,  
practica INT,
FOREIGN KEY(metodologia) REFERENCES metodologias(id),
FOREIGN KEY(practica) REFERENCES practicas(id));

CREATE TABLE alfas (
id int PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(300),
descripcion VARCHAR(1500),
estado VARCHAR(35));


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
titulo VARCHAR(500), 
descripcion VARCHAR(1500),
bibliografia VARCHAR(1500),
herramientametodologia INT,
FOREIGN KEY(herramientametodologia) REFERENCES herramientasmetodologia(id));

CREATE TABLE actividades(
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(1000),
estado VARCHAR(300),
descripcion VARCHAR(1200),
fechacreacion DATE,
fechaentrega DATE,
revision INT,
tecnica INT,
FOREIGN KEY(tecnica) REFERENCES tecnicas(id)
);


CREATE TABLE rutas(
id int PRIMARY KEY AUTO_INCREMENT, 
nombre varchar(20), 
descripcion varchar(100), 
actividad INT, 
FOREIGN KEY(actividad) REFERENCES ACTIVIDADES(id));

CREATE TABLE listarutas(
practica INT,
ruta INT,
FOREIGN KEY(practica) REFERENCES practicas(id),
FOREIGN KEY(ruta) REFERENCES rutas(id)
);

CREATE TABLE roles(
id int PRIMARY KEY AUTO_INCREMENT, 
titulo VARCHAR(100), 
descripcion VARCHAR(500), 
perfilRecomencado VARCHAR(1500));

CREATE TABLE listaroles(
practica INT, 
rol INT,
FOREIGN KEY(practica) REFERENCES practicas(id),
FOREIGN KEY(rol) REFERENCES roles(id)
);

CREATE TABLE integrantes(
id int PRIMARY KEY AUTO_INCREMENT, 
usuario varchar(50), 
rol INT,
FOREIGN KEY(rol) REFERENCES ROLES(id));

CREATE TABLE listaactividades(
integrante INT, 
actividad INT,
FOREIGN KEY(integrante) references integrantes(id),
FOREIGN KEY(actividad) references actividades(id)
);

CREATE TABLE contenidos(
id int primary key AUTO_INCREMENT, 
nombre VARCHAR(250),
nombrearchivo VARCHAR(500), 
descripcion varchar(200), 
bibliografica VARCHAR(1500));

CREATE TABLE entregables(
id int PRIMARY KEY AUTO_INCREMENT, 
titulo VARCHAR(200), 
descripcion VARCHAR(1000), 
estado varchar(20),
tipoArchivo varchar(20), 
fechaEntrega DATE, 
numeroRevisiones INT );

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
titulo VARCHAR(300),
descripcion VARCHAR(1000),
nombrearchivoguardado VARCHAR(300),
actividad INT,
entragable INT ,
FOREIGN KEY(actividad) REFERENCES actividades(id),
FOREIGN KEY(entragable) REFERENCES entregables(id));

CREATE TABLE chats(
id int PRIMARY KEY AUTO_INCREMENT, 
nombreArchivo VARCHAR(150), 
fecha DATE);

CREATE TABLE historiales(
id int PRIMARY KEY AUTO_INCREMENT, 
descripcion VARCHAR(1000)
);


CREATE TABLE listachats(
historial int,
chat INT,
FOREIGN KEY(historial) REFERENCES historiales(id),
FOREIGN KEY(chat) REFERENCES chats(id)
); 

CREATE TABLE proyectos (
id INT PRIMARY KEY AUTO_INCREMENT, 
nombre VARCHAR(350), 
descripcion VARCHAR(1350), 
estado VARCHAR(150), 
icon VARCHAR(1000), 
banner VARCHAR(1000), 
listaintegrante INT , 
historia INT, 
metodologia INT,
FOREIGN KEY(historia) REFERENCES HISTORIALES(id),
FOREIGN KEY(metodologia) REFERENCES metodologias(id));

CREATE TABLE eventos(
id int PRIMARY KEY AUTO_INCREMENT,  
fechacreacion DATE);

CREATE TABLE reuniones(
id int PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(500),
fecha DATE,
hora VARCHAR(15),
durancion DOUBLE,
descripcion VARCHAR(1000),
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
historial INTproyectoweb,
evento INT,
FOREIGN KEY(historial) REFERENCES historiales(id),
FOREIGN KEY(evento) REFERENCES eventos(id)
);


CREATE TABLE listaintegrantes(
reunion INT,
proyecto INT,
entrega INT,  
integrante INT,
FOREIGN KEY(reunion) REFERENCES reuniones(id),
FOREIGN KEY(proyecto) REFERENCES proyectos(id),
FOREIGN KEY(entrega) REFERENCES entregas(id),
FOREIGN KEY(integrante) REFERENCES integrantes(id));
-- fin de la seccion de la metodologia


































 


