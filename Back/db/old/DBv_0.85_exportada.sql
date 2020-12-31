-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.5.4-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para proyectoweb
CREATE DATABASE IF NOT EXISTS `proyectoweb` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `proyectoweb`;

-- Volcando estructura para tabla proyectoweb.actividades
CREATE TABLE IF NOT EXISTS `actividades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(1000) DEFAULT NULL,
  `estado` varchar(300) DEFAULT NULL,
  `descripcion` varchar(1200) DEFAULT NULL,
  `fechacreacion` date DEFAULT NULL,
  `fechaentrega` date DEFAULT NULL,
  `revision` int(11) DEFAULT NULL,
  `tecnica` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tecnica` (`tecnica`),
  CONSTRAINT `actividades_ibfk_1` FOREIGN KEY (`tecnica`) REFERENCES `tecnicas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.actividades: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `actividades` DISABLE KEYS */;
INSERT INTO `actividades` (`id`, `titulo`, `estado`, `descripcion`, `fechacreacion`, `fechaentrega`, `revision`, `tecnica`) VALUES
	(1, 'Actividad A1', 'asignada', 'descripcion de la actividad', '2020-12-14', '2021-02-13', 0, 1),
	(2, 'Actividad A2', 'asignada', 'descripcion de la actividad', '2020-12-14', '2021-02-13', 0, 2),
	(3, 'Actividad A3', 'asignada', 'descripcion de la actividad', '2020-12-14', '2021-02-13', 0, 3),
	(4, 'Actividad A4', 'asignada', 'descripcion de la actividad', '2020-12-14', '2021-02-13', 0, 4),
	(5, 'Actividad A5', 'asignada', 'descripcion de la actividad', '2020-12-14', '2021-02-13', 0, 5);
/*!40000 ALTER TABLE `actividades` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.alfas
CREATE TABLE IF NOT EXISTS `alfas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(300) DEFAULT NULL,
  `descripcion` varchar(1500) DEFAULT NULL,
  `estado` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.alfas: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `alfas` DISABLE KEYS */;
INSERT INTO `alfas` (`id`, `nombre`, `descripcion`, `estado`) VALUES
	(1, 'Oportunidad', 'estudia la aceptacion de la propuesta en el mercado', 'iniciado'),
	(2, 'Valor del sistema multimedia', 'Es una sub-alfa que se inscribe en el alfa de Oportunidad, concebida para llevar a cabo la concreción de la propuesta de valor del Sistema Multimedia mínimo viable.', 'iniciado'),
	(3, 'Experiencia multimedia', 'estudia la experiencia multimedia resultante del sistema multimediaproyectoweb', 'iniciado'),
	(4, 'Diseño responsable', 'Es una sub-alfa que se inscribe en el alfa de Experiencia Multimedia de la adaptación producida al kernel de Esencia, concebida para hacer un seguimiento granular al progreso del diseño responsable que debe concebirse para el Sistema Multimedia, y que influye en consecuencia, en la experiencia multimedia.', 'iniciado');
/*!40000 ALTER TABLE `alfas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.chats
CREATE TABLE IF NOT EXISTS `chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreArchivo` varchar(150) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.chats: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.contactos
CREATE TABLE IF NOT EXISTS `contactos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` int(11) DEFAULT NULL,
  `preferencias` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario` (`usuario`),
  CONSTRAINT `contactos_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.contactos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `contactos` DISABLE KEYS */;
INSERT INTO `contactos` (`id`, `usuario`, `preferencias`) VALUES
	(1, 1, 1),
	(2, 2, 0);
