CREATE TABLE idiomas(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
nombre VARCHAR(35), 
nivel VARCHAR(150));


CREATE TABLE habilidades(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
tipo varchar(40), 
descripcion varchar(40), 
nivel varchar(20)); 


CREATE TABLE herramientas(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
nombre VARCHAR(120), 
tipo VARCHAR(100), 
descripcion varchar(1000), 
nombreIcono VARCHAR(75));


CREATE TABLE usuarios(
id INTEGER PRIMARY KEY AUTOINCREMENT,
email VARCHAR(250),
contrasena VARCHAR(15),
nombrearchivohojadevida VARCHAR(150),
anosdeexperiencia INTEGER,
nombre VARCHAR(230),
descripcion  VARCHAR(1000),
pais  VARCHAR(100),
edad  INTEGER,
github VARCHAR(130),
gitlab VARCHAR(130),
bitbucket VARCHAR(130),
linkedin VARCHAR(130)
);

CREATE TABLE listaidiomas (
usuario INTEGER,
idioma INTEGER ,
FOREIGN KEY(usuario) REFERENCES usuarios(id),
FOREIGN KEY(idioma) REFERENCES idiomas(id));


CREATE TABLE contactos(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
usuario INTEGER,
preferencias BOOLEAN, 
FOREIGN KEY(usuario) REFERENCES usuarios(id));

CREATE TABLE listacontactos(
usuario INTEGER ,
contacto INTEGER,
FOREIGN KEY(usuario) REFERENCES usuarios(id),
FOREIGN KEY(contacto) REFERENCES contactos(id));


CREATE TABLE listahabilidades(
usuario INTEGER ,
habilidad INTEGER,
FOREIGN KEY(usuario) REFERENCES usuarios(id),
FOREIGN KEY(habilidad) REFERENCES habilidades(id) );

CREATE TABLE listaherramientas(
usuario INTEGER , 
herramientausada INTEGER,
FOREIGN KEY(usuario) REFERENCES usuarios(id),
FOREIGN KEY(herramientausada) REFERENCES herramientas(id));

-- fin de la parte de usuarios


-- inicio de la parte de la metodologia

CREATE TABLE metodologias(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
nombre VARCHAR(500), 
descripcion VARCHAR(1500),
consejo VARCHAR(500));

CREATE TABLE practicas (
id INTEGER PRIMARY KEY AUTOINCREMENT, 
nombre VARCHAR(500),
descripcion VARCHAR(2000));

CREATE TABLE listapracticas(
metodologia INTEGER,  
practica INTEGER,
FOREIGN KEY(metodologia) REFERENCES metodologias(id),
FOREIGN KEY(practica) REFERENCES practicas(id));

CREATE TABLE alfas (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre VARCHAR(300),
descripcion VARCHAR(1500),
estado VARCHAR(35));


CREATE TABLE listaalfas(
practica INTEGER,
alfa INTEGER,
FOREIGN KEY(practica) REFERENCES practicas(id),
FOREIGN KEY(alfa) REFERENCES alfas(id)
); 

CREATE TABLE herramientasmetodologia(	
id INTEGER PRIMARY KEY AUTOINCREMENT, 
nombre VARCHAR(150), 
descripcion VARCHAR(500), 
bibliografia VARCHAR(150));

CREATE TABLE tecnicas(
id INTEGER PRIMARY KEY AUTOINCREMENT,
titulo VARCHAR(500), 
descripcion VARCHAR(1500),
bibliografia VARCHAR(1500));

CREATE TABLE actividades(
id INTEGER PRIMARY KEY AUTOINCREMENT,
titulo VARCHAR(1000),
estado VARCHAR(300),
descripcion VARCHAR(1200),
fechacreacion DATE,
fechaentrega DATE,
revision INTEGER,
tecnica INTEGER,
FOREIGN KEY(tecnica) REFERENCES tecnicas(id)
);


CREATE TABLE rutas(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
nombre varchar(20), 
descripcion varchar(100), 
actividad INTEGER,
FOREIGN KEY(actividad) REFERENCES ACTIVIDADES(id));

CREATE TABLE listarutas(
practica INTEGER,
ruta INTEGER,
FOREIGN KEY(practica) REFERENCES practicas(id),
FOREIGN KEY(ruta) REFERENCES rutas(id)
);

CREATE TABLE roles(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
titulo VARCHAR(100), 
descripcion VARCHAR(500), 
perfilRecomendado VARCHAR(1500));

