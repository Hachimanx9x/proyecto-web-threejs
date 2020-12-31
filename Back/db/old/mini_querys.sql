-- conocer todas las actividades de un usuario
SELECT  
usuarios.nombre,
actividades.actividadtitulo,
actividades.actividaddescripcion,
actividades.actividadestado,
actividades.actividadfechaentrega

FROM listaintegrantes
JOIN integrantes ON listaintegrantes.integrante=  integrantes.id  
JOIN usuarios ON integrantes.usuario = usuarios.id
JOIN listaactividades ON integrantes.id = listaactividades.integrante
JOIN actividades ON listaactividades.actividad = actividades.id
WHERE usuarios.id = 2;


-- conocer todos los proyectos con sus alfas de un usuario
SELECT proyectos.proyectonombre,
practicas.practicanombre,
alfas.alfanombre,
alfas.alfaestado
FROM usuarios

JOIN integrantes ON usuarios.id = integrantes.usuario
JOIN listaintegrantes ON integrantes.usuario = listaintegrantes.integrante
JOIN proyectos ON   listaintegrantes.proyecto = proyectos.id
JOIN metodologias ON proyectos.metodologia = metodologias.id
JOIN listapracticas ON metodologias.id = listapracticas.metodologia
JOIN practicas ON listapracticas.practica = practicas.id
JOIN listaalfas ON practicas.id = listaalfas.practica
JOIN alfas ON listaalfas.alfa = alfas.id
 WHERE usuarios.email = "micorreo2@uao.edu.co" AND usuarios.contrasena = "contraseña123"; 
 
 -- todos las activiades de un proyecto donde este un usuario
 SELECT  
usuarios.nombre,
actividades.actividadtitulo,
actividades.actividaddescripcion,
actividades.actividadestado,
actividades.actividadfechaentrega

FROM listaintegrantes
JOIN integrantes ON listaintegrantes.integrante=  integrantes.id  
JOIN usuarios ON integrantes.usuario = usuarios.id
JOIN listaactividades ON integrantes.id = listaactividades.integrante
JOIN actividades ON listaactividades.actividad = actividades.id
JOIN proyectos ON listaintegrantes.proyecto = proyectos.id
WHERE proyectos.id IN  (
SELECT proyectos.id 
FROM proyectos
JOIN listaintegrantes ON proyectos.id = listaintegrantes.proyecto 
JOIN integrantes ON listaintegrantes.integrante = integrantes.id
JOIN usuarios ON integrantes.usuario = usuarios.id
WHERE usuarios.email = "micorreo2@uao.edu.co" AND usuarios.contrasena = "contraseña123"
  );  
