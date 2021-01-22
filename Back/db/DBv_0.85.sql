CREATE DATABASE proyectoweb;
USE proyectoweb;
-- Sector de los usuarios
CREATE TABLE idiomas(
id int PRIMARY KEY AUTO_INCREMENT, 
idiomanombre VARCHAR
(35), 
idiomanivel VARCHAR
(150));


CREATE TABLE habilidades(
id int PRIMARY KEY AUTO_INCREMENT, 
habilidadtipo varchar
(40), 
habilidaddescripcion varchar
(40), 
habilidadnivel varchar
(20));


CREATE TABLE herramientas(
id int PRIMARY KEY AUTO_INCREMENT, 
herramientanombre VARCHAR
(120), 
herramientatipo VARCHAR
(100), 
herramientadescripcion varchar
(1000), 
herramientanombreIcono VARCHAR
(75));


CREATE TABLE usuarios(
id INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR
(250),
contrasena VARCHAR
(15),
fotoperfil VARCHAR
(100), 
nombrearchivohojadevida VARCHAR
(150),
anosdeexperiencia INT,
nombre VARCHAR
(230),
descripcion  VARCHAR
(1000),
pais  VARCHAR
(100),
edad  INT,
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
id int PRIMARY KEY AUTO_INCREMENT,
pcusuario INT,
palabra VARCHAR
(150),
FOREIGN KEY
(pcusuario) REFERENCES usuarios
(id)
);
CREATE TABLE listaidiomas
(
    usuario INT,
    idioma INT ,
    FOREIGN KEY(usuario) REFERENCES usuarios(id),
    FOREIGN KEY(idioma) REFERENCES idiomas(id)
);


CREATE TABLE contactos(
id int PRIMARY KEY AUTO_INCREMENT, 
contactousuario INT,
preferencias BOOLEAN, 
FOREIGN KEY
(contactousuario) REFERENCES usuarios
(id));

CREATE TABLE listacontactos
(
    usuario INT ,
    contacto INT,
    FOREIGN KEY(usuario) REFERENCES usuarios(id),
    FOREIGN KEY(contacto) REFERENCES contactos(id)
);


CREATE TABLE listahabilidades
(
    usuario INT ,
    habilidad INT,
    FOREIGN KEY(usuario) REFERENCES usuarios(id),
    FOREIGN KEY(habilidad) REFERENCES habilidades(id)
);

CREATE TABLE listaherramientas
(
    usuario INT ,
    herramientausada INT,
    FOREIGN KEY(usuario) REFERENCES usuarios(id),
    FOREIGN KEY(herramientausada) REFERENCES herramientas(id)
);

-- fin de la parte de usuarios


-- inicio de la parte de la metodologia

CREATE TABLE metodologias(
id int PRIMARY KEY AUTO_INCREMENT, 
metodologianombre VARCHAR
(500), 
metodologiadescripcion VARCHAR
(1500),
metodologiaconsejo VARCHAR
(500));

CREATE TABLE practicas (
id int PRIMARY KEY AUTO_INCREMENT, 
practicanombre VARCHAR
(500),
practicadescripcion VARCHAR
(2000));

CREATE TABLE listapracticas
(
    metodologia INT,
    practica INT,
    FOREIGN KEY(metodologia) REFERENCES metodologias(id),
    FOREIGN KEY(practica) REFERENCES practicas(id)
);

CREATE TABLE alfas (
id int PRIMARY KEY AUTO_INCREMENT,
alfanombre VARCHAR
(300),
alfadescripcion VARCHAR
(1500),
alfaestado VARCHAR
(35));


CREATE TABLE listaalfas
(
    practica INT,
    alfa INT,
    FOREIGN KEY(practica) REFERENCES practicas(id),
    FOREIGN KEY(alfa) REFERENCES alfas(id)
);

CREATE TABLE herramientasmetodologia(	
id int PRIMARY KEY AUTO_INCREMENT, 
nombre VARCHAR
(1500), 
descripcion VARCHAR
(5000), 
bibliografia VARCHAR
(1500));

CREATE TABLE tecnicas(
id INT PRIMARY KEY AUTO_INCREMENT,
tecnicatitulo VARCHAR
(5000), 
tecnicadescripcion VARCHAR
(15000),
tecnicabibliografia VARCHAR
(15000));