/*!40000 ALTER TABLE `contactos` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.contenidos
CREATE TABLE IF NOT EXISTS `contenidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  `nombrearchivo` varchar(500) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `bibliografica` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.contenidos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `contenidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `contenidos` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.entregables
CREATE TABLE IF NOT EXISTS `entregables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `tipoArchivo` varchar(20) DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `numeroRevisiones` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.entregables: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `entregables` DISABLE KEYS */;
INSERT INTO `entregables` (`id`, `titulo`, `descripcion`, `estado`, `tipoArchivo`, `fechaEntrega`, `numeroRevisiones`) VALUES
	(1, 'Porpuesta de diseño de la EM', 'Consiste en un documento en donde se especifica', 'asignada', 'documento de texto', '2021-01-23', 0),
	(2, 'Especificaciones del diseño responsable', 'Consiste en un documento en donde se especifica', 'asignada', 'documento de texto', '2021-01-23', 0);
/*!40000 ALTER TABLE `entregables` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.entregas
CREATE TABLE IF NOT EXISTS `entregas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(300) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `nombrearchivoguardado` varchar(300) DEFAULT NULL,
  `actividad` int(11) DEFAULT NULL,
  `entragable` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `actividad` (`actividad`),
  KEY `entragable` (`entragable`),
  CONSTRAINT `entregas_ibfk_1` FOREIGN KEY (`actividad`) REFERENCES `actividades` (`id`),
  CONSTRAINT `entregas_ibfk_2` FOREIGN KEY (`entragable`) REFERENCES `entregables` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.entregas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.eventos
CREATE TABLE IF NOT EXISTS `eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechacreacion` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.eventos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.habilidades
CREATE TABLE IF NOT EXISTS `habilidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(40) DEFAULT NULL,
  `descripcion` varchar(40) DEFAULT NULL,
  `nivel` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.habilidades: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `habilidades` DISABLE KEYS */;
INSERT INTO `habilidades` (`id`, `tipo`, `descripcion`, `nivel`) VALUES
	(1, 'diseño ui', 'Expecialista en diseño para la web', 'medio'),
	(2, 'diseño software', 'Expecialista seguridad', 'alto'),
	(3, 'programador', 'construcción de servidores', 'medio');
/*!40000 ALTER TABLE `habilidades` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.herramientas
CREATE TABLE IF NOT EXISTS `herramientas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) DEFAULT NULL,
  `tipo` varchar(100) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `nombreIcono` varchar(75) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.herramientas: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `herramientas` DISABLE KEYS */;
INSERT INTO `herramientas` (`id`, `nombre`, `tipo`, `descripcion`, `nombreIcono`) VALUES
	(1, 'nodejs', 'Desarrollo software', 'Node.js es un entorno multiplataforma, basado en el lenguaje de programación JavaScript.', 'nodejslogo.svg'),
	(2, 'Bootstrap', 'Desarrollo web', 'Bootstrap es una biblioteca multiplataforma para el diseño de entornos web.', 'Bootstraplogo.svg'),
	(3, 'Go', 'Desarrollo software', 'Go es un lenguaje de programación concurrente y compilado inspirado en la sintaxis de C', 'golanglogo.svg');
/*!40000 ALTER TABLE `herramientas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.herramientasmetodologia
CREATE TABLE IF NOT EXISTS `herramientasmetodologia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `bibliografia` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.herramientasmetodologia: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `herramientasmetodologia` DISABLE KEYS */;
/*!40000 ALTER TABLE `herramientasmetodologia` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.historiales
CREATE TABLE IF NOT EXISTS `historiales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.historiales: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `historiales` DISABLE KEYS */;
INSERT INTO `historiales` (`id`, `descripcion`) VALUES
	(1, 'esta hara seguimiento a todos los suscesos echos en el prouyecto asociado');