CREATE TABLE listaroles(
practica INTEGER,
rol INTEGER,
FOREIGN KEY(practica) REFERENCES practicas(id),
FOREIGN KEY(rol) REFERENCES roles(id)
);

CREATE TABLE integrantes(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
usuario varchar(50), 
rol INTEGER,
FOREIGN KEY(rol) REFERENCES ROLES(id));

CREATE TABLE listaactividades(
integrante INTEGER,
actividad INTEGER,
FOREIGN KEY(integrante) references integrantes(id),
FOREIGN KEY(actividad) references actividades(id)
);

CREATE TABLE contenidos(
id INTEGER primary key AUTOINCREMENT, 
nombre VARCHAR(250),
nombrearchivo VARCHAR(500), 
descripcion varchar(200), 
bibliografica VARCHAR(1500));

CREATE TABLE entregables(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
titulo VARCHAR(200), 
descripcion VARCHAR(1000), 
estado varchar(20),
tipoArchivo varchar(20), 
fechaEntrega DATE, 
numeroRevisiones INTEGER );

CREATE TABLE listaentregables(
alfa INTEGER,
entregable INTEGER,
FOREIGN KEY(alfa) REFERENCES alfas(id),
FOREIGN KEY(entregable) REFERENCES entregables);

CREATE TABLE listaherramientasmetodologia(
entregable INTEGER , 
herramientametodologia INTEGER,
FOREIGN KEY(entregable) REFERENCES entregables(id),
FOREIGN KEY(herramientametodologia) REFERENCES herramientasmetodologia(id));

CREATE TABLE listacontenidos(
entregable INTEGER , 
contenido INTEGER,
FOREIGN KEY(entregable) REFERENCES entregables(id),
FOREIGN KEY(contenido) REFERENCES contenidos(id));

CREATE TABLE entregas(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
titulo VARCHAR(300),
descripcion VARCHAR(1000),
nombrearchivoguardado VARCHAR(300),
actividad INTEGER,
entragable INTEGER ,
FOREIGN KEY(actividad) REFERENCES actividades(id),
FOREIGN KEY(entragable) REFERENCES entregables(id));

CREATE TABLE chats(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
nombreArchivo VARCHAR(150), 
fecha DATE);

CREATE TABLE historiales(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
descripcion VARCHAR(1000)
);


CREATE TABLE listachats(
historial INTEGER,
chat INTEGER,
FOREIGN KEY(historial) REFERENCES historiales(id),
FOREIGN KEY(chat) REFERENCES chats(id)
); 

CREATE TABLE proyectos (
id INTEGER PRIMARY KEY AUTOINCREMENT, 
nombre VARCHAR(350), 
descripcion VARCHAR(1350), 
estado VARCHAR(150), 
icon VARCHAR(1000), 
banner VARCHAR(1000), 
historia INTEGER,
metodologia INTEGER,
FOREIGN KEY(historia) REFERENCES HISTORIALES(id),
FOREIGN KEY(metodologia) REFERENCES metodologias(id));

CREATE TABLE eventos(
id INTEGER PRIMARY KEY AUTOINCREMENT,  
fechacreacion DATE);

CREATE TABLE reuniones(
id INTEGER PRIMARY KEY AUTOINCREMENT,
titulo VARCHAR(500),
fecha DATE,
hora VARCHAR(15),
durancion DOUBLE,
descripcion VARCHAR(1000),
vigente BOOL); 

CREATE TABLE listareuniones(
evento INTEGER ,
reunion INTEGER,
FOREIGN KEY(evento) REFERENCES eventos(id),
FOREIGN KEY(reunion) REFERENCES reuniones(id)); 

CREATE TABLE listaentregas(
evento INTEGER ,
entregable INTEGER,
FOREIGN KEY(evento) REFERENCES eventos(id),
FOREIGN KEY(entregable) REFERENCES entregables(id) ); 

CREATE TABLE listaeventos(
historial INTEGER,
evento INTEGER,
integrante INTEGER,
FOREIGN KEY(historial) REFERENCES historiales(id),
FOREIGN KEY(evento) REFERENCES eventos(id),
FOREIGN KEY(integrante) REFERENCES integrantes(id)
);


CREATE TABLE listaintegrantes(
proyecto INTEGER, 
integrante INTEGER,
FOREIGN KEY(proyecto) REFERENCES proyectos(id),
FOREIGN KEY(integrante) REFERENCES integrantes(id));
-- fin de la seccion de la metodologia
