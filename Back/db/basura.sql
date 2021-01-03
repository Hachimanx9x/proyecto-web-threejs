-- DROP DATABASE proyectoweb;
-- 
USE proyectoweb; 

-- DROP DATABASE proyectoweb;


SELECT 
actividades.id AS "actid",
contenidos.id
FROM proyectos pro
INNER JOIN listaintegrantes ON pro.id = listaintegrantes.proyecto
INNER JOIN integrantes ON listaintegrantes.integrante = integrantes.id
INNER JOIN listaactividades ON integrantes.id = listaactividades.integrante
INNER JOIN actividades ON listaactividades.actividad = actividades.id
INNER JOIN metodologias ON pro.metodologia = metodologias.id
INNER JOIN listapracticas ON metodologias.id = listapracticas.metodologia
INNER JOIN practicas ON listapracticas.practica = practicas.id
INNER JOIN listaalfas ON practicas.id = listaalfas.practica
INNER JOIN alfas ON listaalfas.alfa = alfas.id
INNER JOIN listaentregables ON alfas.id = listaentregables.alfa
INNER JOIN entregables ON listaentregables.entregable = entregables.id
INNER JOIN listacontenidos lisco1 ON actividades.id = lisco1.actividad 
LEFT JOIN listacontenidos lisco2 ON actividades.id = lisco2.contenido 
LEFT JOIN contenidos con1 ON lisco1.contenido = con1.id
LEFT JOIN contenidos con2 ON lisco2.contenido = con2.id
WHERE pro.id =1; 

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








 