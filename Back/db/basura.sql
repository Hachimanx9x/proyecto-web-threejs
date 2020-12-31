-- DROP DATABASE proyectoweb;
-- 
USE proyectoweb; 

-- DROP DATABASE proyectoweb;


 SELECT * FROM usuarios
 JOIN listaherramientas ON usuarios.id = listaherramientas.usuario
 JOIN herramientas ON listaherramientas.herramientausada = herramientas.id
WHERE usuarios.is =1; 
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


-- SELECT 
-- 
-- proyectos.id AS "proyectoid",
-- reuniones.id AS "reunionid",
-- reuniones.reuniontitulo,
-- reuniones.reunionfecha,
-- reuniones.reunionhora,
-- reuniones.reuniondurancion,
-- reuniones.reuniondescripcion,
-- reuniones.vigente,
-- actividades.id AS "actividadesid",
-- actividades.actividadtitulo,
-- actividades.actividaddescripcion,
-- actividades.actividadfechaentrega,
-- actividades.actividadestado,
-- entregables.id AS "entregaid",
-- entregables.entregatitulo,
-- entregables.entregadescripcion,
-- entregables.entregaestado,
-- entregables.entregafechaEntrega
-- FROM usuarios
-- JOIN integrantes ON usuarios.id = integrantes.usuario
-- JOIN listaeventos ON integrantes.id = listaeventos.integrante
-- JOIN historiales ON listaeventos.historial = historiales.id
-- JOIN proyectos ON historiales.id = proyectos.historia
-- JOIN eventos ON listaeventos.evento = eventos.id
-- JOIN listareuniones ON eventos.id = listareuniones.reunion
-- JOIN reuniones ON listareuniones.reunion = reuniones.id
-- JOIN listaactividades ON integrantes.id = listaactividades.integrante
-- JOIN actividades ON listaactividades.actividad = actividades.id
-- JOIN metodologias ON proyectos.metodologia = metodologias.id
-- JOIN listapracticas ON metodologias.id = listapracticas.metodologia
-- JOIN practicas ON listapracticas.practica = practicas.id
-- JOIN listaalfas ON practicas.id = listaalfas.practica
-- JOIN alfas ON listaalfas.alfa = alfas.id
-- JOIN listaentregables ON alfas.id = listaentregables.alfa
-- JOIN entregables ON  listaentregables.entregable = entregables.id
-- WHERE usuarios.id =2; 








 