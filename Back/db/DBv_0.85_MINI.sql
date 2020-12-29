
CREATE TABLE idiomas(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
idiomanombre VARCHAR
(35), 
idiomanivel VARCHAR
(150));


CREATE TABLE habilidades(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
habilidadtipo varchar
(40), 
habilidaddescripcion varchar
(40), 
habilidadnivel varchar
(20));


CREATE TABLE herramientas(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
herramientanombre VARCHAR
(120), 
herramientatipo VARCHAR
(100), 
herramientadescripcion varchar
(1000), 
herramientanombreIcono VARCHAR
(75));


CREATE TABLE usuarios(
id INTEGER PRIMARY KEY AUTOINCREMENT,
email VARCHAR
(250),
contrasena VARCHAR
(15),
fotoperfil VARCHAR
(100), 
nombrearchivohojadevida VARCHAR
(150),
anosdeexperiencia INTEGER,
nombre VARCHAR
(230),
descripcion  VARCHAR
(1000),
pais  VARCHAR
(100),
edad  INTEGER,
github VARCHAR
(130),
gitlab VARCHAR
(130),
bitbucket VARCHAR
(130),
linkedin VARCHAR
(130)
);
CREATE TABLE palabrasclave (
id INTEGER PRIMARY KEY AUTOINCREMENT,
pcusuario INTEGER,
palabra VARCHAR
(150),
FOREIGN KEY
(pcusuario) REFERENCES usuarios
(id)
);
CREATE TABLE listaidiomas
(
    usuario INTEGER,
    idioma INTEGER ,
    FOREIGN KEY(usuario) REFERENCES usuarios(id),
    FOREIGN KEY(idioma) REFERENCES idiomas(id)
);


CREATE TABLE contactos(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
contactousuario INTEGER,
preferencias BOOLEAN, 
FOREIGN KEY
(contactousuario) REFERENCES usuarios
(id));

CREATE TABLE listacontactos
(
    usuario INTEGER ,
    contacto INTEGER,
    FOREIGN KEY(usuario) REFERENCES usuarios(id),
    FOREIGN KEY(contacto) REFERENCES contactos(id)
);


CREATE TABLE listahabilidades
(
    usuario INTEGER ,
    habilidad INTEGER,
    FOREIGN KEY(usuario) REFERENCES usuarios(id),
    FOREIGN KEY(habilidad) REFERENCES habilidades(id)
);

CREATE TABLE listaherramientas
(
    usuario INTEGER ,
    herramientausada INTEGER,
    FOREIGN KEY(usuario) REFERENCES usuarios(id),
    FOREIGN KEY(herramientausada) REFERENCES herramientas(id)
);

-- fin de la parte de usuarios


-- inicio de la parte de la metodologia

CREATE TABLE metodologias(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
metodologianombre VARCHAR
(500), 
metodologiadescripcion VARCHAR
(1500),
metodologiaconsejo VARCHAR
(500));

CREATE TABLE practicas (
id INTEGER PRIMARY KEY AUTOINCREMENT, 
practicanombre VARCHAR
(500),
practicadescripcion VARCHAR
(2000));

CREATE TABLE listapracticas
(
    metodologia INTEGER,
    practica INTEGER,
    FOREIGN KEY(metodologia) REFERENCES metodologias(id),
    FOREIGN KEY(practica) REFERENCES practicas(id)
);

CREATE TABLE alfas (
id INTEGER PRIMARY KEY AUTOINCREMENT,
alfanombre VARCHAR
(300),
alfadescripcion VARCHAR
(1500),
alfaestado VARCHAR
(35));


CREATE TABLE listaalfas
(
    practica INTEGER,
    alfa INTEGER,
    FOREIGN KEY(practica) REFERENCES practicas(id),
    FOREIGN KEY(alfa) REFERENCES alfas(id)
);

CREATE TABLE herramientasmetodologia(	
id INTEGER PRIMARY KEY AUTOINCREMENT, 
nombre VARCHAR
(150), 
descripcion VARCHAR
(500), 
bibliografia VARCHAR
(150));

CREATE TABLE tecnicas(
id INTEGER PRIMARY KEY AUTOINCREMENT,
tecnicatitulo VARCHAR
(500), 
tecnicadescripcion VARCHAR
(1500),
tecnicabibliografia VARCHAR
(1500));

CREATE TABLE actividades(
id INTEGER PRIMARY KEY AUTOINCREMENT,
actividadtitulo VARCHAR
(1000),
actividadestado VARCHAR
(300),
actividaddescripcion VARCHAR
(1200),
actividadfechacreacion DATE,
actividadfechaentrega DATE,
actividadrevision INTEGER,
tecnica INTEGER,
FOREIGN KEY
(tecnica) REFERENCES tecnicas
(id)
);


CREATE TABLE roles(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
roltitulo VARCHAR
(100), 
roldescripcion VARCHAR
(500), 
rolperfilRecomendado VARCHAR
(1500));

