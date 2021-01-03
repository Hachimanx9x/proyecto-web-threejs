
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
-- insertar datos

INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Ingles", "A1 Beginner");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Ingles", "A2 Elementary");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Ingles", "B1 LowerIntermediate");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Ingles", "B2 Intermediate");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Ingles", "C1 Upperintermediate");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Ingles", "C2 Advanced");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Ingles", "native");

INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Español", "A1 Acceso/Elemental");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Español", "A2 Plataforma/Básico");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Español", "B1 Intermedio");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Español", "B2 Intermedio alto/Avanzado");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Español", "C1 Superior");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Español", "C2 Perfeccionamiento");
INSERT INTO IDIOMAS
    (idiomanombre, idiomanivel)
VALUES
    ("Español", "nativo");
SELECT *
FROM idiomas
;

INSERT INTO usuarios
    (email, contrasena,fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion,pais ,edad, github, gitlab,bitbucket,linkedin)
VALUES("micorreo2@uao.edu.co", "contraseña123", "fotodefault1.jpg" , "asdqdqsdwqds.txt", 0, "nestor ivan martinez marulanda", "Soy una persona que le gusta le modelo 3d la programacion y aprender cosas", "Colombia", 21, "https://github.com/Accelx9", NULL, NULL, NULL);
INSERT INTO usuarios
    (email, contrasena,fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion,pais ,edad, github, gitlab,bitbucket,linkedin)
VALUES("micorreo@uao.edu.co", "contraseña123", "fotodefault1.jpg", "asdqdqsdwqds.txt", 0, "diego fernando bolaños", "Soy una persona que le gusta la programacion y aprender cosas", "Colombia", 26, "https://github.com/Hachimanx9x", NULL, NULL, NULL);

SELECT *
FROM usuarios;
INSERT INTO palabrasclave
    (pcusuario, palabra)
VALUES(1, "web develoment");
INSERT INTO palabrasclave
    (pcusuario, palabra)
VALUES(1, "3d modeler");
INSERT INTO palabrasclave
    (pcusuario, palabra)
VALUES(1, "perro");

INSERT INTO palabrasclave
    (pcusuario, palabra)
VALUES(2, "web develoment");
INSERT INTO palabrasclave
    (pcusuario, palabra)
VALUES(2, "Programmer in js");
SELECT *
FROM palabrasclave
;
INSERT INTO listaidiomas
VALUES
    (1, 14);
INSERT INTO listaidiomas
VALUES
    (1, 4);
INSERT INTO listaidiomas
VALUES
    (2, 14);
INSERT INTO listaidiomas
VALUES
    (2, 2);
SELECT *
FROM listaidiomas
;

INSERT INTO habilidades
    (habilidadtipo, habilidaddescripcion, habilidadnivel)
VALUES
    ("diseño ui", "Expecialista en diseño para la web", "medio")
;
INSERT INTO habilidades
    (habilidadtipo, habilidaddescripcion, habilidadnivel)
VALUES
    ("diseño software", "Expecialista seguridad", "alto")
;
INSERT INTO habilidades
    (habilidadtipo, habilidaddescripcion, habilidadnivel)
VALUES
    ("programador", "construcción de servidores", "medio")
;
SELECT *
FROM habilidades;


INSERT INTO listahabilidades
VALUES(1, 1);
INSERT INTO listahabilidades
VALUES(1, 2);

INSERT INTO listahabilidades
VALUES(2, 2);
INSERT INTO listahabilidades
VALUES(2, 3);

SELECT *
FROM listahabilidades;



INSERT INTO contactos
    (contactousuario, preferencias)
VALUES
    (1, TRUE);
INSERT INTO contactos
    (contactousuario, preferencias)
VALUES
    (2, FALSE);
SELECT *
FROM contactos;

INSERT INTO listacontactos
VALUES(1, 2);
INSERT INTO listacontactos
VALUES(2, 1);
SELECT *
FROM listacontactos;

INSERT INTO herramientas
    (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono)
VALUES
    ("nodejs", "Desarrollo software", "Node.js es un entorno multiplataforma, basado en el lenguaje de programación JavaScript.", "nodejslogo.svg");
INSERT INTO herramientas
    (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono)
VALUES
    ("Bootstrap", "Desarrollo web", "Bootstrap es una biblioteca multiplataforma para el diseño de entornos web.", "Bootstraplogo.svg");
INSERT INTO herramientas
    (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono)