/*!40000 ALTER TABLE `historiales` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.idiomas
CREATE TABLE IF NOT EXISTS `idiomas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(35) DEFAULT NULL,
  `nivel` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.idiomas: ~14 rows (aproximadamente)
/*!40000 ALTER TABLE `idiomas` DISABLE KEYS */;
INSERT INTO `idiomas` (`id`, `nombre`, `nivel`) VALUES
	(1, 'Ingles', 'A1 Beginner'),
	(2, 'Ingles', 'A2 Elementary'),
	(3, 'Ingles', 'B1 LowerIntermediate'),
	(4, 'Ingles', 'B2 Intermediate'),
	(5, 'Ingles', 'C1 Upperintermediate'),
	(6, 'Ingles', 'C2 Advanced'),
	(7, 'Ingles', 'native'),
	(8, 'Español', 'A1 Acceso/Elemental'),
	(9, 'Español', 'A2 Plataforma/Básico'),
	(10, 'Español', 'B1 Intermedio'),
	(11, 'Español', 'B2 Intermedio alto/Avanzado'),
	(12, 'Español', 'C1 Superior'),
	(13, 'Español', 'C2 Perfeccionamiento'),
	(14, 'Español', 'nativo');
/*!40000 ALTER TABLE `idiomas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.integrantes
CREATE TABLE IF NOT EXISTS `integrantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) DEFAULT NULL,
  `rol` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rol` (`rol`),
  CONSTRAINT `integrantes_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.integrantes: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `integrantes` DISABLE KEYS */;
INSERT INTO `integrantes` (`id`, `usuario`, `rol`) VALUES
	(1, '1', 1),
	(2, '2', 2);
/*!40000 ALTER TABLE `integrantes` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listaactividades
CREATE TABLE IF NOT EXISTS `listaactividades` (
  `integrante` int(11) DEFAULT NULL,
  `actividad` int(11) DEFAULT NULL,
  KEY `integrante` (`integrante`),
  KEY `actividad` (`actividad`),
  CONSTRAINT `listaactividades_ibfk_1` FOREIGN KEY (`integrante`) REFERENCES `integrantes` (`id`),
  CONSTRAINT `listaactividades_ibfk_2` FOREIGN KEY (`actividad`) REFERENCES `actividades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listaactividades: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `listaactividades` DISABLE KEYS */;
INSERT INTO `listaactividades` (`integrante`, `actividad`) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 4),
	(2, 5);
/*!40000 ALTER TABLE `listaactividades` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listaalfas
CREATE TABLE IF NOT EXISTS `listaalfas` (
  `practica` int(11) DEFAULT NULL,
  `alfa` int(11) DEFAULT NULL,
  KEY `practica` (`practica`),
  KEY `alfa` (`alfa`),
  CONSTRAINT `listaalfas_ibfk_1` FOREIGN KEY (`practica`) REFERENCES `practicas` (`id`),
  CONSTRAINT `listaalfas_ibfk_2` FOREIGN KEY (`alfa`) REFERENCES `alfas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listaalfas: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `listaalfas` DISABLE KEYS */;
INSERT INTO `listaalfas` (`practica`, `alfa`) VALUES
	(1, 3),
	(1, 4),
	(2, 1),
	(2, 2);
/*!40000 ALTER TABLE `listaalfas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listachats
CREATE TABLE IF NOT EXISTS `listachats` (
  `historial` int(11) DEFAULT NULL,
  `chat` int(11) DEFAULT NULL,
  KEY `historial` (`historial`),
  KEY `chat` (`chat`),
  CONSTRAINT `listachats_ibfk_1` FOREIGN KEY (`historial`) REFERENCES `historiales` (`id`),
  CONSTRAINT `listachats_ibfk_2` FOREIGN KEY (`chat`) REFERENCES `chats` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listachats: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `listachats` DISABLE KEYS */;
/*!40000 ALTER TABLE `listachats` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listacontactos
CREATE TABLE IF NOT EXISTS `listacontactos` (
  `usuario` int(11) DEFAULT NULL,
  `contacto` int(11) DEFAULT NULL,
  KEY `usuario` (`usuario`),
  KEY `contacto` (`contacto`),
  CONSTRAINT `listacontactos_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `listacontactos_ibfk_2` FOREIGN KEY (`contacto`) REFERENCES `contactos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listacontactos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `listacontactos` DISABLE KEYS */;
INSERT INTO `listacontactos` (`usuario`, `contacto`) VALUES
	(1, 2),
	(2, 1);