CREATE TABLE listaroles
(
    practica INTEGER,
    rol INTEGER,
    FOREIGN KEY(practica) REFERENCES practicas(id),
    FOREIGN KEY(rol) REFERENCES roles(id)
);

CREATE TABLE integrantes(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
usuario INTEGER, 
rol INTEGER,
FOREIGN KEY
(rol) REFERENCES ROLES
(id),
FOREIGN KEY
(usuario) REFERENCES usuarios
(id));

CREATE TABLE listaactividades
(
    integrante INTEGER,
    actividad INTEGER,
    FOREIGN KEY(integrante) references integrantes(id),
    FOREIGN KEY(actividad) references actividades(id)
);

CREATE TABLE contenidos(
id INTEGER primary key AUTOINCREMENT, 
contenidonombre VARCHAR
(250),
contenidonombrearchivo VARCHAR
(500), 
contenidodescripcion varchar
(200), 
contenidobibliografica VARCHAR
(1500));

CREATE TABLE entregables(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
entregatitulo VARCHAR
(200), 
entregadescripcion VARCHAR
(1000), 
entregaestado varchar
(20),
entregatipoArchivo varchar
(20), 
entregafechaEntrega DATE, 
entreganumeroRevisiones INTEGER );

CREATE TABLE listaentregables
(
    alfa INTEGER,
    entregable INTEGER,
    FOREIGN KEY(alfa) REFERENCES alfas(id),
    FOREIGN KEY(entregable) REFERENCES entregables
);

CREATE TABLE listaherramientasmetodologia
(
    entregable INTEGER ,
    herramientametodologia INTEGER,
    FOREIGN KEY(entregable) REFERENCES entregables(id),
    FOREIGN KEY(herramientametodologia) REFERENCES herramientasmetodologia(id)
);

CREATE TABLE listacontenidos
(
    entregable INTEGER ,
    contenido INTEGER,
    actividad INTEGER,
    FOREIGN KEY(actividad) REFERENCES actividades(id),
    FOREIGN KEY(entregable) REFERENCES entregables(id),
    FOREIGN KEY(contenido) REFERENCES contenidos(id)
);

CREATE TABLE entregas(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
entregastitulo VARCHAR
(300),
entregasdescripcion VARCHAR
(1000),
entregasnombrearchivoguardado VARCHAR
(300),
actividad INTEGER,
entragable INTEGER ,
FOREIGN KEY
(actividad) REFERENCES actividades
(id),
FOREIGN KEY
(entragable) REFERENCES entregables
(id));

CREATE TABLE chats(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
chatnombreArchivo VARCHAR
(150), 
chatfecha DATE);

CREATE TABLE historiales(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
historiadescripcion VARCHAR
(1000)
);


CREATE TABLE listachats
(
    historial INTEGER,
    chat INTEGER,
    FOREIGN KEY(historial) REFERENCES historiales(id),
    FOREIGN KEY(chat) REFERENCES chats(id)
);

CREATE TABLE proyectos (
id INTEGER PRIMARY KEY AUTOINCREMENT, 
proyectonombre VARCHAR
(350), 
proyectodescripcion VARCHAR
(1350), 
proyectoestado VARCHAR
(150), 
proyectoicon VARCHAR
(1000), 
proyectobanner VARCHAR
(1000), 
historia INTEGER, 
metodologia INTEGER,
FOREIGN KEY
(historia) REFERENCES HISTORIALES
(id),
FOREIGN KEY
(metodologia) REFERENCES metodologias
(id));

CREATE TABLE eventos(
id INTEGER PRIMARY KEY AUTOINCREMENT,  
eventofechacreacion DATE);

CREATE TABLE reuniones(
id INTEGER PRIMARY KEY AUTOINCREMENT,
reuniontitulo VARCHAR
(500),
reunionfecha DATE,
reunionhora VARCHAR
(15),
reuniondurancion DOUBLE,
reuniondescripcion VARCHAR
(1000),
vigente BOOL);

CREATE TABLE listareuniones
(
    evento INTEGER ,
    reunion INTEGER,
    FOREIGN KEY(evento) REFERENCES eventos(id),
    FOREIGN KEY(reunion) REFERENCES reuniones(id)
);

CREATE TABLE listaentregas
(
    evento INTEGER ,
    entregable INTEGER,
    FOREIGN KEY(evento) REFERENCES eventos(id),
    FOREIGN KEY(entregable) REFERENCES entregables(id)
);

CREATE TABLE listaeventos
(
    historial INTEGER,
    evento INTEGER,
    integrante INTEGER,
    FOREIGN KEY(historial) REFERENCES historiales(id),
    FOREIGN KEY(evento) REFERENCES eventos(id),
    FOREIGN KEY(integrante) REFERENCES integrantes(id)
);


CREATE TABLE listaintegrantes
(
    proyecto INTEGER,
    integrante INTEGER,
    FOREIGN KEY(proyecto) REFERENCES proyectos(id),
    FOREIGN KEY(integrante) REFERENCES integrantes(id)
);
-- fin de la seccion de la metodologia
