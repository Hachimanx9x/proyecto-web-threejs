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

proyectos.id,
reuniones.reuniontitulo,
reuniones.reunionfecha,
reuniones.reunionhora,
reuniones.reuniondurancion,
reuniones.reuniondescripcion,
reuniones.vigente,
actividades.actividadtitulo,
actividades.actividaddescripcion,
actividades.actividadfechaentrega,
actividades.actividadestado,
entregables.entregatitulo,
entregables.entregadescripcion,
entregables.entregaestado,
entregables.entregafechaEntrega
FROM usuarios
INNER JOIN integrantes ON usuarios.id = integrantes.usuario
INNER JOIN listaeventos ON integrantes.id = listaeventos.integrante
INNER JOIN historiales ON listaeventos.historial = historiales.id
INNER JOIN proyectos ON historiales.id = proyectos.historia
INNER JOIN eventos ON listaeventos.evento = eventos.id
INNER JOIN listareuniones ON eventos.id = listareuniones.reunion
INNER JOIN reuniones ON listareuniones.reunion = reuniones.id
INNER JOIN listaactividades ON integrantes.id = listaactividades.integrante
INNER JOIN actividades ON listaactividades.actividad = actividades.id
INNER JOIN metodologias ON proyectos.metodologia = metodologias.id
INNER JOIN listapracticas ON metodologias.id = listapracticas.metodologia
INNER JOIN practicas ON listapracticas.practica = practicas.id
INNER JOIN listaalfas ON practicas.id = listaalfas.practica
INNER JOIN alfas ON listaalfas.alfa = alfas.id
INNER JOIN listaentregables on alfas.id = listaentregables.alfa
INNER JOIN entregables on  listaentregables.entregable = entregables.id
WHERE usuarios.id =1; 






 