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
  `titulo` varchar(50) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `fechaCreacion` date DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `horaEntrega` varchar(20) DEFAULT NULL,
  `numeroRevisiones` int(11) DEFAULT NULL,
  `tecnica` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tecnica` (`tecnica`),
  CONSTRAINT `actividades_ibfk_1` FOREIGN KEY (`tecnica`) REFERENCES `tecnicas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.actividades: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `actividades` DISABLE KEYS */;
/*!40000 ALTER TABLE `actividades` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.alfas
CREATE TABLE IF NOT EXISTS `alfas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `entregable` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entregable` (`entregable`),
  CONSTRAINT `alfas_ibfk_1` FOREIGN KEY (`entregable`) REFERENCES `entregables` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.alfas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `alfas` DISABLE KEYS */;
/*!40000 ALTER TABLE `alfas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.anotaciones
CREATE TABLE IF NOT EXISTS `anotaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rl_archivo` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.anotaciones: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `anotaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `anotaciones` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.chats
CREATE TABLE IF NOT EXISTS `chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url_archivo` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.chats: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.contactos
CREATE TABLE IF NOT EXISTS `contactos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `personas` int(11) DEFAULT NULL,
  `preferencias` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `personas` (`personas`),
  CONSTRAINT `contactos_ibfk_1` FOREIGN KEY (`personas`) REFERENCES `personas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.contactos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `contactos` DISABLE KEYS */;
INSERT INTO `contactos` (`id`, `personas`, `preferencias`) VALUES
	(1, 1, 1),
	(2, 2, 0);
/*!40000 ALTER TABLE `contactos` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.contenidos
CREATE TABLE IF NOT EXISTS `contenidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `url_documentacion` varchar(50) DEFAULT NULL,
  `bibliografica` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.contenidos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `contenidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `contenidos` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.entregables
CREATE TABLE IF NOT EXISTS `entregables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `numeroRevisiones` int(11) DEFAULT NULL,
  `tipoArchivo` varchar(20) DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `contenido` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contenido` (`contenido`),
  CONSTRAINT `entregables_ibfk_1` FOREIGN KEY (`contenido`) REFERENCES `contenidos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.entregables: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `entregables` DISABLE KEYS */;
/*!40000 ALTER TABLE `entregables` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.entregas
CREATE TABLE IF NOT EXISTS `entregas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` varchar(20) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `integrantes` int(11) DEFAULT NULL,
  `entregable` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `integrantes` (`integrantes`),
  KEY `entregable` (`entregable`),
  CONSTRAINT `entregas_ibfk_1` FOREIGN KEY (`integrantes`) REFERENCES `integrantes` (`id`),
  CONSTRAINT `entregas_ibfk_2` FOREIGN KEY (`entregable`) REFERENCES `entregables` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.entregas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.eventos
CREATE TABLE IF NOT EXISTS `eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) DEFAULT NULL,
  `reunion` int(11) DEFAULT NULL,
  `entregas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reunion` (`reunion`),
  KEY `entregas` (`entregas`),
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`reunion`) REFERENCES `reuniones` (`id`),
  CONSTRAINT `eventos_ibfk_2` FOREIGN KEY (`entregas`) REFERENCES `entregas` (`id`)
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
  `herramientaUsada` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `herramientaUsada` (`herramientaUsada`),
  CONSTRAINT `habilidades_ibfk_1` FOREIGN KEY (`herramientaUsada`) REFERENCES `herramientas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.habilidades: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `habilidades` DISABLE KEYS */;
INSERT INTO `habilidades` (`id`, `tipo`, `descripcion`, `nivel`, `herramientaUsada`) VALUES
	(1, 'diseño ui', 'Expecialista en diseño para la web', 'medio', 2),
	(2, 'diseño software', 'Expecialista seguridad', 'alto', 1),
	(3, 'programador', 'construcción de servidores', 'medio', 3);
/*!40000 ALTER TABLE `habilidades` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.herramientas
CREATE TABLE IF NOT EXISTS `herramientas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `tipo` varchar(20) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `url_icono` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.herramientas: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `herramientas` DISABLE KEYS */;
INSERT INTO `herramientas` (`id`, `nombre`, `tipo`, `descripcion`, `url_icono`) VALUES
	(1, 'nodejs', 'Desarrollo software', 'Node.js es un entorno multiplataforma, basado en el lenguaje de programación JavaScript.', 'https://nodejs.org/static/images/logo.svg'),
	(2, 'Bootstrap', 'Desarrollo web', 'Bootstrap es una biblioteca multiplataforma para el diseño de entornos web.', 'https://nodejs.org/static/images/logo.svg'),
	(3, 'Go', 'Desarrollo software', 'Go es un lenguaje de programación concurrente y compilado inspirado en la sintaxis de C', 'https://nodejs.org/static/images/logo.svg');
/*!40000 ALTER TABLE `herramientas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.herramientasmetodologia
CREATE TABLE IF NOT EXISTS `herramientasmetodologia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `urlDocumento` varchar(350) DEFAULT NULL,
  `bibliografia` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.herramientasmetodologia: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `herramientasmetodologia` DISABLE KEYS */;