VALUES
    ("Go", "Desarrollo software", "Go es un lenguaje de programación concurrente y compilado inspirado en la sintaxis de C", "golanglogo.svg");
SELECT *
FROM herramientas;


INSERT INTO listaherramientas
VALUES(1, 1);
INSERT INTO listaherramientas
VALUES(1, 2);
INSERT INTO listaherramientas
VALUES(2, 1);
INSERT INTO listaherramientas
VALUES(2, 3);
SELECT *
FROM listaherramientas;

INSERT INTO metodologias
    (metodologianombre, metodologiadescripcion,metodologiaconsejo )
VALUES("metodologia para preprodución de un sistema multimedia [MPSM]", "es modular tiene varias practicas modular que utiliza las buenas practicas para la diseño de un sistema multimedia apoyado en metodos agiles", "sigue tu corazon");
SELECT *
FROM metodologias;


INSERT INTO historiales
    (historiadescripcion)
VALUES("esta hara seguimiento a todos los suscesos echos en el prouyecto asociado");
SELECT *
FROM historiales;

INSERT INTO proyectos
    (proyectonombre, proyectodescripcion, proyectoestado, proyectoicon,proyectobanner, metodologia, historia)
VALUES("Desarrollo de un entorno virtual colaborativo para preproducción de un sistema multimedia", "Como se expone en el apartado de planteamiento del problema los equipos de trabajo encargados de la preproducción de un sistema multimedia poseen muchos retos en la gestión, por lo tanto, el sistema propuesto por este documento podrá garantizar los siguientes beneficios", "iniciada", "iconoTemporaldelsistema.jpg", "bannertemporal.jpg", 1, 1);
SELECT *
FROM proyectos;

INSERT INTO practicas
    (practicanombre, practicadescripcion )
VALUES
    ("concepción del experiencia multimedia [CEM]", "se estara haciendo uso de fierentes herramientras para creacion de una ccorrecta experiencia");
INSERT INTO practicas
    (practicanombre, practicadescripcion )
VALUES
    ("sistema multimedia minimo viable [SMMV]", "En este aparatado se establecera el minimo producto viable a entregar ");
SELECT *
FROM practicas
;

INSERT INTO listapracticas
VALUES
    (1, 1);
INSERT INTO listapracticas
VALUES
    (1, 2);
SELECT *
FROM listapracticas;

INSERT INTO roles
    (roltitulo , roldescripcion , rolperfilRecomendado)
VALUES
    ("arquitecto de expericia multimedia [AEM]", "es el escargado de dirigil, coordinar y estrucutrar todo lo relacionado con la expericia final del sistema", "Diseñador ui");
INSERT INTO roles
    (roltitulo , roldescripcion , rolperfilRecomendado)
VALUES
    ("arquitecto de informacion [AI]", "es el escargado estructural toda la informacion mostrada en el sistema asi mismo como todo la informacion de sosporte para el equipo", "Diseñador back-end");
SELECT *
FROM roles;


INSERT INTO listaroles
VALUES
    (1, 1);
INSERT INTO listaroles
VALUES
    (1, 2);
INSERT INTO listaroles
VALUES
    (2, 1);
INSERT INTO listaroles
VALUES
    (2, 2);

SELECT *
FROM listaroles;

INSERT INTO integrantes
    (usuario, rol)
VALUES(1, 1);
INSERT INTO integrantes
    (usuario, rol)
VALUES(2, 2);
SELECT *
FROM integrantes;

INSERT INTO listaintegrantes
values(1, 1);
INSERT INTO listaintegrantes
values(1, 2);
SELECT *
FROM listaintegrantes;


INSERT INTO alfas
    (alfanombre, alfadescripcion,alfaestado)
VALUES("Oportunidad", "estudia la aceptacion de la propuesta en el mercado", "iniciado");
INSERT INTO alfas
    (alfanombre, alfadescripcion,alfaestado)
VALUES("Valor del sistema multimedia", "Es una sub-alfa que se inscribe en el alfa de Oportunidad, concebida para llevar a cabo la concreción de la propuesta de valor del Sistema Multimedia mínimo viable.", "iniciado");
INSERT INTO alfas
    (alfanombre, alfadescripcion,alfaestado)
VALUES("Experiencia multimedia", "estudia la experiencia multimedia resultante del sistema multimediaproyectoweb", "iniciado");
INSERT INTO alfas
    (alfanombre, alfadescripcion,alfaestado)