CREATE TABLE actividades(
id INT PRIMARY KEY AUTO_INCREMENT,
actividadtitulo VARCHAR
(1000),
actividadestado VARCHAR
(300),
actividaddescripcion VARCHAR
(1200),
actividadfechacreacion DATE,
actividadfechaentrega DATE,
actividadrevision INT,
tecnica INT,
FOREIGN KEY
(tecnica) REFERENCES tecnicas
(id)
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
roltitulo VARCHAR
(1000), 
roldescripcion VARCHAR
(50000), 
rolperfilRecomendado VARCHAR
(15000));

CREATE TABLE listaroles
(
    practica INT,
    rol INT,
    FOREIGN KEY(practica) REFERENCES practicas(id),
    FOREIGN KEY(rol) REFERENCES roles(id)
);

CREATE TABLE integrantes(
id int PRIMARY KEY AUTO_INCREMENT, 
usuario INT, 
rol INT,
FOREIGN KEY
(rol) REFERENCES ROLES
(id),
FOREIGN KEY
(usuario) REFERENCES usuarios
(id));

CREATE TABLE listaactividades
(
    integrante INT,
    actividad INT,
    FOREIGN KEY(integrante) references integrantes(id),
    FOREIGN KEY(actividad) references actividades(id)
);

CREATE TABLE contenidos(
id int primary key AUTO_INCREMENT, 
contenidonombre VARCHAR
(250),
contenidonombrearchivo VARCHAR
(500), 
contenidodescripcion varchar
(200), 
contenidobibliografica VARCHAR
(1500));

CREATE TABLE entregables(
id int PRIMARY KEY AUTO_INCREMENT, 
entregatitulo VARCHAR
(200), 
entregadescripcion VARCHAR
(10000), 
entregaestado varchar
(20),
entregatipoArchivo varchar
(20), 
entregafechaEntrega DATE, 
entreganumeroRevisiones INT );

CREATE TABLE listaentregables
(
    alfa INT,
    entregable INT,
    FOREIGN KEY(alfa) REFERENCES alfas(id),
    FOREIGN KEY(entregable) REFERENCES entregables
);

CREATE TABLE listaherramientasmetodologia
(
    entregable INT ,
    herramientametodologia INT,
    FOREIGN KEY(entregable) REFERENCES entregables(id),
    FOREIGN KEY(herramientametodologia) REFERENCES herramientasmetodologia(id)
);

CREATE TABLE listacontenidos
(
    entregable INT ,
    contenido INT,
    actividad INT,
    FOREIGN KEY(actividad) REFERENCES actividades(id),
    FOREIGN KEY(entregable) REFERENCES entregables(id),
    FOREIGN KEY(contenido) REFERENCES contenidos(id)
);

CREATE TABLE entregas(
id int PRIMARY KEY AUTO_INCREMENT, 
entregastitulo VARCHAR
(300),
entregasdescripcion VARCHAR
(1000),
entregasnombrearchivoguardado VARCHAR
(300),
actividad INT,
entragable INT ,
FOREIGN KEY
(actividad) REFERENCES actividades
(id),
FOREIGN KEY
(entragable) REFERENCES entregables
(id));

CREATE TABLE chats(
id int PRIMARY KEY AUTO_INCREMENT, 
chatnombreArchivo VARCHAR
(150), 
chatfecha DATE);

CREATE TABLE historiales(
id int PRIMARY KEY AUTO_INCREMENT, 
historiadescripcion VARCHAR
(1000)
);


CREATE TABLE listachats
(
    historial int,
    chat INT,
    FOREIGN KEY(historial) REFERENCES historiales(id),
    FOREIGN KEY(chat) REFERENCES chats(id)
);

CREATE TABLE proyectos (
id INT PRIMARY KEY AUTO_INCREMENT, 
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
historia INT, 
metodologia INT,
FOREIGN KEY
(historia) REFERENCES HISTORIALES
(id),
FOREIGN KEY
(metodologia) REFERENCES metodologias
(id));

CREATE TABLE eventos(
id int PRIMARY KEY AUTO_INCREMENT,  
eventofechacreacion DATE);

CREATE TABLE reuniones(
id int PRIMARY KEY AUTO_INCREMENT,
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
    evento INT ,
    reunion INT,
    FOREIGN KEY(evento) REFERENCES eventos(id),
    FOREIGN KEY(reunion) REFERENCES reuniones(id)
);

CREATE TABLE listaentregas
(
    evento INT ,
    entregable INT,
    FOREIGN KEY(evento) REFERENCES eventos(id),
    FOREIGN KEY(entregable) REFERENCES entregables(id)
);

