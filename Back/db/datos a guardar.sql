USE proyectoweb;

INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","A1 Beginner");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","A2 Elementary");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","B1 LowerIntermediate");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","B2 Intermediate");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","C1 Upperintermediate");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","C2 Advanced");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","native");

INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Español","A1 Acceso/Elemental");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Español","A2 Plataforma/Básico");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Español","B1 Intermedio");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Español","B2 Intermedio alto/Avanzado");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Español","C1 Superior");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Español","C2 Perfeccionamiento");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Español","nativo");
 SELECT * FROM idiomas ; 

INSERT INTO usuarios (email, contrasena, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion,pais ,edad, github, girlab,bitbucket,linkedin)
VALUES("micorreo2@uao.edu.co", "contraseña123", "asdqdqsdwqds.txt", 0, "nestor ivan martinez marulanda", "Soy una persona que le gusta le modelo 3d la programacion y aprender cosas","Colombia", 21, "https://github.com/Accelx9", NULL,NULL,NULL);
INSERT INTO usuarios (email, contrasena, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion,pais ,edad, github, girlab,bitbucket,linkedin)
VALUES("micorreo@uao.edu.co", "contraseña123", "asdqdqsdwqds.txt", 0, "diego fernando bolaños", "Soy una persona que le gusta la programacion y aprender cosas","Colombia", 26, "https://github.com/Hachimanx9x", NULL,NULL,NULL);

SELECT * FROM usuarios; 

INSERT INTO listaidiomas VALUES (1, 14);
INSERT INTO listaidiomas VALUES (1, 4);
INSERT INTO listaidiomas VALUES (2, 14);
INSERT INTO listaidiomas VALUES (2, 2);
SELECT * FROM listaidiomas ;

INSERT INTO habilidades (tipo, descripcion, nivel)  VALUES ("diseño ui", "Expecialista en diseño para la web", "medio") ; 
INSERT INTO habilidades (tipo, descripcion, nivel)  VALUES ("diseño software", "Expecialista seguridad", "alto") ; 
INSERT INTO habilidades (tipo, descripcion, nivel)  VALUES ("programador", "construcción de servidores", "medio") ; 
SELECT * FROM habilidades; 


INSERT INTO listahabilidades VALUES(1, 1);
INSERT INTO listahabilidades VALUES(1, 2);

INSERT INTO listahabilidades VALUES(2, 2);
INSERT INTO listahabilidades VALUES(2, 3);

SELECT * FROM listahabilidades; 



INSERT INTO contactos (usuario, preferencias) VALUES (1, TRUE);
INSERT INTO contactos (usuario, preferencias) VALUES (2, FALSE);
SELECT * FROM contactos;

INSERT INTO listacontactos VALUES(1, 2);
INSERT INTO listacontactos VALUES(2, 1);
SELECT * FROM listacontactos; 

INSERT INTO herramientas (nombre, tipo,descripcion, nombreIcono) VALUES ("nodejs","Desarrollo software", "Node.js es un entorno multiplataforma, basado en el lenguaje de programación JavaScript.","nodejslogo.svg"); 
INSERT INTO herramientas (nombre, tipo,descripcion, nombreIcono) VALUES ("Bootstrap","Desarrollo web", "Bootstrap es una biblioteca multiplataforma para el diseño de entornos web.","Bootstraplogo.svg"); 
INSERT INTO herramientas (nombre, tipo,descripcion, nombreIcono) VALUES ("Go","Desarrollo software", "Go es un lenguaje de programación concurrente y compilado inspirado en la sintaxis de C","golanglogo.svg"); 
SELECT * FROM herramientas; 


INSERT INTO listaherramientas VALUES(1,1); 
INSERT INTO listaherramientas VALUES(1,2); 
INSERT INTO listaherramientas VALUES(2,1); 
INSERT INTO listaherramientas VALUES(2,3); 
SELECT * FROM listaherramientas; 