/*!40000 ALTER TABLE `listacontactos` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listacontenidos
CREATE TABLE IF NOT EXISTS `listacontenidos` (
  `entregable` int(11) DEFAULT NULL,
  `contenido` int(11) DEFAULT NULL,
  KEY `entregable` (`entregable`),
  KEY `contenido` (`contenido`),
  CONSTRAINT `listacontenidos_ibfk_1` FOREIGN KEY (`entregable`) REFERENCES `entregables` (`id`),
  CONSTRAINT `listacontenidos_ibfk_2` FOREIGN KEY (`contenido`) REFERENCES `contenidos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listacontenidos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `listacontenidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `listacontenidos` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listaentregables
CREATE TABLE IF NOT EXISTS `listaentregables` (
  `alfa` int(11) DEFAULT NULL,
  `entregable` int(11) DEFAULT NULL,
  KEY `alfa` (`alfa`),
  KEY `entregable` (`entregable`),
  CONSTRAINT `listaentregables_ibfk_1` FOREIGN KEY (`alfa`) REFERENCES `alfas` (`id`),
  CONSTRAINT `listaentregables_ibfk_2` FOREIGN KEY (`entregable`) REFERENCES `entregables` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listaentregables: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `listaentregables` DISABLE KEYS */;
/*!40000 ALTER TABLE `listaentregables` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listaentregas
CREATE TABLE IF NOT EXISTS `listaentregas` (
  `evento` int(11) DEFAULT NULL,
  `entregable` int(11) DEFAULT NULL,
  KEY `evento` (`evento`),
  KEY `entregable` (`entregable`),
  CONSTRAINT `listaentregas_ibfk_1` FOREIGN KEY (`evento`) REFERENCES `eventos` (`id`),
  CONSTRAINT `listaentregas_ibfk_2` FOREIGN KEY (`entregable`) REFERENCES `entregables` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listaentregas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `listaentregas` DISABLE KEYS */;
/*!40000 ALTER TABLE `listaentregas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listaeventos
CREATE TABLE IF NOT EXISTS `listaeventos` (
  `historial` int(11) DEFAULT NULL,
  `evento` int(11) DEFAULT NULL,
  `integrante` int(11) DEFAULT NULL,
  KEY `historial` (`historial`),
  KEY `evento` (`evento`),
  KEY `integrante` (`integrante`),
  CONSTRAINT `listaeventos_ibfk_1` FOREIGN KEY (`historial`) REFERENCES `historiales` (`id`),
  CONSTRAINT `listaeventos_ibfk_2` FOREIGN KEY (`evento`) REFERENCES `eventos` (`id`),
  CONSTRAINT `listaeventos_ibfk_3` FOREIGN KEY (`integrante`) REFERENCES `integrantes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listaeventos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `listaeventos` DISABLE KEYS */;
/*!40000 ALTER TABLE `listaeventos` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listahabilidades
CREATE TABLE IF NOT EXISTS `listahabilidades` (
  `usuario` int(11) DEFAULT NULL,
  `habilidad` int(11) DEFAULT NULL,
  KEY `usuario` (`usuario`),
  KEY `habilidad` (`habilidad`),
  CONSTRAINT `listahabilidades_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `listahabilidades_ibfk_2` FOREIGN KEY (`habilidad`) REFERENCES `habilidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listahabilidades: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `listahabilidades` DISABLE KEYS */;
INSERT INTO `listahabilidades` (`usuario`, `habilidad`) VALUES
	(1, 1),
	(1, 2),
	(2, 2),
	(2, 3);
/*!40000 ALTER TABLE `listahabilidades` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listaherramientas
CREATE TABLE IF NOT EXISTS `listaherramientas` (
  `usuario` int(11) DEFAULT NULL,
  `herramientausada` int(11) DEFAULT NULL,
  KEY `usuario` (`usuario`),
  KEY `herramientausada` (`herramientausada`),
  CONSTRAINT `listaherramientas_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `listaherramientas_ibfk_2` FOREIGN KEY (`herramientausada`) REFERENCES `herramientas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listaherramientas: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `listaherramientas` DISABLE KEYS */;
