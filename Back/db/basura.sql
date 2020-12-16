-- DROP DATABASE proyectoweb;
-- 
USE proyectoweb; 

-- DROP DATABASE proyectoweb;

-- SELECT * FROM usuarios WHERE email = "micorreo2@uao.edu.co" AND contrasena = "contraseña123";

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
-- WHERE proyectos.id IN  (
-- SELECT proyectos.id 
-- FROM proyectos
-- JOIN listaintegrantes ON proyectos.id = listaintegrantes.proyecto 
-- JOIN integrantes ON listaintegrantes.integrante = integrantes.id
-- JOIN usuarios ON integrantes.usuario = usuarios.id
-- WHERE usuarios.email = "micorreo2@uao.edu.co" AND usuarios.contrasena = "contraseña123"
--   );  


-- SELECT proyectos.nombre,
-- practicas.nombre,
-- alfas.nombre,
-- alfas.estado
-- FROM usuarios
-- 
-- JOIN integrantes ON usuarios.id = integrantes.usuario
-- JOIN listaintegrantes ON integrantes.usuario = listaintegrantes.integrante
-- JOIN proyectos ON   listaintegrantes.proyecto = proyectos.id
-- JOIN metodologias ON proyectos.metodologia = metodologias.id
-- JOIN listapracticas ON metodologias.id = listapracticas.metodologia
-- JOIN practicas ON listapracticas.practica = practicas.id
-- JOIN listaalfas ON practicas.id = listaalfas.practica
-- JOIN alfas ON listaalfas.alfa = alfas.id
--  WHERE usuarios.email = "micorreo2@uao.edu.co" AND usuarios.contrasena = "contraseña123"; 