-- DROP DATABASE proyectoweb;
-- 
USE proyectoweb; 

-- DROP DATABASE proyectoweb;

-- SELECT * FROM usuarios WHERE email = "micorreo2@uao.edu.co" AND contrasena = "contraseña123";

-- SELECT  
-- usuarios.nombre,
-- actividades.actividadtitulo,
-- actividades.actividaddescripcion,
-- actividades.actividadestado,
-- actividades.actividadfechaentrega
-- 
-- FROM listaintegrantes
-- JOIN integrantes ON listaintegrantes.integrante=  integrantes.id  
-- JOIN usuarios ON integrantes.usuario = usuarios.id
-- JOIN listaactividades ON integrantes.id = listaactividades.integrante
-- JOIN actividades ON listaactividades.actividad = actividades.id
-- WHERE usuarios.id = 1; 

-- SELECT  
-- usuarios.nombre,
-- actividades.titulo,
-- actividades.descripcion,
-- actividades.estado,
-- actividades.fechaentrega
-- 
-- FROM listaintegrantes
-- JOIN integrantes ON listaintegrantes.integrante=  integrantes.id  
-- JOIN usuarios ON integrantes.usuario = usuarios.id
-- JOIN listaactividades ON integrantes.id = listaactividades.integrante
-- JOIN actividades ON listaactividades.actividad = actividades.id
-- JOIN proyectos ON listaintegrantes.proyecto = proyectos.id
-- WHERE proyectos.id = 1  ; 

--  SELECT  
-- usuarios.nombre,
-- actividades.actividadtitulo,
-- actividades.actividaddescripcion,
-- actividades.actividadestado,
-- actividades.actividadfechaentrega
-- 
-- FROM listaintegrantes
-- JOIN integrantes ON listaintegrantes.integrante=  integrantes.id  
-- JOIN usuarios ON integrantes.usuario = usuarios.id
-- JOIN listaactividades ON integrantes.id = listaactividades.integrante
-- JOIN actividades ON listaactividades.actividad = actividades.id
-- JOIN proyectos ON listaintegrantes.proyecto = proyectos.id
-- WHERE proyectos.id IN  (
-- SELECT proyectos.id 
-- FROM proyectos
-- JOIN listaintegrantes ON proyectos.id = listaintegrantes.proyecto 
-- JOIN integrantes ON listaintegrantes.integrante = integrantes.id
-- JOIN usuarios ON integrantes.usuario = usuarios.id
-- WHERE usuarios.email = "micorreo2@uao.edu.co" AND usuarios.contrasena = "contraseña123"
--   );   
-- 

-- SELECT proyectos.proyectonombre,
-- practicas.practicanombre,
-- alfas.alfanombre,
-- alfas.alfaestado
-- FROM usuarios
-- 
-- JOIN integrantes ON usuarios.id = integrantes.usuario
-- JOIN listaintegrantes ON integrantes.id = listaintegrantes.integrante
-- JOIN proyectos ON   listaintegrantes.proyecto = proyectos.id
-- JOIN metodologias ON proyectos.metodologia = metodologias.id
-- JOIN listapracticas ON metodologias.id = listapracticas.metodologia
-- JOIN practicas ON listapracticas.practica = practicas.id
-- JOIN listaalfas ON practicas.id = listaalfas.practica
-- JOIN alfas ON listaalfas.alfa = alfas.id
--  WHERE usuarios.email = "micorreo2@uao.edu.co" AND usuarios.contrasena = "contraseña123"; 

-- SELECT 
--     proyectos.proyectonombre,
--     proyectos.proyectodescripcion,
--     proyectos.proyectoestado,
--     proyectos.proyectoicon,
--     proyectos.proyectobanner
-- FROM usuarios
-- JOIN integrantes ON usuarios.id = integrantes.usuario
-- JOIN listaintegrantes ON integrantes.id = listaintegrantes.integrante
-- JOIN proyectos ON   listaintegrantes.proyecto = proyectos.id
-- WHERE proyectos.id IN  (
-- SELECT proyectos.id 
-- FROM proyectos
-- JOIN listaintegrantes ON proyectos.id = listaintegrantes.proyecto 
-- JOIN integrantes ON listaintegrantes.integrante = integrantes.id
-- JOIN usuarios ON integrantes.usuario = usuarios.id
-- WHERE usuarios.id = 1
--   ) GROUP BY proyectos.id ;   

-- SELECT 
--     proyectos.id,
--     proyectos.proyectonombre,
--     proyectos.proyectodescripcion,
--     proyectos.proyectoestado,
--     proyectos.proyectoicon,
--     proyectos.proyectobanner
-- FROM usuarios
-- JOIN integrantes ON usuarios.id = integrantes.usuario
-- JOIN listaintegrantes ON integrantes.id = listaintegrantes.integrante
-- JOIN proyectos ON   listaintegrantes.proyecto = proyectos.id
-- WHERE proyectos.id IN  (
-- SELECT proyectos.id 
-- FROM proyectos
-- JOIN listaintegrantes ON proyectos.id = listaintegrantes.proyecto 
-- JOIN integrantes ON listaintegrantes.integrante = integrantes.id
-- JOIN usuarios ON integrantes.usuario = usuarios.id
-- WHERE usuarios.id = ${id}
--   ) and proyectos.id=1; 

-- SELECT 
-- usuarios.nombre,
-- usuarios.fotoperfil,
-- palabrasclave.palabra,
-- roles.roltitulo,
-- roles.roldescripcion
-- 
-- FROM 
-- proyectos
-- JOIN listaintegrantes ON proyectos.id = listaintegrantes.proyecto
-- JOIN integrantes ON listaintegrantes.integrante = integrantes.id
-- JOIN roles ON integrantes.rol = roles.id
-- JOIN usuarios ON integrantes.usuario = usuarios.id
-- JOIN palabrasclave ON usuarios.id=  palabrasclave.pcusuario
-- WHERE proyectos.id=1;
-- SELECT 
-- 
-- reuniones.reuniontitulo,
-- reuniones. reunionfecha,
-- reuniones.reunionhora,
-- reuniones.reuniondurancion 
-- FROM 
-- proyectos
-- JOIN historiales ON proyectos.historia = historiales.id 
-- JOIN listaeventos ON historiales.id = listaeventos.historial
-- JOIN eventos ON listaeventos.evento = eventos.id
-- JOIN listareuniones ON eventos.id = listareuniones.evento
-- JOIN reuniones ON listareuniones.reunion = reuniones.id
-- WHERE proyectos.id= 1 ; 

SELECT proyectos.proyectonombre,
practicas.practicanombre,
alfas.alfanombre,
alfas.alfaestado
FROM proyectos
JOIN metodologias ON proyectos.metodologia = metodologias.id
JOIN listapracticas ON metodologias.id = listapracticas.metodologia
JOIN practicas ON listapracticas.practica = practicas.id
JOIN listaalfas ON practicas.id = listaalfas.practica
JOIN alfas ON listaalfas.alfa = alfas.id
 WHERE proyectos.id = 1 ; 

 