INSERT INTO `listaherramientas` (`usuario`, `herramientausada`) VALUES
	(1, 1),
	(1, 2),
	(2, 1),
	(2, 3);
/*!40000 ALTER TABLE `listaherramientas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listaherramientasmetodologia
CREATE TABLE IF NOT EXISTS `listaherramientasmetodologia` (
  `entregable` int(11) DEFAULT NULL,
  `herramientametodologia` int(11) DEFAULT NULL,
  KEY `entregable` (`entregable`),
  KEY `herramientametodologia` (`herramientametodologia`),
  CONSTRAINT `listaherramientasmetodologia_ibfk_1` FOREIGN KEY (`entregable`) REFERENCES `entregables` (`id`),
  CONSTRAINT `listaherramientasmetodologia_ibfk_2` FOREIGN KEY (`herramientametodologia`) REFERENCES `herramientasmetodologia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listaherramientasmetodologia: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `listaherramientasmetodologia` DISABLE KEYS */;
/*!40000 ALTER TABLE `listaherramientasmetodologia` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listaidiomas
CREATE TABLE IF NOT EXISTS `listaidiomas` (
  `usuario` int(11) DEFAULT NULL,
  `idioma` int(11) DEFAULT NULL,
  KEY `usuario` (`usuario`),
  KEY `idioma` (`idioma`),
  CONSTRAINT `listaidiomas_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `listaidiomas_ibfk_2` FOREIGN KEY (`idioma`) REFERENCES `idiomas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listaidiomas: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `listaidiomas` DISABLE KEYS */;
INSERT INTO `listaidiomas` (`usuario`, `idioma`) VALUES
	(1, 14),
	(1, 4),
	(2, 14),
	(2, 2);
/*!40000 ALTER TABLE `listaidiomas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listaintegrantes
CREATE TABLE IF NOT EXISTS `listaintegrantes` (
  `proyecto` int(11) DEFAULT NULL,
  `integrante` int(11) DEFAULT NULL,
  KEY `proyecto` (`proyecto`),
  KEY `integrante` (`integrante`),
  CONSTRAINT `listaintegrantes_ibfk_1` FOREIGN KEY (`proyecto`) REFERENCES `proyectos` (`id`),
  CONSTRAINT `listaintegrantes_ibfk_2` FOREIGN KEY (`integrante`) REFERENCES `integrantes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listaintegrantes: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `listaintegrantes` DISABLE KEYS */;
INSERT INTO `listaintegrantes` (`proyecto`, `integrante`) VALUES
	(1, 1),
	(1, 2);
/*!40000 ALTER TABLE `listaintegrantes` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listapracticas
CREATE TABLE IF NOT EXISTS `listapracticas` (
  `metodologia` int(11) DEFAULT NULL,
  `practica` int(11) DEFAULT NULL,
  KEY `metodologia` (`metodologia`),
  KEY `practica` (`practica`),
  CONSTRAINT `listapracticas_ibfk_1` FOREIGN KEY (`metodologia`) REFERENCES `metodologias` (`id`),
  CONSTRAINT `listapracticas_ibfk_2` FOREIGN KEY (`practica`) REFERENCES `practicas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listapracticas: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `listapracticas` DISABLE KEYS */;
INSERT INTO `listapracticas` (`metodologia`, `practica`) VALUES
	(1, 1),
	(1, 2);
/*!40000 ALTER TABLE `listapracticas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listareuniones
CREATE TABLE IF NOT EXISTS `listareuniones` (
  `evento` int(11) DEFAULT NULL,
  `reunion` int(11) DEFAULT NULL,
  KEY `evento` (`evento`),
  KEY `reunion` (`reunion`),
  CONSTRAINT `listareuniones_ibfk_1` FOREIGN KEY (`evento`) REFERENCES `eventos` (`id`),
  CONSTRAINT `listareuniones_ibfk_2` FOREIGN KEY (`reunion`) REFERENCES `reuniones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listareuniones: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `listareuniones` DISABLE KEYS */;
