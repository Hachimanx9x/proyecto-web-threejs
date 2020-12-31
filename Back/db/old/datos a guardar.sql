
USE proyectoweb;

INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Ingles","A1 Beginner");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Ingles","A2 Elementary");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Ingles","B1 LowerIntermediate");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Ingles","B2 Intermediate");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Ingles","C1 Upperintermediate");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Ingles","C2 Advanced");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Ingles","native");

INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Español","A1 Acceso/Elemental");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Español","A2 Plataforma/Básico");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Español","B1 Intermedio");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Español","B2 Intermedio alto/Avanzado");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Español","C1 Superior");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Español","C2 Perfeccionamiento");
INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Español","nativo");
 SELECT * FROM idiomas ; 

INSERT INTO usuarios (email, contrasena,fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion,pais ,edad, github, gitlab,bitbucket,linkedin)
VALUES("micorreo2@uao.edu.co", "contraseña123","fotodefault1.jpg" ,"asdqdqsdwqds.txt", 0, "nestor ivan martinez marulanda", "Soy una persona que le gusta le modelo 3d la programacion y aprender cosas","Colombia", 21, "https://github.com/Accelx9", NULL,NULL,NULL);
INSERT INTO usuarios (email, contrasena,fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion,pais ,edad, github, gitlab,bitbucket,linkedin)
VALUES("micorreo@uao.edu.co", "contraseña123","fotodefault1.jpg", "asdqdqsdwqds.txt", 0, "diego fernando bolaños", "Soy una persona que le gusta la programacion y aprender cosas","Colombia", 26, "https://github.com/Hachimanx9x", NULL,NULL,NULL);

SELECT * FROM usuarios; 
INSERT INTO palabrasclave (pcusuario, palabra) VALUES(1, "web develoment");
INSERT INTO palabrasclave (pcusuario, palabra) VALUES(1, "3d modeler");
INSERT INTO palabrasclave (pcusuario, palabra) VALUES(1, "perro");

INSERT INTO palabrasclave (pcusuario, palabra) VALUES(2, "web develoment");
INSERT INTO palabrasclave (pcusuario, palabra) VALUES(2, "Programmer in js");
SELECT * FROM palabrasclave ; 
INSERT INTO listaidiomas VALUES (1, 14);
INSERT INTO listaidiomas VALUES (1, 4);
INSERT INTO listaidiomas VALUES (2, 14);
INSERT INTO listaidiomas VALUES (2, 2);
SELECT * FROM listaidiomas ;

INSERT INTO habilidades (habilidadtipo, habilidaddescripcion, habilidadnivel)  VALUES ("diseño ui", "Expecialista en diseño para la web", "medio") ; 
INSERT INTO habilidades (habilidadtipo, habilidaddescripcion, habilidadnivel)  VALUES ("diseño software", "Expecialista seguridad", "alto") ; 
INSERT INTO habilidades (habilidadtipo, habilidaddescripcion, habilidadnivel)  VALUES ("programador", "construcción de servidores", "medio") ; 
SELECT * FROM habilidades; 


INSERT INTO listahabilidades VALUES(1, 1);
INSERT INTO listahabilidades VALUES(1, 2);

INSERT INTO listahabilidades VALUES(2, 2);
INSERT INTO listahabilidades VALUES(2, 3);

SELECT * FROM listahabilidades; 



INSERT INTO contactos (contactousuario, preferencias) VALUES (1, TRUE);
INSERT INTO contactos (contactousuario, preferencias) VALUES (2, FALSE);
SELECT * FROM contactos;

INSERT INTO listacontactos VALUES(1, 2);
INSERT INTO listacontactos VALUES(2, 1);
SELECT * FROM listacontactos; 

INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES ("nodejs","Desarrollo software", "Node.js es un entorno multiplataforma, basado en el lenguaje de programación JavaScript.","nodejslogo.svg"); 
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES ("Bootstrap","Desarrollo web", "Bootstrap es una biblioteca multiplataforma para el diseño de entornos web.","Bootstraplogo.svg"); 
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES ("Go","Desarrollo software", "Go es un lenguaje de programación concurrente y compilado inspirado en la sintaxis de C","golanglogo.svg"); 
SELECT * FROM herramientas; 