VALUES("Diseño responsable", "Es una sub-alfa que se inscribe en el alfa de Experiencia Multimedia de la adaptación producida al kernel de Esencia, concebida para hacer un seguimiento granular al progreso del diseño responsable que debe concebirse para el Sistema Multimedia, y que influye en consecuencia, en la experiencia multimedia.", "iniciado");
SELECT *
FROM alfas;

INSERT INTO listaalfas
VALUES(1, 3);
INSERT INTO listaalfas
VALUES(1, 4);
INSERT INTO listaalfas
VALUES(2, 1);
INSERT INTO listaalfas
VALUES(2, 2);
SELECT *
FROM listaalfas;


INSERT INTO entregables
    (entregatitulo, entregadescripcion, entregaestado, entregatipoArchivo, entregafechaEntrega,entreganumeroRevisiones)
VALUES
    ("Porpuesta de diseño de la EM", "Consiste en un documento en donde se especifica", "asignada", "documento de texto", "2021-01-23", 0);
INSERT INTO entregables
    (entregatitulo, entregadescripcion, entregaestado, entregatipoArchivo, entregafechaEntrega,entreganumeroRevisiones)
VALUES
    ("Especificaciones del diseño responsable", "Consiste en un documento en donde se especifica", "asignada", "documento de texto", "2021-01-23", 0);
SELECT *
FROM entregables;

INSERT INTO tecnicas
    (tecnicatitulo, tecnicadescripcion, tecnicabibliografia)
VALUES
    ("tecnica T1", "esta tecnica no se a terminadado de documentar por lo que se dejara este espacio", "links de la bibliografias");
INSERT INTO tecnicas
    (tecnicatitulo, tecnicadescripcion, tecnicabibliografia)
VALUES
    ("tecnica T2", "esta tecnica no se a terminadado de documentar por lo que se dejara este espacio", "links de la bibliografias");
INSERT INTO tecnicas
    (tecnicatitulo, tecnicadescripcion, tecnicabibliografia)
VALUES
    ("tecnica T3", "esta tecnica no se a terminadado de documentar por lo que se dejara este espacio", "links de la bibliografias");
INSERT INTO tecnicas
    (tecnicatitulo, tecnicadescripcion, tecnicabibliografia)
VALUES
    ("tecnica T4", "esta tecnica no se a terminadado de documentar por lo que se dejara este espacio", "links de la bibliografias");
INSERT INTO tecnicas
    (tecnicatitulo, tecnicadescripcion, tecnicabibliografia)
VALUES
    ("tecnica T5", "esta tecnica no se a terminadado de documentar por lo que se dejara este espacio", "links de la bibliografias");
SELECT *
FROM tecnicas;


INSERT INTO actividades
    (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica)
VALUES
    ("Actividad A1", "asignada", "descripcion de la actividad", "2020-12-14", "2021-02-13", 0, 1 );
INSERT INTO actividades
    (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica)
VALUES
    ("Actividad A2", "asignada", "descripcion de la actividad", "2020-12-14", "2021-02-13", 0, 2 );
INSERT INTO actividades
    (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica)
VALUES
    ("Actividad A3", "asignada", "descripcion de la actividad", "2020-12-14", "2021-02-13", 0, 3 );
INSERT INTO actividades
    (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica)
VALUES
    ("Actividad A4", "asignada", "descripcion de la actividad", "2020-12-14", "2021-02-13", 0, 4 );
INSERT INTO actividades
    (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica)
VALUES
    ("Actividad A5", "asignada", "descripcion de la actividad", "2020-12-14", "2021-02-13", 0, 5 );
SELECT *
FROM actividades;

INSERT INTO listaactividades
VALUES
    (1, 1);
INSERT INTO listaactividades
VALUES
    (1, 2);
INSERT INTO listaactividades
VALUES
    (1, 3);
INSERT INTO listaactividades
VALUES
    (2, 4);
INSERT INTO listaactividades
VALUES
    (2, 5);
SELECT *
FROM listaactividades;

INSERT INTO contenidos
    (contenidonombre, contenidonombrearchivo, contenidodescripcion, contenidobibliografica)
VALUES
    (NULL, NULL, NULL, NULL);
INSERT INTO contenidos
    (contenidonombre, contenidonombrearchivo, contenidodescripcion, contenidobibliografica)
VALUES
    (NULL, NULL, NULL, NULL);