/*!40000 ALTER TABLE `herramientasmetodologia` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.historial
CREATE TABLE IF NOT EXISTS `historial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) DEFAULT NULL,
  `evento` int(11) DEFAULT NULL,
  `chat` int(11) DEFAULT NULL,
  `anotacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evento` (`evento`),
  KEY `chat` (`chat`),
  KEY `anotacion` (`anotacion`),
  CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`evento`) REFERENCES `eventos` (`id`),
  CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`chat`) REFERENCES `chats` (`id`),
  CONSTRAINT `historial_ibfk_3` FOREIGN KEY (`anotacion`) REFERENCES `anotaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.historial: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `historial` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.idiomas
CREATE TABLE IF NOT EXISTS `idiomas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `nivel` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.idiomas: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `idiomas` DISABLE KEYS */;
INSERT INTO `idiomas` (`id`, `nombre`, `nivel`) VALUES
	(1, 'Ingles', 'A1 Beginner'),
	(2, 'Ingles', 'A2 Elementary'),
	(3, 'Ingles', 'B1 LowerIntermediate'),
	(4, 'Ingles', 'B2 Intermediate'),
	(5, 'Ingles', 'C1 Upperintermediate'),
	(6, 'Ingles', 'C2 Advanced');
/*!40000 ALTER TABLE `idiomas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.integrantes
CREATE TABLE IF NOT EXISTS `integrantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) DEFAULT NULL,
  `rol` int(11) DEFAULT NULL,
  `actividad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rol` (`rol`),
  KEY `actividad` (`actividad`),
  CONSTRAINT `integrantes_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`),
  CONSTRAINT `integrantes_ibfk_2` FOREIGN KEY (`actividad`) REFERENCES `actividades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.integrantes: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `integrantes` DISABLE KEYS */;
/*!40000 ALTER TABLE `integrantes` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.metodologias
CREATE TABLE IF NOT EXISTS `metodologias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `mensaje` varchar(100) DEFAULT NULL,
  `practica` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `practica` (`practica`),
  CONSTRAINT `metodologias_ibfk_1` FOREIGN KEY (`practica`) REFERENCES `practicas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.metodologias: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `metodologias` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodologias` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.personas
CREATE TABLE IF NOT EXISTS `personas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `otro` varchar(100) DEFAULT NULL,
  `pais` varchar(20) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.personas: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` (`id`, `nombre`, `descripcion`, `otro`, `pais`, `edad`) VALUES
	(1, 'nestor ivan martinez marulanda', 'Soy una persona que le gusta le modelo 3d la programacion y aprender cosas', 'https://github.com/Accelx9', 'Colombia', 20),
	(2, 'diego fernando bolaños palma', 'Soy una persona que le gusta la programacion y aprender cosas', 'https://github.com/Hachimanx9x', 'Colombia', 25);
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.practicas
CREATE TABLE IF NOT EXISTS `practicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `alfaUsada` int(11) DEFAULT NULL,
  `ruta` int(11) DEFAULT NULL,
  `rol` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alfaUsada` (`alfaUsada`),
  KEY `ruta` (`ruta`),
  KEY `rol` (`rol`),
  CONSTRAINT `practicas_ibfk_1` FOREIGN KEY (`alfaUsada`) REFERENCES `alfas` (`id`),
  CONSTRAINT `practicas_ibfk_2` FOREIGN KEY (`ruta`) REFERENCES `rutas` (`id`),
  CONSTRAINT `practicas_ibfk_3` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.practicas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `practicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `practicas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.reuniones
CREATE TABLE IF NOT EXISTS `reuniones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` varchar(20) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `integrantes` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `integrantes` (`integrantes`),
  CONSTRAINT `reuniones_ibfk_1` FOREIGN KEY (`integrantes`) REFERENCES `integrantes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.reuniones: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `reuniones` DISABLE KEYS */;
/*!40000 ALTER TABLE `reuniones` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(20) DEFAULT NULL,
  `descripcion` varchar(20) DEFAULT NULL,
  `perfilRecomencado` varchar(50) DEFAULT NULL,
  `habilidadRecomendada` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `habilidadRecomendada` (`habilidadRecomendada`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`habilidadRecomendada`) REFERENCES `habilidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.roles: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
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
  `titulo` varchar(50) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `urlDocumento` varchar(50) DEFAULT NULL,
  `bibliografia` varchar(50) DEFAULT NULL,
  `herramienta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `herramienta` (`herramienta`),
  CONSTRAINT `tecnicas_ibfk_1` FOREIGN KEY (`herramienta`) REFERENCES `herramientasmetodologia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.tecnicas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tecnicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tecnicas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoweb.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `correoElectronico` varchar(50) DEFAULT NULL,
  `urlHojaVida` varchar(50) DEFAULT NULL,
  `contrasena` varchar(15) DEFAULT NULL,
  `experiencia` int(11) DEFAULT NULL,
  `contacto` int(11) DEFAULT NULL,
  `persona` int(11) DEFAULT NULL,
  `habilidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contacto` (`contacto`),
  KEY `persona` (`persona`),
  KEY `habilidad` (`habilidad`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`contacto`) REFERENCES `contactos` (`id`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`persona`) REFERENCES `personas` (`id`),
  CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`habilidad`) REFERENCES `habilidades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla proyectoweb.usuarios: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `correoElectronico`, `urlHojaVida`, `contrasena`, `experiencia`, `contacto`, `persona`, `habilidad`) VALUES
	(1, 'micorreo2@uao.edu.co', 'link_de_la_hoja_de_vida', 'contraseña123', 3, 1, 2, 3),
	(2, 'micorreo@uao.edu.co', 'link_de_la_hoja_de_vida', 'contraseña123', 2, 2, 1, 1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