INSERT INTO listaherramientas VALUES(1,1); 
INSERT INTO listaherramientas VALUES(1,2); 
INSERT INTO listaherramientas VALUES(2,1); 
INSERT INTO listaherramientas VALUES(2,3); 
SELECT * FROM listaherramientas; 

INSERT INTO metodologias(metodologianombre, metodologiadescripcion,metodologiaconsejo ) VALUES("metodologia para preprodución de un sistema multimedia [MPSM]", "es modular tiene varias practicas modular que utiliza las buenas practicas para la diseño de un sistema multimedia apoyado en metodos agiles","sigue tu corazon");
SELECT * FROM metodologias; 


INSERT INTO historiales(historiadescripcion) VALUES("esta hara seguimiento a todos los suscesos echos en el prouyecto asociado");
SELECT * FROM historiales; 

INSERT INTO proyectos (proyectonombre, proyectodescripcion, proyectoestado, proyectoicon,proyectobanner, metodologia, historia) 
VALUES("Desarrollo de un entorno virtual colaborativo para preproducción de un sistema multimedia", "Como se expone en el apartado de planteamiento del problema los equipos de trabajo encargados de la preproducción de un sistema multimedia poseen muchos retos en la gestión, por lo tanto, el sistema propuesto por este documento podrá garantizar los siguientes beneficios","iniciada","iconoTemporaldelsistema.jpg","bannertemporal.jpg",1,1);
SELECT * FROM proyectos; 

INSERT INTO practicas (practicanombre, practicadescripcion ) VALUES ("concepción del experiencia multimedia [CEM]", "se estara haciendo uso de fierentes herramientras para creacion de una ccorrecta experiencia");
INSERT INTO practicas (practicanombre, practicadescripcion ) VALUES ("sistema multimedia minimo viable [SMMV]", "En este aparatado se establecera el minimo producto viable a entregar ");
SELECT * FROM practicas ; 

INSERT INTO listapracticas VALUES (1, 1); 
INSERT INTO listapracticas VALUES (1, 2); 
SELECT * FROM listapracticas; 

INSERT INTO roles (roltitulo , roldescripcion , rolperfilRecomendado) VALUES ("arquitecto de expericia multimedia [AEM]", "es el escargado de dirigil, coordinar y estrucutrar todo lo relacionado con la expericia final del sistema", "Diseñador ui");
INSERT INTO roles (roltitulo , roldescripcion , rolperfilRecomendado) VALUES ("arquitecto de informacion [AI]", "es el escargado estructural toda la informacion mostrada en el sistema asi mismo como todo la informacion de sosporte para el equipo", "Diseñador back-end");
SELECT * FROM roles; 


INSERT INTO listaroles VALUES (1,1);
INSERT INTO listaroles VALUES (1,2);
INSERT INTO listaroles VALUES (2,1);
INSERT INTO listaroles VALUES (2,2); 

SELECT * FROM listaroles; 

INSERT INTO integrantes (usuario, rol) VALUES(1,1);
INSERT INTO integrantes (usuario, rol) VALUES(2,2);
SELECT * FROM integrantes; 

INSERT INTO listaintegrantes values(1,1);
INSERT INTO listaintegrantes values(1,2);
SELECT * FROM listaintegrantes; 


