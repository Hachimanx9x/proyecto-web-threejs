-- DROP DATABASE proyectoweb;
-- 
USE proyectoweb; 

-- DROP DATABASE proyectoweb;

SELECT 

contenidos.contenidonombrearchivo,
@DBNAME = proyectos.id

 FROM contenidos 
JOIN listacontenidos ON contenidos.id = listacontenidos.contenido
JOIN actividades ON listacontenidos.actividad = actividades.id
JOIN listaactividades ON actividades.id = listaactividades.actividad
JOIN integrantes ON  listaactividades.integrante =  integrantes.id
JOIN listaintegrantes ON integrantes.id = listaintegrantes.integrante
JOIN proyectos ON listaintegrantes.proyecto = proyectos.id
WHERE actividades.id =1

 