CREATE TABLE listaeventos
(
    historial INT,
    evento INT,
    integrante INT,
    FOREIGN KEY(historial) REFERENCES historiales(id),
    FOREIGN KEY(evento) REFERENCES eventos(id),
    FOREIGN KEY(integrante) REFERENCES integrantes(id)
);


CREATE TABLE listaintegrantes
(
    proyecto INT,
    integrante INT,
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

INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("Reactjs",
    "desarrollo", 
    "Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres. ",
    "reactjs-icon.svg");
-- /////////////////////////////
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("Angularjs",
    "desarrollo", 
    "Es un framework de JavaScript de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página. Su objetivo es aumentar las aplicaciones basadas en navegador con capacidad de Modelo Vista Controlador (MVC), en un esfuerzo para hacer que el desarrollo y las pruebas sean más fáciles.",
    "angular-icon.svg");
-- /////////////////////////////
	INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("Vuejs",
    "desarrollo", 
    "Es un framework de JavaScript de código abierto para la construcción de interfaces de usuario y aplicaciones de una sola página. Fue creado por Evan You, y es mantenido por él y por el resto de los miembros activos del equipo central que provienen de diversas empresas como Netlify y Netguru.",
    "reactjs-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("Nodejs",
    "desarrollo", 
    "Es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor (pero no limitándose a ello) basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google. Fue creado con el enfoque de ser útil en la creación de programas de red altamente escalables, como por ejemplo, servidores web.​ Fue creado por Ryan Dahl en 2009 y su evolución está apadrinada por la empresa Joyent, que además tiene contratado a Dahl en plantilla.
",
    "nodejs-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("HTML5",
    "desarrollo", 
    "Conocida como HTML5, y una variante XHTML conocida como sintaxis XHTML 5 que deberá servirse con sintaxis XML (application/xhtml+xml).1​2​ Esta es la primera vez que HTML y XHTML se han desarrollado en paralelo. La versión definitiva de la quinta revisión del estándar se publicó en octubre de 2014",
    "w3_html5-icon.svg");	
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("CSS3",
    "desarrollo", 
    "Es un lenguaje de diseño gráfico para definir y crear la presentación de un documento estructurado escrito en un lenguaje de marcado.2​ Es muy usado para establecer el diseño visual de los documentos web, e interfaces de usuario escritas en HTML o XHTML; el lenguaje puede ser aplicado a cualquier documento XML, incluyendo XHTML, SVG, XUL, RSS, etcétera. Te puede ayudar a crear tu propio sitio web. Junto con HTML y JavaScript, CSS es una tecnología usada por muchos sitios web para crear páginas visualmente atractivas, interfaces de usuario para aplicaciones web y GUIs para muchas aplicaciones móviles (como Firefox OS)",
    "css3-original.svg");	
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("PHP",
    "desarrollo", 
    "Es un lenguaje de programación de uso general que se adapta especialmente al desarrollo web.2​ Fue creado inicialmente por el programador danés-canadiense Rasmus Lerdorf en 1994.3​ En la actualidad, la implementación de referencia de PHP es producida por The PHP Group.4​ PHP originalmente significaba Personal Home Page (Página personal), pero ahora significa el inicialismon 1​ recursivo PHP: Hypertext Preprocessor.",
    "php-icon.svg");	
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("Flutter",
    "desarrollo", 
    "Es un SDK de código fuente abierto de desarrollo de aplicaciones móviles creado por Google. Suele usarse para desarrollar interfaces de usuario para aplicaciones en Android, iOS y Web así como método primario para crear aplicaciones para Google Fuchsia",
    "flutterio-icon.svg");	
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("Mysql",
    "desarrollo", 
    "Es un sistema de gestión de bases de datos relacional desarrollado bajo licencia dual: Licencia pública general/Licencia comercial por Oracle Corporation y está considerada como la base de datos de código abierto más popular del mundo, y una de las más populares en general junto a Oracle y Microsoft SQL Server, todo para entornos de desarrollo web.",
    "mysql-7.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("golang",
    "desarrollo", 
    "Es un lenguaje de programación concurrente y compilado inspirado en la sintaxis de C, que intenta ser dinámico como Python y con el rendimiento de C o C++. Ha sido desarrollado por Google9​ y sus diseñadores iniciales fueron Robert Griesemer, Rob Pike y Ken Thompson. 10​ Actualmente está disponible en formato binario para los sistemas operativos Windows, GNU/Linux, FreeBSD y Mac OS X, pudiendo también ser instalado en estos y en otros sistemas mediante el código fuente.",
    "golang-official.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("graphql",
    "desarrollo", 
    "Es un lenguaje de consulta y manipulación de datos para APIs, y un entorno de ejecución para realizar consultas con datos existentes.",
    "graphql-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("typescript",
    "desarrollo", 
    "Es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases. Anders Hejlsberg, diseñador de C# y creador de Delphi y Turbo Pascal, ha trabajado en el desarrollo de TypeScript.1​ TypeScript es usado para desarrollar aplicaciones JavaScript que se ejecutarán en el lado del cliente o del servidor, o extensiones para programas (Node.js y Deno (software)).",
    "typescriptlang-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("jquery",
    "desarrollo", 
    "Es una biblioteca multiplataforma de JavaScript, creada inicialmente por John Resig, que permite simplificar la manera de interactuar con los documentos HTML, manipular el árbol DOM, manejar eventos, desarrollar animaciones y agregar interacción con la técnica AJAX a páginas web.1​ Fue presentada el 14 de enero de 2006 en el BarCamp NYC. De acuerdo a un análisis de la Web (realizado en 2017) JQuery es la biblioteca de JavaScript más utilizada, por un amplio margen.",
    "jquery-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("bootstrap",
    "desarrollo", 
    "Es una biblioteca multiplataforma o conjunto de herramientas de código abierto para diseño de sitios y aplicaciones web. Contiene plantillas de diseño con tipografía, formularios, botones, cuadros, menús de navegación y otros elementos de diseño basado en HTML y CSS, así como extensiones de JavaScript adicionales. A diferencia de muchos frameworks web, solo se ocupa del desarrollo front-end.",
    "getbootstrap-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("python",
    "desarrollo", 
    "Es un lenguaje de programación interpretado cuya filosofía hace hincapié en la legibilidad de su código.2​ Se trata de un lenguaje de programación multiparadigma, ya que soporta orientación a objetos, programación imperativa y, en menor medida, programación funcional. Es un lenguaje interpretado, dinámico y multiplataforma.",
    "python-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("django",
    "desarrollo", 
    "Es un framework de desarrollo web de código abierto, escrito en Python, que respeta el patrón de diseño conocido como modelo–vista–controlador (MVC). Fue desarrollado en origen para gestionar varias páginas orientadas a noticias de la World Company de Lawrence, Kansas, y fue liberada al público bajo una licencia BSD en julio de 2005; el framework fue nombrado en alusión al guitarrista de jazz gitano Django Reinhardt.",
    "djangoproject-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("mongodb",
    "desarrollo", 
    "Es un sistema de base de datos NoSQL, orientado a documentos y de código abierto.",
    "mongodb-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("javascript",
    "desarrollo", 
    "Es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos,2​ basado en prototipos, imperativo, débilmente tipado y dinámico.",
    "javascript.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("material-ui",
    "desarrollo", 
    "Es una biblioteca de código abierto que implementa el lenguaje visual de «materiales» de Google en sus componentes React. Ofrece la capacidad de combinar su biblioteca de interfaz de usuario, con el marco front-end de React.js.",
    "material-ui-1.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("rails",
    "desarrollo", 
    "También conocido como RoR o Rails, es un framework de aplicaciones web de código abierto escrito en el lenguaje de programación Ruby, siguiendo el paradigma del patrón Modelo Vista Controlador (MVC).",
    "rails.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("figma",
    "diseño", 
    "es un programa que ofrece todas las herramientas necesarias para diseñar un proyecto. Sobre todo es ideal para crear interfaces de usuario tanto para web como para móvil. También permite crear prototipos,  generar código para el traspaso (hand-off) e ilustrar, aunque para esto último no es la mejor herramienta para ello.",
    "figma-1.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("dotnet",
    "desarrollo", 
    "Es un framework de Microsoft que hace un énfasis en la transparencia de redes, con independencia de plataforma de hardware y que permite un rápido desarrollo de aplicaciones. Basada en ella, la empresa intenta desarrollar una estrategia horizontal que integre sus productos, desde el sistema operativo hasta las herramientas de mercado.",
    "dotnet.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("sqlite",
    "desarrollo", 
    "es un sistema de gestión de bases de datos relacional compatible con ACID, contenida en una relativamente pequeña (~275 kiB)2​ biblioteca escrita en C. SQLite es un proyecto de dominio público1​ creado por D. Richard Hipp.",
    "sqlite-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("android",
    "desarrollo", 
    "es el entorno de desarrollo integrado oficial para la plataforma Android. Fue anunciado el 16 de mayo de 2013 en la conferencia Google I/O, y reemplazó a Eclipse como el IDE oficial para el desarrollo de aplicaciones para Android. La primera versión estable fue publicada en diciembre de 2014.",
    "android.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("ionic",
    "desarrollo", 
    "Es una estructura tecnológica (Framework)  de código abierto que se utiliza en el desarrollo de aplicaciones móviles híbridas, es decir, se combinan el HTML5, CSS y JavaScript dando como resultado aplicaciones con una interfaz amigable e intuitiva para el usuario que luego se comercializan o descargan en plataformas como Android o IOs.",
    "ionicframework-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("c++",
    "desarrollo", 
    "Es un lenguaje de programación diseñado en 1979 por Bjarne Stroustrup. La intención de su creación fue extender al lenguaje de programación C mecanismos que permiten la manipulación de objetos. En ese sentido, desde el punto de vista de los lenguajes orientados a objetos, C++ es un lenguaje híbrido.",
    "c++.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("c",
    "desarrollo", 
    "Es un lenguaje de programación de propósito general2​:1 originalmente desarrollado por Dennis Ritchie entre 1969 y 1972 en los Laboratorios Bell,1​ como evolución del anterior lenguaje B, a su vez basado en BCPL.",
    "c.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("c#",
    "desarrollo", 
    "Es un lenguaje de programación orientado a objetos. Con este nuevo lenguaje se quiso mejorar con respecto de los dos lenguajes anteriores de los que deriva el C, y el C++.",
    "cs.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("java",
    "desarrollo", 
    "Es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez en 1995 por Sun Microsystems. Hay muchas aplicaciones y sitios web que no funcionarán, probablemente, a menos que tengan Java instalado y cada día se crean más. Java es rápido, seguro y fiable. ",
    "java-icon.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("wordpress",
    "diseño", 
    "Es un sistema de gestión de contenidos ( en inglés, Content Management System o CMS) lanzado el 27 de mayo de 2003, enfocado a la creación de cualquier tipo de página web. Originalmente alcanzó una gran popularidad en la creación de blogs, para luego convertirse en una de las principales herramientas para la creación de páginas web comerciales",
    "wordpress-blue.svg");
-- /////////////////////////////	
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("Adobe  XD",
    "diseño", 
    "Es un editor de gráficos vectoriales desarrollado y publicado por Adobe Inc para diseñar y crear un prototipo de la experiencia del usuario para páginas web y aplicaciones móviles. El software está disponible para MacOS y Windows.",
    "adobe-xd.svg");
-- /////////////////////////////
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("Adobe Ilustrator",
    "diseño", 
    "Es un editor de gráficos vectoriales en forma de taller de arte que trabaja sobre un tablero de dibujo, conocido como «mesa de trabajo» y está destinado a la creación artística de dibujo y pintura para ilustración, para crear y diseñar imágenes, sirve para editar entre otras cosas (ilustración como rama del arte digital aplicado a la ilustración técnica o el diseño gráfico, entre otros).",
    "adobe-illustrator-cc.svg");
-- /////////////////////////////
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("Adobe Premiere",
    "diseño", 
    "Es un software de edición de video desarrollado por Adobe y publicado como parte de Adobe Creative Cloud. Está orientado a la edición de vídeos profesionales, mientras que su derivado, Adobe Premiere Elements, apunta al mercado de consumidores.",
    "premiere-cc.svg");
-- /////////////////////////////
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("Adobe Photoshop",
    "diseño", 
    "Es un editor de fotografías desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografías y gráficos, su nombre en español significa "taller de fotos". Es conocido mundialmente.",
    "photoshop-cc.svg");
-- /////////////////////////////
INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("Adobe After Effects",
    "diseño", 
    "Es una aplicación que tiene forma de estudio destinado para la creación o aplicación en una composición, así como realización de gráficos profesionales en movimiento y efectos especiales, que desde sus raíces han consistido básicamente en la superposición de capas. Adobe After Effects es uno de los softwares basados en línea de tiempo más potentes del mercado junto con Autodesk Combustion y Eyeon Fusion.",
    "after-effects-cc.svg");
	























 


