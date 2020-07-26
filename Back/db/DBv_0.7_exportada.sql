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

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla proyectoweb.anotaciones
CREATE TABLE IF NOT EXISTS `anotaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rl_archivo` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla proyectoweb.chats
CREATE TABLE IF NOT EXISTS `chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url_archivo` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla proyectoweb.contactos
CREATE TABLE IF NOT EXISTS `contactos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `personas` int(11) DEFAULT NULL,
  `preferencias` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `personas` (`personas`),
  CONSTRAINT `contactos_ibfk_1` FOREIGN KEY (`personas`) REFERENCES `personas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla proyectoweb.contenidos
CREATE TABLE IF NOT EXISTS `contenidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `url_documentacion` varchar(50) DEFAULT NULL,
  `bibliografica` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla proyectoweb.herramientas
CREATE TABLE IF NOT EXISTS `herramientas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `tipo` varchar(20) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `url_icono` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla proyectoweb.idiomas
CREATE TABLE IF NOT EXISTS `idiomas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `nivel` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla proyectoweb.personas
CREATE TABLE IF NOT EXISTS `personas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `otro` varchar(100) DEFAULT NULL,
  `pais` varchar(20) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla proyectoweb.tecnicas
CREATE TABLE IF NOT EXISTS `tecnicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `urlDocumento` varchar(50) DEFAULT NULL,
  `bibliografia` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla proyectoweb.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `otro` varchar(50) DEFAULT NULL,
  `pais` varchar(20) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `correoElectronico` varchar(50) DEFAULT NULL,
  `urlHojaVida` varchar(50) DEFAULT NULL,
  `experiencia` int(11) DEFAULT NULL,
  `contacto` int(11) DEFAULT NULL,
  `habilidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contacto` (`contacto`),
  KEY `habilidad` (`habilidad`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`contacto`) REFERENCES `contactos` (`id`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`habilidad`) REFERENCES `habilidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