INSERT INTO alfas (alfanombre, alfadescripcion,alfaestado) VALUES("Oportunidad", "estudia la aceptacion de la propuesta en el mercado","iniciado"); 
INSERT INTO alfas (alfanombre, alfadescripcion,alfaestado) VALUES("Valor del sistema multimedia", "Es una sub-alfa que se inscribe en el alfa de Oportunidad, concebida para llevar a cabo la concreción de la propuesta de valor del Sistema Multimedia mínimo viable.","iniciado"); 
INSERT INTO alfas (alfanombre, alfadescripcion,alfaestado) VALUES("Experiencia multimedia", "estudia la experiencia multimedia resultante del sistema multimediaproyectoweb","iniciado"); 
INSERT INTO alfas (alfanombre, alfadescripcion,alfaestado) VALUES("Diseño responsable", "Es una sub-alfa que se inscribe en el alfa de Experiencia Multimedia de la adaptación producida al kernel de Esencia, concebida para hacer un seguimiento granular al progreso del diseño responsable que debe concebirse para el Sistema Multimedia, y que influye en consecuencia, en la experiencia multimedia.","iniciado"); 
SELECT * FROM alfas; 

INSERT INTO listaalfas VALUES(1, 3);
INSERT INTO listaalfas VALUES(1, 4);
INSERT INTO listaalfas VALUES(2, 1);
INSERT INTO listaalfas VALUES(2, 2);
SELECT * FROM listaalfas; 


INSERT INTO entregables (entregatitulo, entregadescripcion, entregaestado, entregatipoArchivo, entregafechaEntrega,entreganumeroRevisiones) VALUES ("Porpuesta de diseño de la EM", "Consiste en un documento en donde se especifica","asignada","documento de texto", "2021-01-23", 0);
INSERT INTO entregables (entregatitulo, entregadescripcion, entregaestado, entregatipoArchivo, entregafechaEntrega,entreganumeroRevisiones) VALUES ("Especificaciones del diseño responsable", "Consiste en un documento en donde se especifica","asignada","documento de texto", "2021-01-23", 0);
SELECT * FROM entregables; 

INSERT INTO tecnicas (tecnicatitulo, tecnicadescripcion, tecnicabibliografia)  VALUES ("tecnica T1", "esta tecnica no se a terminadado de documentar por lo que se dejara este espacio", "links de la bibliografias"); 
INSERT INTO tecnicas (tecnicatitulo, tecnicadescripcion, tecnicabibliografia)  VALUES ("tecnica T2", "esta tecnica no se a terminadado de documentar por lo que se dejara este espacio", "links de la bibliografias"); 
INSERT INTO tecnicas (tecnicatitulo, tecnicadescripcion, tecnicabibliografia)  VALUES ("tecnica T3", "esta tecnica no se a terminadado de documentar por lo que se dejara este espacio", "links de la bibliografias"); 
INSERT INTO tecnicas (tecnicatitulo, tecnicadescripcion, tecnicabibliografia)  VALUES ("tecnica T4", "esta tecnica no se a terminadado de documentar por lo que se dejara este espacio", "links de la bibliografias"); 
INSERT INTO tecnicas (tecnicatitulo, tecnicadescripcion, tecnicabibliografia)  VALUES ("tecnica T5", "esta tecnica no se a terminadado de documentar por lo que se dejara este espacio", "links de la bibliografias"); 
SELECT * FROM tecnicas; 


INSERT INTO actividades (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica) VALUES ("Actividad A1", "asignada", "descripcion de la actividad", "2020-12-14", "2021-02-13",0,1 ); 
INSERT INTO actividades (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica) VALUES ("Actividad A2", "asignada", "descripcion de la actividad", "2020-12-14", "2021-02-13",0,2 ); 
INSERT INTO actividades (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica) VALUES ("Actividad A3", "asignada", "descripcion de la actividad", "2020-12-14", "2021-02-13",0,3 ); 
INSERT INTO actividades (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica) VALUES ("Actividad A4", "asignada", "descripcion de la actividad", "2020-12-14", "2021-02-13",0,4 ); 
INSERT INTO actividades (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica) VALUES ("Actividad A5", "asignada", "descripcion de la actividad", "2020-12-14", "2021-02-13",0,5 ); 
SELECT * FROM actividades;

INSERT INTO listaactividades VALUES (1,1); 
INSERT INTO listaactividades VALUES (1,2); 
INSERT INTO listaactividades VALUES (1,3); 
INSERT INTO listaactividades VALUES (2,4);
INSERT INTO listaactividades VALUES (2,5);  

SELECT * FROM listaactividades; 