/*!40000 ALTER TABLE `listareuniones` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listaroles
CREATE TABLE IF NOT EXISTS `listaroles` (
  `practica` int(11) DEFAULT NULL,
  `rol` int(11) DEFAULT NULL,
  KEY `practica` (`practica`),
  KEY `rol` (`rol`),
  CONSTRAINT `listaroles_ibfk_1` FOREIGN KEY (`practica`) REFERENCES `practicas` (`id`),
  CONSTRAINT `listaroles_ibfk_2` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listaroles: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `listaroles` DISABLE KEYS */;
INSERT INTO `listaroles` (`practica`, `rol`) VALUES
	(1, 1),
	(1, 2),
	(2, 1),
	(2, 2);
/*!40000 ALTER TABLE `listaroles` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.listarutas
CREATE TABLE IF NOT EXISTS `listarutas` (
  `practica` int(11) DEFAULT NULL,
  `ruta` int(11) DEFAULT NULL,
  KEY `practica` (`practica`),
  KEY `ruta` (`ruta`),
  CONSTRAINT `listarutas_ibfk_1` FOREIGN KEY (`practica`) REFERENCES `practicas` (`id`),
  CONSTRAINT `listarutas_ibfk_2` FOREIGN KEY (`ruta`) REFERENCES `rutas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.listarutas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `listarutas` DISABLE KEYS */;
/*!40000 ALTER TABLE `listarutas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.metodologias
CREATE TABLE IF NOT EXISTS `metodologias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) DEFAULT NULL,
  `descripcion` varchar(1500) DEFAULT NULL,
  `consejo` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.metodologias: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `metodologias` DISABLE KEYS */;
INSERT INTO `metodologias` (`id`, `nombre`, `descripcion`, `consejo`) VALUES
	(1, 'metodologia para preprodución de un sistema multimedia [MPSM]', 'es modular tiene varias practicas modular que utiliza las buenas practicas para la diseño de un sistema multimedia apoyado en metodos agiles', 'sigue tu corazon');
/*!40000 ALTER TABLE `metodologias` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.practicas
CREATE TABLE IF NOT EXISTS `practicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) DEFAULT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.practicas: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `practicas` DISABLE KEYS */;
INSERT INTO `practicas` (`id`, `nombre`, `descripcion`) VALUES
	(1, 'concepción del experiencia multimedia [CEM]', 'se estara haciendo uso de fierentes herramientras para creacion de una ccorrecta experiencia'),
	(2, 'sistema multimedia minimo viable [SMMV]', 'En este aparatado se establecera el minimo producto viable a entregar ');
/*!40000 ALTER TABLE `practicas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.proyectos
CREATE TABLE IF NOT EXISTS `proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(350) DEFAULT NULL,
  `descripcion` varchar(1350) DEFAULT NULL,
  `estado` varchar(150) DEFAULT NULL,
  `icon` varchar(1000) DEFAULT NULL,
  `banner` varchar(1000) DEFAULT NULL,
  `historia` int(11) DEFAULT NULL,
  `metodologia` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `historia` (`historia`),
  KEY `metodologia` (`metodologia`),
  CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`historia`) REFERENCES `historiales` (`id`),
  CONSTRAINT `proyectos_ibfk_2` FOREIGN KEY (`metodologia`) REFERENCES `metodologias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.proyectos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` (`id`, `nombre`, `descripcion`, `estado`, `icon`, `banner`, `historia`, `metodologia`) VALUES
	(1, 'Desarrollo de un entorno virtual colaborativo para preproducción de un sistema multimedia', 'Como se expone en el apartado de planteamiento del problema los equipos de trabajo encargados de la preproducción de un sistema multimedia poseen muchos retos en la gestión, por lo tanto, el sistema propuesto por este documento podrá garantizar los siguientes beneficios', 'iniciada', 'iconoTemporaldelsistema.jpg', 'bannertemporal.jpg', 1, 1);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.reuniones
CREATE TABLE IF NOT EXISTS `reuniones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(500) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` varchar(15) DEFAULT NULL,
  `durancion` double DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `vigente` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.reuniones: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `reuniones` DISABLE KEYS */;
