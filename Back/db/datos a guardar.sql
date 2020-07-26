USE proyectoweb;

INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","A1 Beginner");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","A2 Elementary");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","B1 LowerIntermediate");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","B2 Intermediate");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","C1 Upperintermediate");
INSERT INTO IDIOMAS (nombre, nivel) VALUES ("Ingles","C2 Advanced");
 SELECT * FROM idiomas ; 

INSERT INTO personas (nombre, descripcion, otro, pais , edad  ) VALUES ("nestor ivan martinez marulanda", "Soy una persona que le gusta le modelo 3d la programacion y aprender cosas","https://github.com/Accelx9", "Colombia", 20);
INSERT INTO personas (nombre, descripcion, otro, pais , edad  ) VALUES ("diego fernando bolaños palma", "Soy una persona que le gusta la programacion y aprender cosas","https://github.com/Hachimanx9x", "Colombia", 25);
SELECT * FROM personas; 

INSERT INTO contactos (personas, preferencias) VALUES (1, TRUE);
INSERT INTO contactos (personas, preferencias) VALUES (2, FALSE);
SELECT * FROM contactos;

INSERT INTO herramientas (nombre, tipo,descripcion, url_icono) VALUES ("nodejs","Desarrollo software", "Node.js es un entorno multiplataforma, basado en el lenguaje de programación JavaScript.","https://nodejs.org/static/images/logo.svg"); 
INSERT INTO herramientas (nombre, tipo,descripcion, url_icono) VALUES ("Bootstrap","Desarrollo web", "Bootstrap es una biblioteca multiplataforma para el diseño de entornos web.","https://nodejs.org/static/images/logo.svg"); 
INSERT INTO herramientas (nombre, tipo,descripcion, url_icono) VALUES ("Go","Desarrollo software", "Go es un lenguaje de programación concurrente y compilado inspirado en la sintaxis de C","https://nodejs.org/static/images/logo.svg"); 
SELECT * FROM herramientas; 

INSERT INTO habilidades (tipo, descripcion, nivel,herramientaUsada)  VALUES ("diseño ui", "Expecialista en diseño para la web", "medio", 2) ; 
INSERT INTO habilidades (tipo, descripcion, nivel,herramientaUsada)  VALUES ("diseño software", "Expecialista seguridad", "alto", 1) ; 
INSERT INTO habilidades (tipo, descripcion, nivel,herramientaUsada)  VALUES ("programador", "construcción de servidores", "medio", 3) ; 
SELECT * FROM habilidades; 

INSERT INTO usuarios (correoElectronico, urlHojaVida, contrasena, experiencia,contacto, persona,habilidad) VALUES ("micorreo@uao.edu.co", "link_de_la_hoja_de_vida","contraseña123", 3,1,2,3);
INSERT INTO usuarios (correoElectronico, urlHojaVida, contrasena, experiencia,contacto, persona,habilidad) VALUES ("micorreo@uao.edu.co", "link_de_la_hoja_de_vida","contraseña123", 2,2,1,1);
SELECT * FROM usuarios;




