-- DROP DATABASE proyectoweb;
-- 
USE proyectoweb; 

-- DROP DATABASE proyectoweb;


SELECT 

actividades.id AS "actid",
actividades.actividadtitulo,
actividades.actividaddescripcion,
actividades.actividadestado,
actividades.actividadfechacreacion,
actividades.actividadfechaentrega,
actividades.actividadrevision,

proyectos.id AS "proid",
contenidos.id AS "conid",
contenidos.contenidonombre,
contenidos.contenidonombrearchivo,
contenidos.contenidodescripcion

FROM actividades 
JOIN listaactividades ON actividades.id = listaactividades.actividad
JOIN integrantes ON listaactividades.integrante = integrantes.id
JOIN listaintegrantes ON integrantes.id = listaintegrantes.integrante
JOIN proyectos ON listaintegrantes.proyecto = proyectos.id
JOIN listacontenidos ON actividades.id = listacontenidos.actividad
JOIN contenidos ON listacontenidos.contenido = contenidos.id
WHERE proyectos.id =1; 

SELECT 
entregables.id AS "entrid",
entregables.entregatitulo,
entregables.entregadescripcion,
entregables.entregaestado,
entregables.entregatipoArchivo,
entregables.entregafechaEntrega,
entregables.entreganumeroRevisiones,

proyectos.id AS "proid",
contenidos.id AS "conid",
contenidos.contenidonombre,
contenidos.contenidonombrearchivo,
contenidos.contenidodescripcion

FROM entregables
JOIN listaentregables ON entregables.id = listaentregables.entregable
JOIN alfas ON listaentregables.alfa = alfas.id 
JOIN listaalfas ON alfas.id = listaalfas.alfa
JOIN practicas ON listaalfas.practica = practicas.id
JOIN listapracticas ON practicas.id = listapracticas.practica
JOIN metodologias ON listapracticas.metodologia = metodologias.id
JOIN proyectos ON metodologias.id = proyectos.metodologia
JOIN listacontenidos ON entregables.id = listacontenidos.entregable
JOIN contenidos ON listacontenidos.contenido = contenidos.id
WHERE proyectos.id = 1; 
 
--  SELECT 
--  usuarios.id AS "userid",
--  usuarios.fotoperfil,
--  usuarios.nombrearchivohojadevida,
--  usuarios.anosdeexperiencia,
--  usuarios.nombre,
--  usuarios.descripcion,
--  usuarios.pais,
--  usuarios.github,
--  usuarios.gitlab,
--  usuarios.bitbucket,
--  usuarios.linkedin,
--  
--  palabrasclave.id AS "wordid",
--  palabrasclave.palabra, 
--  
--  herramientas.id AS "toolsid",
--  herramientas.herramientanombre,
--  herramientas.herramientadescripcion,
--  herramientas.herramientanombreIcono,
--  
--  habilidades.id  AS "abilityid",
--  habilidades.habilidadtipo,
--  habilidades.habilidaddescripcion,
--  habilidades.habilidadnivel
--  
--   FROM usuarios
--  JOIN listaherramientas ON usuarios.id = listaherramientas.usuario
--  JOIN herramientas ON listaherramientas.herramientausada = herramientas.id
--  JOIN listahabilidades ON usuarios.id = listahabilidades.usuario
--  JOIN habilidades ON listahabilidades.habilidad = habilidades.id 
--  JOIN palabrasclave ON usuarios.id = palabrasclave.pcusuario
--  
--  WHERE usuarios.id =1; 
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








 