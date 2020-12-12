-- DROP DATABASE proyectoweb;
-- 
USE proyectoweb; 
-- 
-- SELECT * FROM contenidos ; 
--  INSERT INTO contenidos (nombre, descripcion,url_documentacion, bibliografica, usariopropietario)  VALUES ("act.PNG", "sdasdasdasdasd", "/default/", "nosequeponer", 1) ; 
-- INSERT INTO contenidos (nombre, descripcion,url_documentacion, bibliografica, usariopropietario)  VALUES ("practicas.PNG", "sdasdasdasdasd", "/default/", "nosequeponer", 1) ;
--  SELECT * FROM contenidos ; 
-- SELECT * FROM contenidos WHERE usariopropietario = 1; 

-- SELECT    
-- (@usid:=usuarios.id), 
-- (@pername:=personas.nombre), 
-- (@pername:=personas.descripcion), 
-- usuarios.palabraClave, 
-- herramientas.url_icono, 
-- herramientas.nombre, 
-- herramientas.descripcion		
-- FROM personas
-- JOIN usuarios ON  personas.id = usuarios.persona
-- JOIN idiomas ON usuarios.idioma = idiomas.id
-- JOIN habilidades ON usuarios.habilidad = habilidades.id
-- JOIN herramientas ON habilidades.herramientaUsada = herramientas.id;


-- ALTER TABLE usuarios
-- ADD  CONSTRAINT idioma INT FOREIGN KEY(idioma) REFERENCES idiomas(id);

-- ALTER TABLE usuarios ADD CONSTRAINT idioma FOREIGN KEY (idioma) REFERENCES idiomas(id);

-- UPDATE usuarios
-- SET idioma = 2
-- WHERE id = 2;


SELECT * FROM usuarios; 
-- CREATE TABLE HERRAMIENTAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(30), tipo varchar(20), descripcion varchar(100), url_icono varchar(50));
CREATE TABLE LISTAIDIOMAS (id INT PRIMARY KEY AUTO_INCREMENT, español INT, ingles INT, portugues INT,frances INT,ruso INT,japones INT,aleman INT  ,
FOREIGN KEY(español) REFERENCES IDIOMAS(id),
FOREIGN KEY(ingles) REFERENCES IDIOMAS(id),
FOREIGN KEY(portugues) REFERENCES IDIOMAS(id),
FOREIGN KEY(frances) REFERENCES IDIOMAS(id),
FOREIGN KEY(ruso) REFERENCES IDIOMAS(id),
FOREIGN KEY(japones) REFERENCES IDIOMAS(id),
FOREIGN KEY(aleman) REFERENCES IDIOMAS(id))
-- 
-- CREATE TABLE USUARIOS(id int PRIMARY KEY AUTO_INCREMENT, 
-- correoElectronico VARCHAR(50), urlHojaVida varchar(50), contrasena VARCHAR(15), 
-- experiencia int, contacto INT, persona INT , habilidad INT, listidioma INT,
-- FOREIGN KEY(contacto) REFERENCES CONTACTOS(id),  
-- FOREIGN KEY(persona) REFERENCES PERSONAS(id),  
-- FOREIGN KEY(habilidad) REFERENCES HABILIDADES(id),
-- FOREIGN KEY(listidioma) REFERENCES LISTAIDIOMAS(id));
ALTER TABLE USUARIOS DROP COLUMN idioma;