/*!40000 ALTER TABLE `reuniones` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `perfilRecomendado` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.roles: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `titulo`, `descripcion`, `perfilRecomendado`) VALUES
	(1, 'arquitecto de expericia multimedia [AEM]', 'es el escargado de dirigil, coordinar y estrucutrar todo lo relacionado con la expericia final del sistema', 'Diseñador ui'),
	(2, 'arquitecto de informacion [AI]', 'es el escargado estructural toda la informacion mostrada en el sistema asi mismo como todo la informacion de sosporte para el equipo', 'Diseñador back-end');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.rutas
CREATE TABLE IF NOT EXISTS `rutas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `actividad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `actividad` (`actividad`),
  CONSTRAINT `rutas_ibfk_1` FOREIGN KEY (`actividad`) REFERENCES `actividades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.rutas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `rutas` DISABLE KEYS */;
/*!40000 ALTER TABLE `rutas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.tecnicas
CREATE TABLE IF NOT EXISTS `tecnicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(500) DEFAULT NULL,
  `descripcion` varchar(1500) DEFAULT NULL,
  `bibliografia` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.tecnicas: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `tecnicas` DISABLE KEYS */;
INSERT INTO `tecnicas` (`id`, `titulo`, `descripcion`, `bibliografia`) VALUES
	(1, 'tecnica T1', 'esta tecnica no se a terminadado de documentar por lo que se dejara este espacio', 'links de la bibliografias'),
	(2, 'tecnica T2', 'esta tecnica no se a terminadado de documentar por lo que se dejara este espacio', 'links de la bibliografias'),
	(3, 'tecnica T3', 'esta tecnica no se a terminadado de documentar por lo que se dejara este espacio', 'links de la bibliografias'),
	(4, 'tecnica T4', 'esta tecnica no se a terminadado de documentar por lo que se dejara este espacio', 'links de la bibliografias'),
	(5, 'tecnica T5', 'esta tecnica no se a terminadado de documentar por lo que se dejara este espacio', 'links de la bibliografias');
/*!40000 ALTER TABLE `tecnicas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(250) DEFAULT NULL,
  `contrasena` varchar(15) DEFAULT NULL,
  `nombrearchivohojadevida` varchar(150) DEFAULT NULL,
  `anosdeexperiencia` int(11) DEFAULT NULL,
  `nombre` varchar(230) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `pais` varchar(100) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `github` varchar(130) DEFAULT NULL,
  `gitlab` varchar(130) DEFAULT NULL,
  `bitbucket` varchar(130) DEFAULT NULL,
  `linkedin` varchar(130) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.usuarios: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `email`, `contrasena`, `nombrearchivohojadevida`, `anosdeexperiencia`, `nombre`, `descripcion`, `pais`, `edad`, `github`, `gitlab`, `bitbucket`, `linkedin`) VALUES
	(1, 'micorreo2@uao.edu.co', 'contraseña123', 'asdqdqsdwqds.txt', 0, 'nestor ivan martinez marulanda', 'Soy una persona que le gusta le modelo 3d la programacion y aprender cosas', 'Colombia', 21, 'https://github.com/Accelx9', NULL, NULL, NULL),
	(2, 'micorreo@uao.edu.co', 'contraseña123', 'asdqdqsdwqds.txt', 0, 'diego fernando bolaños', 'Soy una persona que le gusta la programacion y aprender cosas', 'Colombia', 26, 'https://github.com/Hachimanx9x', NULL, NULL, NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
