-- DROP DATABASE proyectoweb;
-- 
USE proyectoweb; 

-- DROP DATABASE proyectoweb;

-- SELECT 
-- 
-- contenidos.contenidonombrearchivo,
-- proyectos.id
-- 
--  FROM contenidos 
-- JOIN listacontenidos ON contenidos.id = listacontenidos.contenido
-- JOIN actividades ON listacontenidos.actividad = actividades.id
-- JOIN listaactividades ON actividades.id = listaactividades.actividad
-- JOIN integrantes ON  listaactividades.integrante =  integrantes.id
-- JOIN listaintegrantes ON integrantes.id = listaintegrantes.integrante
-- JOIN proyectos ON listaintegrantes.proyecto = proyectos.id
-- WHERE actividades.id IN (1,2)

 SELECT  
    usuarios.nombre,
    proyectos.id,
    actividades.actividadtitulo,
    actividades.actividaddescripcion,
    actividades.actividadestado,
    actividades.actividadfechaentrega,
    contenidos.contenidonombre,
    contenidos.contenidonombrearchivo
    
    FROM listaintegrantes
    JOIN integrantes ON listaintegrantes.integrante=  integrantes.id  
    JOIN usuarios ON integrantes.usuario = usuarios.id
    JOIN listaactividades ON integrantes.id = listaactividades.integrante
    JOIN actividades ON listaactividades.actividad = actividades.id
    JOIN listacontenidos ON actividades.id = listacontenidos.actividad
    JOIN contenidos ON listacontenidos.contenido = contenidos.id
    JOIN proyectos ON listaintegrantes.proyecto = proyectos.id
    WHERE usuarios.id = 1; 