INSERT INTO contenidos
    (contenidonombre, contenidonombrearchivo, contenidodescripcion, contenidobibliografica)
VALUES
    (NULL, NULL, NULL, NULL);
INSERT INTO contenidos
    (contenidonombre, contenidonombrearchivo, contenidodescripcion, contenidobibliografica)
VALUES
    (NULL, NULL, NULL, NULL);
INSERT INTO contenidos
    (contenidonombre, contenidonombrearchivo, contenidodescripcion, contenidobibliografica)
VALUES
    (NULL, NULL, NULL, NULL);
INSERT INTO contenidos
    (contenidonombre, contenidonombrearchivo, contenidodescripcion, contenidobibliografica)
VALUES
    (NULL, NULL, NULL, NULL);
INSERT INTO contenidos
    (contenidonombre, contenidonombrearchivo, contenidodescripcion, contenidobibliografica)
VALUES
    (NULL, NULL, NULL, NULL);
SELECT *
FROM contenidos;
INSERT INTO listacontenidos
    (entregable, contenido, actividad)
VALUES
    (NULL, 1, 1);
INSERT INTO listacontenidos
    (entregable, contenido, actividad)
VALUES
    (NULL, 2, 2);
INSERT INTO listacontenidos
    (entregable, contenido, actividad)
VALUES
    (NULL, 3, 3);
INSERT INTO listacontenidos
    (entregable, contenido, actividad)
VALUES
    (NULL, 4, 4);
INSERT INTO listacontenidos
    (entregable, contenido, actividad)
VALUES
    (NULL, 5, 5);
INSERT INTO listacontenidos
    (entregable, contenido, actividad)
VALUES
    (1, 6, null);
INSERT INTO listacontenidos
    (entregable, contenido, actividad)
VALUES
    (2, 7, null);
SELECT *
FROM listacontenidos;
INSERT INTO chats
    (chatnombreArchivo, chatfecha)
VALUES
    (NULL, NULL);
SELECT *
FROM chats;
INSERT INTO listachats
    (historial, chat)
VALUES
    (1, 1);
SELECT *
FROM listachats;
INSERT INTO reuniones
    (reuniontitulo, reunionfecha, reunionhora,reuniondurancion,reuniondescripcion,vigente)
VALUES
    (NULL, NULL, NULL, NULL, NULL, NULL );
SELECT *
FROM reuniones;
INSERT INTO eventos
    (eventofechacreacion)
VALUES
    (NULL);
SELECT *
FROM eventos;
INSERT INTO listareuniones
    (evento, reunion)
VALUES
    (1, 1);
SELECT *
FROM listareuniones;
INSERT INTO entregas
    (entregastitulo, entregasdescripcion, entregasnombrearchivoguardado , actividad,entragable)
VALUES
    (NULL, null, null, 1, null );
INSERT INTO entregas
    (entregastitulo, entregasdescripcion, entregasnombrearchivoguardado , actividad,entragable)
VALUES
    (NULL, null, null, 2, NULL );
INSERT INTO entregas
    (entregastitulo, entregasdescripcion, entregasnombrearchivoguardado , actividad,entragable)
VALUES
    (NULL, null, null, 3, NULL );
INSERT INTO entregas
    (entregastitulo, entregasdescripcion, entregasnombrearchivoguardado , actividad,entragable)
VALUES
    (NULL, null, null, 4, NULL );
INSERT INTO entregas
    (entregastitulo, entregasdescripcion, entregasnombrearchivoguardado , actividad,entragable)
VALUES
    (NULL, null, null, 5, NULL );

INSERT INTO entregas
    (entregastitulo, entregasdescripcion, entregasnombrearchivoguardado , actividad,entragable)
VALUES
    (NULL, null, null, NULL, 1 );
INSERT INTO entregas
    (entregastitulo, entregasdescripcion, entregasnombrearchivoguardado , actividad,entragable)
VALUES
    (NULL, null, null, NULL, 2 );

SELECT *
FROM entregas;
INSERT INTO listaeventos
    (historial, evento, integrante)
VALUES(1, 1, 1);
INSERT INTO listaeventos
    (historial, evento, integrante)
VALUES(1, 1, 2);
SELECT *
FROM listaeventos;

INSERT INTO listaentregables
    (alfa, entregable)
VALUES
    (3, 1 );
INSERT INTO listaentregables
    (alfa, entregable)
VALUES
    (4, 2 );
SELECT *
FROM listaentregables;
