const query = function (e) {
    return `SELECT * FROM  usuarios; `;
}
/**
 `7MM"""Yp,                                                          `7MM                   
  MM    Yb                                                            MM                   
  MM    dP `7MM  `7MM  ,pP"Ybd   ,dW"Yvd  `7MM  `7MM   .gP"Ya    ,M""bMM   ,6"Yb.  ,pP"Ybd 
  MM"""bg.   MM    MM  8I   `"  ,W'   MM    MM    MM  ,M'   Yb ,AP    MM  8)   MM  8I   `" 
  MM    `Y   MM    MM  `YMMMa.  8M    MM    MM    MM  8M"""""" 8MI    MM   ,pm9MM  `YMMMa. 
  MM    ,9   MM    MM  L.   I8  YA.   MM    MM    MM  YM.    , `Mb    MM  8M   MM  L.   I8 
.JMMmmmd9    `Mbod"YML.M9mmmP'   `MbmdMM    `Mbod"YML. `Mbmmd'  `Wbmd"MML.`Moo9^Yo.M9mmmP' 
                                      MM                                                   
                                    .JMML.                                                  
 */
//--------------busquedas personalizadas
query.login = function (obj) {
    const { email, password } = obj;
    //
    return `SELECT * FROM usuarios WHERE email = "${email}" AND contrasena = "${password}" `
}
query.usuarioid = function (id) {
    return `SELECT * FROM usuarios WHERE id = ${id}; `
}
query.proyectoid = function (id) {
    return `SELECT * FROM proyectos WHERE id = ${id}; `
}
query.obtenerEscritorioActividades = function (id) {
    return (` SELECT  
    usuarios.nombre,
    proyectos.id,
    actividades.id AS "actividadid",
    actividades.actividadtitulo,
    actividades.actividaddescripcion,
    actividades.actividadestado,
    actividades.actividadfechaentrega,
    contenidos.contenidonombrearchivo
    
    FROM listaintegrantes
    JOIN integrantes ON listaintegrantes.integrante=  integrantes.id  
    JOIN usuarios ON integrantes.usuario = usuarios.id
    JOIN listaactividades ON integrantes.id = listaactividades.integrante
    JOIN actividades ON listaactividades.actividad = actividades.id
    JOIN listacontenidos ON actividades.id = listacontenidos.actividad
    JOIN contenidos ON listacontenidos.contenido = contenidos.id
    JOIN proyectos ON listaintegrantes.proyecto = proyectos.id
    WHERE usuarios.id = ${id}  `);
}

query.obtenerEscritorioProyectos = function (id) {
    return (`SELECT 
    proyectos.id,
    proyectos.proyectonombre,
    practicas.practicanombre,
    alfas.alfanombre,
    alfas.alfaestado
	from proyectos
	join metodologias on  proyectos.metodologia = metodologias.id
	join listapracticas on metodologias.id = listapracticas.metodologia
	join practicas on listapracticas.practica = practicas.id
	join listaalfas on practicas.id = listaalfas.practica
	join alfas on listaalfas.alfa = alfas.id
	where proyectos.id in (select 
proyectos.id
from proyectos
join listaintegrantes on proyectos.id = listaintegrantes.proyecto
join integrantes on listaintegrantes.integrante = integrantes.id
join usuarios on integrantes.usuario = usuarios.id
where usuarios.id =${id}); `);
}
query.obtenerProyecto = function (id) {
    return (`SELECT 
    proyectos.id,
    proyectos.proyectonombre,
    proyectos.proyectodescripcion,
    proyectos.proyectoestado,
    proyectos.proyectoicon,
    proyectos.proyectobanner
FROM usuarios
JOIN integrantes ON usuarios.id = integrantes.usuario
JOIN listaintegrantes ON integrantes.id = listaintegrantes.integrante
JOIN proyectos ON   listaintegrantes.proyecto = proyectos.id
WHERE proyectos.id IN  (
SELECT proyectos.id 
FROM proyectos
JOIN listaintegrantes ON proyectos.id = listaintegrantes.proyecto 
JOIN integrantes ON listaintegrantes.integrante = integrantes.id
JOIN usuarios ON integrantes.usuario = usuarios.id
WHERE usuarios.id = ${id}
  ) GROUP BY proyectos.id ;`);
}

query.obtenercalendario = function (id) {
    return `SELECT 

    proyectos.id AS "proyectoid",
    reuniones.id AS "reunionid",
    reuniones.reuniontitulo,
    reuniones.reunionfecha,
    reuniones.reunionhora,
    reuniones.reuniondurancion,
    reuniones.reuniondescripcion,
    reuniones.vigente,
    actividades.id AS "actividadesid",
    actividades.actividadtitulo,
    actividades.actividaddescripcion,
    actividades.actividadfechaentrega,
    actividades.actividadestado,
    entregables.id AS "entregaid",
    entregables.entregatitulo,
    entregables.entregadescripcion,
    entregables.entregaestado,
    entregables.entregafechaEntrega
    FROM usuarios
    JOIN integrantes ON usuarios.id = integrantes.usuario
    JOIN listaeventos ON integrantes.id = listaeventos.integrante
    JOIN historiales ON listaeventos.historial = historiales.id
    JOIN proyectos ON historiales.id = proyectos.historia
    JOIN eventos ON listaeventos.evento = eventos.id
    JOIN listareuniones ON eventos.id = listareuniones.reunion
    JOIN reuniones ON listareuniones.reunion = reuniones.id
    JOIN listaactividades ON integrantes.id = listaactividades.integrante
    JOIN actividades ON listaactividades.actividad = actividades.id
    JOIN metodologias ON proyectos.metodologia = metodologias.id
    JOIN listapracticas ON metodologias.id = listapracticas.metodologia
    JOIN practicas ON listapracticas.practica = practicas.id
    JOIN listaalfas ON practicas.id = listaalfas.practica
    JOIN alfas ON listaalfas.alfa = alfas.id
    JOIN listaentregables ON alfas.id = listaentregables.alfa
    JOIN entregables ON  listaentregables.entregable = entregables.id
    WHERE usuarios.id=${id}; `;
}
query.buscarProyecto = function (id) {
    return (`SELECT 
    proyectos.id AS "idproyecto",
    proyectos.proyectonombre,
    proyectos.proyectodescripcion,
    proyectos.proyectoestado,
    proyectos.proyectoicon,
    proyectos.proyectobanner,
	usuarios.nombre,
	roles.roltitulo,
	actividades.actividadestado,
	practicas.practicanombre,
	alfas.alfanombre,
	alfas.alfaestado,
	entregables.entregaestado
FROM usuarios
JOIN integrantes ON usuarios.id = integrantes.usuario
join roles on integrantes.rol = roles.id
JOIN listaintegrantes ON integrantes.id = listaintegrantes.integrante
JOIN listaactividades ON integrantes.id = listaactividades.integrante
 JOIN actividades ON listaactividades.actividad = actividades.id
JOIN proyectos ON   listaintegrantes.proyecto = proyectos.id
join metodologias on  proyectos.metodologia = metodologias.id
join listapracticas on metodologias.id = listapracticas.metodologia
	join practicas on listapracticas.practica = practicas.id
	join listaalfas on practicas.id = listaalfas.practica
	join alfas on listaalfas.alfa = alfas.id
	join listaentregables on alfas.id = listaentregables.alfa
	join entregables on listaentregables.entregable = entregables.id
WHERE proyectos.id = ${id};   `);
}

query.buscarintegrantesproyecto = function (id) {
    return (`SELECT 
    usuarios.nombre,
    usuarios.fotoperfil,
    palabrasclave.palabra,
    roles.roltitulo,
    roles.roldescripcion
    
    FROM 
    proyectos
    JOIN listaintegrantes ON proyectos.id = listaintegrantes.proyecto
    JOIN integrantes ON listaintegrantes.integrante = integrantes.id
    JOIN roles ON integrantes.rol = roles.id
    JOIN usuarios ON integrantes.usuario = usuarios.id
    JOIN palabrasclave ON usuarios.id=  palabrasclave.pcusuario
    WHERE proyectos.id=${id};`);
}

query.buscarEventosReunionesProyecto = function (id) {
    return (`SELECT 
    usuarios.nombre,
    usuarios.fotoperfil,
    palabrasclave.palabra,
    roles.roltitulo,
    roles.roldescripcion
    
    FROM 
    proyectos
    JOIN listaintegrantes ON proyectos.id = listaintegrantes.proyecto
    JOIN integrantes ON listaintegrantes.integrante = integrantes.id
    JOIN roles ON integrantes.rol = roles.id
    JOIN usuarios ON integrantes.usuario = usuarios.id
    JOIN palabrasclave ON usuarios.id=  palabrasclave.pcusuario
    WHERE proyectos.id=${id};`);
}

query.buscarEstadoProyecto = function (id) {
    return (`SELECT proyectos.proyectonombre,
    practicas.practicanombre,
    alfas.alfanombre,
    alfas.alfaestado
    FROM proyectos
    JOIN metodologias ON proyectos.metodologia = metodologias.id
    JOIN listapracticas ON metodologias.id = listapracticas.metodologia
    JOIN practicas ON listapracticas.practica = practicas.id
    JOIN listaalfas ON practicas.id = listaalfas.practica
    JOIN alfas ON listaalfas.alfa = alfas.id
     WHERE proyectos.id = ${id} ; `);
}

query.buscartalentos = function () {
    return ` SELECT 
    usuarios.id,
    usuarios.nombre,
    usuarios.descripcion,
    palabrasclave.palabra,
    herramientas.herramientanombre,
    herramientas.herramientadescripcion,
    herramientas.herramientanombreIcono
    FROM usuarios
    JOIN palabrasclave ON usuarios.id = palabrasclave.pcusuario
    JOIN listaherramientas ON usuarios.id = listaherramientas.usuario
    JOIN herramientas ON listaherramientas.herramientausada = herramientas.id; `;
}

query.buscarcontactosusuario = function (id) {
    return `SELECT 
    usuarios.id,
    usuarios.nombre,
    palabrasclave.palabra,
    contactos.preferencias
    FROM usuarios
    JOIN contactos ON usuarios.id = contactos.contactousuario
    JOIN palabrasclave ON usuarios.id = palabrasclave.pcusuario
    WHERE contactos.id IN (
    SELECT 
    listacontactos.contacto
    FROM usuarios
    JOIN listacontactos ON usuarios.id = listacontactos.usuario
    WHERE usuarios.id=${id}
    ) ; `;
}
query.buscarcontactosusuariotalento = function (id) {
    return `SELECT 
    usuarios.id AS "userid",
    usuarios.fotoperfil,
    usuarios.nombrearchivohojadevida,
    usuarios.anosdeexperiencia,
    usuarios.nombre,
    usuarios.descripcion,
    usuarios.pais,
    usuarios.github,
    usuarios.gitlab,
    usuarios.bitbucket,
    usuarios.linkedin,
    
    palabrasclave.id AS "wordid",
    palabrasclave.palabra, 
    
    herramientas.id AS "toolsid",
    herramientas.herramientanombre,
    herramientas.herramientadescripcion,
    herramientas.herramientanombreIcono,
    
    habilidades.id  AS "abilityid",
    habilidades.habilidadtipo,
    habilidades.habilidaddescripcion,
    habilidades.habilidadnivel
    
     FROM usuarios
    JOIN listaherramientas ON usuarios.id = listaherramientas.usuario
    JOIN herramientas ON listaherramientas.herramientausada = herramientas.id
    JOIN listahabilidades ON usuarios.id = listahabilidades.usuario
    JOIN habilidades ON listahabilidades.habilidad = habilidades.id 
    JOIN palabrasclave ON usuarios.id = palabrasclave.pcusuario
    
    WHERE usuarios.id =${id}; `;
}

query.obtenerproyectosactividadescompleto = function (id) {
    return `SELECT 

    actividades.id AS "actid",
    actividades.actividadtitulo,
    actividades.actividaddescripcion,
    actividades.actividadestado,
    actividades.actividadfechacreacion,
    actividades.actividadfechaentrega,
    actividades.actividadrevision,
    
    usuarios.id AS "userid",
    usuarios.nombre,
    roles.roltitulo,
    tecnicas.tecnicatitulo, 
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
    JOIN usuarios ON integrantes.usuario = usuarios.id
    JOIN roles ON integrantes.rol = roles.id
    JOIN tecnicas ON actividades.tecnica = tecnicas.id
    WHERE proyectos.id =${id}; `;
}
query.obtenerproyectoentregablescompleto = function (id) {
    return `SELECT 
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
    WHERE proyectos.id =${id}; `;
}
query.obtenerintegrantyrol = function (id) {
    return `SELECT
    integrantes.id,
    roles.roltitulo
    from integrantes
    join roles on integrantes.rol = roles.id
    where integrantes.id = ${id}; `
}
query.obtenerentregableconactividad = function (id) {
    return `SELECT 
    entregas.id AS "entregaid", 
    actividades.id AS "actividadid" ,
	actividades.actividadtitulo,
	actividades.actividaddescripcion,
	actividades.actividadrevision,
	actividades.actividadfechaentrega,
	contenidos.id as "contenidoid",
	proyectos.id as "proyectoid"
    from  actividades
    join entregas on actividades.id = entregas.actividad
	join listacontenidos on actividades.id = listacontenidos.actividad
	join contenidos on listacontenidos.contenido= contenidos.id
	join listaactividades on actividades.id = listaactividades.actividad
	join integrantes on listaactividades.integrante = integrantes.id
	join listaintegrantes on integrantes.id = listaintegrantes.integrante
	join proyectos on listaintegrantes.proyecto = proyectos.id
    where actividades.id =${id}; `
}
query.obtenerentreconcotenido = function (id) {
    return `SELECT
    entregables.id AS "entregableid",
    entregables.entregatitulo ,
    entregables.entregadescripcion,
    entregables.entreganumeroRevisiones,
    entregables.entregaestado,
    entregas.id AS "entregaid",
    contenidos.id AS "contenidoid",
    proyectos.id AS "proyectoid"
    from entregables
    join listacontenidos on entregables.id = listacontenidos.entregable
    join entregas on entregables.id = entregas.entragable
    join contenidos on listacontenidos.contenido= contenidos.id
    join listaentregables on entregables.id = listaentregables.entregable
    join alfas on listaentregables.alfa = alfas.id
    join listaalfas on listaalfas.alfa = alfas.id
    join practicas on listaalfas.practica = practicas.id
    join listapracticas on practicas.id = listapracticas.practica
    join metodologias on listapracticas.metodologia = metodologias.id
    join proyectos on     metodologias.id = proyectos.metodologia
    where entregables.id = ${id}; `
}
query.obteneracticontinte = function (id) {
    return `SELECT 
    integrantes.id AS "integraid",
    actividades.id AS "actividadid",
    contenidos.id AS "contenidoid",
    contenidos.contenidonombrearchivo AS "archivos",
    entregas.id AS "entregaid"
    from proyectos
    join listaintegrantes on proyectos.id = listaintegrantes.proyecto
    join integrantes on listaintegrantes.integrante = integrantes.id
    join listaactividades on integrantes.id = listaactividades.integrante
    join actividades on listaactividades.actividad = actividades.id
    join listacontenidos on actividades.id = listacontenidos.actividad
    join contenidos on listacontenidos.contenido = contenidos.id
    join entregas on actividades.id = entregas.actividad
    where proyectos.id = ${id}; 
        `
}

query.obtenerentregcontinte = function (id) {
    return ` SELECT 
    practicas.id AS "practicaid" ,
    alfas.id AS "alfaid" ,
    entregables.id AS "entregableid",
    entregas.id AS "entregaid",
    contenidos.contenidonombrearchivo AS "contenidoid"
    FROM proyectos
    join metodologias on proyectos.metodologia = metodologias.id
    join listapracticas on metodologias.id = listapracticas.metodologia
    join practicas on listapracticas.practica = practicas.id
    join listaalfas on practicas.id = listaalfas.practica
    join alfas on listaalfas.alfa = alfas.id
    join listaentregables on alfas.id = listaentregables.alfa
    join entregables on listaentregables.entregable= entregables.id
    join listacontenidos on entregables.id = listacontenidos.entregable
    join contenidos on listacontenidos.contenido = contenidos.id
    join entregas on entregables.id = entregas.entragable
    where proyectos.id = ${id};`
}

//-------------busquedas por tablas
query.obtenertodasIdiomas = function () { return `SELECT * FROM idiomas ; `; }
query.obtenertodasHabilidades = function () { return `SELECT * FROM habilidades ; `; }
query.obtenertodasHerramientas = function () { return `SELECT * FROM herramientas ; `; }
query.obtenertodasUsuarios = function () { return `SELECT * FROM usuarios ; `; }
query.obtenertodasPalabrasClave = function () { return `SELECT * FROM palabrasclave ; `; }
query.obtenertodasListaidiomas = function () { return `SELECT * FROM listaidiomas ; `; }
query.obtenertodasContactos = function () { return `SELECT * FROM contactos ; `; }
query.obtenertodasListaContactos = function () { return `SELECT * FROM listacontactos ; `; }
query.obtenertodasListaHabilidades = function () { return `SELECT * FROM listahabilidades ; `; }
query.obtenertodasListaHerramientas = function () { return `SELECT * FROM listaherramientas ; `; }
query.obtenertodasMetodologias = function () { return `SELECT * FROM metodologias ; `; }
query.obtenertodasPracticas = function () { return `SELECT * FROM practicas ; `; }
query.obtenertodasListasPracticas = function () { return `SELECT * FROM listapracticas ; `; }
query.obtenertodasAlfas = function () { return `SELECT * FROM alfas ; `; }
query.obtenertodasListaAlfas = function () { return `SELECT * FROM listaalfas ; `; }
query.obtenertodasHerramientasMetodologia = function () { return `SELECT * FROM herramientasmetodologia ; `; }
query.obtenertodasTecnicas = function () { return `SELECT * FROM tecnicas ; `; }
query.obtenertodasActividades = function () { return `SELECT * FROM actividades ; `; }
query.obtenertodasRoles = function () { return `SELECT * FROM roles ; `; }
query.obtenertodasListaRoles = function () { return `SELECT * FROM listaroles ; `; }
query.obtenertodasIntegrantes = function () { return `SELECT * FROM integrantes ; `; }
query.obtenertodasListaActividades = function () { return `SELECT * FROM listaactividades ; `; }
query.obtenertodasContenidos = function () { return `SELECT * FROM contenidos ; `; }
query.obtenertodasEntregables = function () { return `SELECT * FROM entregables ; `; }
query.obtenertodasListaentregables = function () { return `SELECT * FROM listaentregables ; `; }
query.obtenertodasListaHerramientasMetodologia = function () { return `SELECT * FROM listaherramientasmetodologia ; `; }
query.obtenertodasListaContenidos = function () { return `SELECT * FROM listacontenidos ; `; }
query.obtenertodasEntregas = function () { return `SELECT * FROM entregas ; `; }
query.obtenertodasChats = function () { return `SELECT * FROM chats ; `; }
query.obtenertodasHistoriales = function () { return `SELECT * FROM historiales ; `; }
query.obtenertodasListaChats = function () { return `SELECT * FROM listachats ; `; }
query.obtenertodasProyectos = function () { return `SELECT * FROM proyectos ; `; }
query.obtenertodasReuniones = function () { return `SELECT * FROM reuniones ; `; }
query.obtenertodasListaReuniones = function () { return `SELECT * FROM listareuniones ; `; }
query.obtenertodasListaEntregas = function () { return `SELECT * FROM listaentregas ; `; }
query.obtenertodasEventos = function () { return `SELECT * FROM eventos ; `; }
query.obtenertodasListaEventos = function () { return `SELECT * FROM listaeventos ; `; }
query.obtenertodasListaIntegrantes = function () { return `SELECT * FROM listaintegrantes ; `; }
//-------------busquedas por tablas puntual
query.obtenerunrol = function (id) { return `SELECT * FROM roles where id = ${id} ; `; }
/**
 `7MMF'                                                 db                        
  MM                                                                             
  MM  `7MMpMMMb.  ,pP"Ybd  .gP"Ya  `7Mb,od8  ,p6"bo  `7MM   ,pW"Wq.  `7MMpMMMb.  
  MM    MM    MM  8I   `" ,M'   Yb   MM' "' 6M'  OO    MM  6W'   `Wb   MM    MM  
  MM    MM    MM  `YMMMa. 8M""""""   MM     8M         MM  8M     M8   MM    MM  
  MM    MM    MM  L.   I8 YM.    ,   MM     YM.    ,   MM  YA.   ,A9   MM    MM  
.JMML..JMML  JMML.M9mmmP'  `Mbmmd' .JMML.    YMbmd'  .JMML. `Ybmd9'  .JMML  JMML.
 */
//--------------------------------
//INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("Ingles","A1 Beginner");
query.insertLenguaje = function (nombre, nivel) {
    return `INSERT INTO IDIOMAS (idiomanombre, idiomanivel) VALUES ("${nombre}","${nivel}");`
}

//INSERT INTO usuarios (email, contrasena,fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion,pais ,edad, github, gitlab,bitbucket,linkedin)
//VALUES("micorreo2@uao.edu.co", "contraseña123","fotodefault1.jpg" ,"asdqdqsdwqds.txt", 0, "nestor ivan martinez marulanda", "Soy una persona que le gusta le modelo 3d la programacion y aprender cosas","Colombia", 21, "https://github.com/Accelx9", NULL,NULL,NULL);

query.insertUser = function (email, contrasena, fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion, pais, edad, github, gitlab, bitbucket, linkedin) {
    return `INSERT INTO usuarios (
        email, contrasena,fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion,pais ,edad, github, gitlab,bitbucket,linkedin)
    VALUES(
         "${email}", 
         "${contrasena}",
         "${fotoperfil}" ,
         "${nombrearchivohojadevida}",
          ${anosdeexperiencia}, 
         "${nombre}", 
         "${descripcion}",
         "${pais}", 
          ${edad}, 
         "${github}", 
         "${gitlab}",
         "${bitbucket}",
         "${linkedin}"); `;
}
//INSERT INTO palabrasclave (pcusuario, palabra) VALUES(1, "web develoment");
query.insertpalabraclave = function (user, palabra) {
    return `INSERT INTO palabrasclave (pcusuario, palabra) VALUES(${user}, "${palabra}");`
}
//INSERT INTO listaidiomas VALUES (1, 14);
query.insertlistaidiomas = function (user, idioma) {
    return `INSERT INTO listaidiomas VALUES (${user}, ${idioma});`
}
//INSERT INTO habilidades (habilidadtipo, habilidaddescripcion, habilidadnivel)  VALUES ("diseño ui", "Expecialista en diseño para la web", "medio") ; 
query.insertHabilidades = function (habilidadtipo, habilidaddescripcion, habilidadnivel) {
    return `INSERT INTO habilidades (habilidadtipo, habilidaddescripcion, habilidadnivel)  VALUES ("${habilidadtipo}", "${habilidaddescripcion}", "${habilidadnivel}") ; `;
}
//INSERT INTO listahabilidades VALUES(1, 1);
query.insertlistaHabilidades = function (usuario, habilidad) {
    return `INSERT INTO listahabilidades VALUES(${usuario}, ${habilidad}); `;
}

//INSERT INTO contactos (contactousuario, preferencias) VALUES (1, TRUE);
query.insertcontactos = function (usuario, preferencia) {
    return `INSERT INTO contactos (contactousuario, preferencias) VALUES (${usuario}, ${preferencia});`;
}
//INSERT INTO listacontactos VALUES(1, 2);
query.insertlistcontactos = function (usuario, contacto) {
    return `INSERT INTO listacontactos VALUES(${usuario}, ${contacto});`;
}
//INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES ("nodejs","Desarrollo software", "Node.js es un entorno multiplataforma, basado en el lenguaje de programación JavaScript.","nodejslogo.svg"); 
query.insertherramientas = function (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) {
    return `INSERT INTO herramientas (herramientanombre, herramientatipo, herramientadescripcion, herramientanombreIcono) VALUES 
    ("${herramientanombre}",
    "${herramientatipo}", 
    "${herramientadescripcion}",
    "${herramientanombreIcono}"); `;
}
//INSERT INTO listaherramientas VALUES(1,1); 
query.insertlistaherramientas = function (usuario, herramienta) {
    return `INSERT INTO listaherramientas VALUES(${usuario},${herramienta}); `;
}
//INSERT INTO metodologias(metodologianombre, metodologiadescripcion,metodologiaconsejo ) VALUES("metodologia para preprodución de un sistema multimedia [MPSM]", "es modular tiene varias practicas modular que utiliza las buenas practicas para la diseño de un sistema multimedia apoyado en metodos agiles","sigue tu corazon");
query.insertmetodologia = function (metodologianombre, metodologiadescripcion, metodologiaconsejo) {
    return `INSERT INTO metodologias (metodologianombre, metodologiadescripcion,metodologiaconsejo ) VALUES("${metodologianombre}", "${metodologiadescripcion}","${metodologiaconsejo}"); `;
}
//INSERT INTO historiales(historiadescripcion) VALUES("esta hara seguimiento a todos los suscesos echos en el prouyecto asociado");
query.inserthistoriales = function (historiadescripcion) {
    return `INSERT INTO historiales (historiadescripcion) VALUES("${historiadescripcion}");`;
}
//INSERT INTO proyectos (proyectonombre, proyectodescripcion, proyectoestado, proyectoicon,proyectobanner, metodologia, historia) 
//VALUES("Desarrollo de un entorno virtual colaborativo para preproducción de un sistema multimedia", "Como se expone en el apartado de planteamiento del problema los equipos de trabajo encargados de la preproducción de un sistema multimedia poseen muchos retos en la gestión, por lo tanto, el sistema propuesto por este documento podrá garantizar los siguientes beneficios","iniciada","iconoTemporaldelsistema.jpg","bannertemporal.jpg",1,1);
query.insertproyecto = function (proyectonombre, proyectodescripcion, proyectoestado, proyectoicon, proyectobanner, metodologia, historia) {
    return `INSERT INTO proyectos (proyectonombre, proyectodescripcion, proyectoestado, proyectoicon,proyectobanner, metodologia, historia) 
    VALUES("${proyectonombre}", "${proyectodescripcion}","${proyectoestado}","${proyectoicon}","${proyectobanner}",${metodologia},${historia});`;
}
//INSERT INTO practicas (practicanombre, practicadescripcion ) VALUES ("concepción del experiencia multimedia [CEM]", "se estara haciendo uso de fierentes herramientras para creacion de una ccorrecta experiencia");
query.insertpractica = function (practicanombre, practicadescripcion) {
    return `INSERT INTO practicas (practicanombre, practicadescripcion ) VALUES ("${practicanombre}", "${practicadescripcion}");`;
}
//INSERT INTO listapracticas VALUES (1, 1); 
query.insertlistapracticas = function (metodologia, practica) {
    return `INSERT INTO listapracticas VALUES (${metodologia}, ${practica}); `;
}
//INSERT INTO roles (roltitulo , roldescripcion , rolperfilRecomendado) VALUES ("arquitecto de expericia multimedia [AEM]", "es el escargado de dirigil, coordinar y estrucutrar todo lo relacionado con la expericia final del sistema", "Diseñador ui");
query.insertRol = function (roltitulo, roldescripcion, rolperfilRecomendado) {
    return `INSERT INTO roles (roltitulo , roldescripcion , rolperfilRecomendado) VALUES ("${roltitulo}", "${roldescripcion}", "${rolperfilRecomendado}");`
}
//INSERT INTO listaroles VALUES (1,1);
query.insertlistaroles = function (practica, rol) {
    return `INSERT INTO listaroles VALUES (${practica},${rol});`;
}
//INSERT INTO integrantes (usuario, rol) VALUES(1,1);
query.insertIntegrante = function (usuario, rol) {
    return `INSERT INTO integrantes (usuario, rol) VALUES(${usuario},${rol});`
}
//INSERT INTO listaintegrantes values(1,1);
query.insertListaintegrantes = function (proyecto, integrante) {
    return `INSERT INTO listaintegrantes values(${proyecto},${integrante});`;
}
//INSERT INTO alfas (alfanombre, alfadescripcion,alfaestado) VALUES("Oportunidad", "estudia la aceptacion de la propuesta en el mercado","iniciado"); 
query.insertAlfa = function (alfanombre, alfadescripcion, alfaestado) {
    return `INSERT INTO alfas (alfanombre, alfadescripcion,alfaestado) VALUES("${alfanombre}", "${alfadescripcion}","${alfaestado}");`;
}
//INSERT INTO listaalfas VALUES(1, 3);
query.insertlistAlfas = function (practica, alfa) {
    return `INSERT INTO listaalfas VALUES(${practica}, ${alfa});`;
}
//INSERT INTO entregables (entregatitulo, entregadescripcion, entregaestado, entregatipoArchivo, entregafechaEntrega,entreganumeroRevisiones) VALUES ("Porpuesta de diseño de la EM", "Consiste en un documento en donde se especifica","asignada","documento de texto", "2021-01-23", 0);
query.insertEntregables = function (entregatitulo, entregadescripcion, entregaestado, entregatipoArchivo, entregafechaEntrega, entreganumeroRevisiones) {
    return `INSERT INTO entregables (entregatitulo, entregadescripcion, entregaestado, entregatipoArchivo, entregafechaEntrega,entreganumeroRevisiones) 
    VALUES (
        "${entregatitulo}", 
        "${entregadescripcion}",
        "${entregaestado}",
        "${entregatipoArchivo}", 
        "${entregafechaEntrega}", 
        ${entreganumeroRevisiones});`;
}
query.insertlistEntregables = function (alfa, entregable) {
    return `INSERT INTO listaentregables (alfa,entregable) 
    VALUES (
        ${alfa}, 
        ${entregable});`;
}
//INSERT INTO tecnicas (tecnicatitulo, tecnicadescripcion, tecnicabibliografia) VALUES ("tecnica T1", "esta tecnica no se a terminadado de documentar por lo que se dejara este espacio", "links de la bibliografias"); 
query.insertTecnicas = function (tecnicatitulo, tecnicadescripcion, tecnicabibliografia) {
    return `INSERT INTO tecnicas (tecnicatitulo, tecnicadescripcion, tecnicabibliografia) 
                VALUES (
                    "${tecnicatitulo}", 
                    "${tecnicadescripcion}", 
                    "${tecnicabibliografia}"); `;
}
//INSERT INTO actividades (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica) VALUES ("Actividad A1", "asignada", "descripcion de la actividad", "2020-12-14", "2021-02-13",0,1 ); 
query.insertActividades = function (actividadtitulo, actividadestado, actividaddescripcion, actividadfechacreacion, actividadfechaentrega, actividadrevision, tecnica) {
    return `INSERT INTO actividades (actividadtitulo, actividadestado,actividaddescripcion, actividadfechacreacion,actividadfechaentrega,actividadrevision,tecnica) 
            VALUES (
                "${actividadtitulo}", 
                "${actividadestado}", 
                "${actividaddescripcion}", 
                "${actividadfechacreacion}", 
                "${actividadfechaentrega}",
                ${actividadrevision},
                ${tecnica} ); `;
}
//INSERT INTO listaactividades VALUES (1,1); 
query.insertlistaactiviades = function (integrante, actividad) {
    return `INSERT INTO listaactividades VALUES (${integrante},${actividad}); `;
}
query.insertchats = function (archivo, fecha) {
    return `INSERT INTO chats (chatnombreArchivo, chatfecha) VALUES("${archivo}","${fecha}");`;
}
query.insertlistchats = function (historial, chat) {
    return `INSERT INTO listachats (historial, chat) VALUES(${historial},${chat});`;
}
query.inserteventos = function (fechacreacion) {
    return ` INSERT INTO eventos (eventofechacreacion) values("${fechacreacion}");`;
}
query.insertlisteventos = function (historial, evento, integrante) {
    return `INSERT INTO listaeventos (historial, evento , integrante) VALUES (
        ${historial},
        ${evento},
        ${integrante}
    );`;
}
query.insertreunion = function (titulo, fecha, hora, duracion, descripcion, vigente) {
    return `INSERT INTO reuniones (reuniontitulo ,reunionfecha ,reunionhora ,reuniondurancion ,reuniondescripcion ,vigente ) VALUES (
        "${titulo}",
        "${fecha}",
        "${hora}",
        ${duracion},
        "${descripcion}",
        ${vigente}
    ); `;
}
query.insertlistreunion = function (evento, reunion) {
    return `INSERT INTO listaeventos (evento,reunion ) VALUES (${evento},${reunion});`;
}
query.insertentrega = function (titulo, descripcion, nombrearchivoguardado, actividad, entragable) {
    return `INSERT INTO entregas (entregastitulo ,entregasdescripcion,entregasnombrearchivoguardado ,actividad ,entragable ) VALUES (
        "${titulo}",
        "${descripcion}",
        "${nombrearchivoguardado}",
         ${actividad},
         ${entragable}
    ) ;`;
}
query.insertcontenido = function (nombre, nombrearchivo, descripcion, bibliografia) {
    return `INSERT INTO contenidos (contenidonombre ,contenidonombrearchivo , contenidodescripcion , contenidobibliografica ) VALUES (
        "${nombre}",
        "${nombrearchivo}",
        "${descripcion}",
        "${bibliografia}"
    );`;
}
query.insertlistcontenido = function (entregable, contenido, actividad) {
    return `INSERT INTO listacontenidos (entregable , contenido, actividad ) VALUES (
        ${entregable}, ${contenido},"${actividad}"
    ); `;
}
query.insertherramientametodologia = function (nombre, descripcion, bibliografia) {
    return `INSERT INTO herramientasmetodologia (nombre, descripcion , bibliografia ) VALUES(
        "${nombre}", "${descripcion}", "${bibliografia}"
    ); `;
}
query.insertlistherramientametodologia = function (entregable, herramientametodologia) {
    return `INSERT INTO listaherramientasmetodologia (entregable , herramientametodologia) VALUES(
        ${entregable}, ${herramientametodologia}
    );`;
}
/**
 *                                                      ,,    ,,                            
      db                 mm                         `7MM    db                            
     ;MM:                MM                           MM                                  
    ,V^MM.     ,p6"bo  mmMMmm  `7MM  `7MM   ,6"Yb.    MM  `7MM  M"""MMV  ,6"Yb.  `7Mb,od8 
   ,M  `MM    6M'  OO    MM      MM    MM  8)   MM    MM    MM  '  AMV  8)   MM    MM' "' 
   AbmmmqMA   8M         MM      MM    MM   ,pm9MM    MM    MM    AMV    ,pm9MM    MM     
  A'     VML  YM.    ,   MM      MM    MM  8M   MM    MM    MM   AMV  , 8M   MM    MM     
.AMA.   .AMMA. YMbmd'    `Mbmo   `Mbod"YML.`Moo9^Yo..JMML..JMML.AMMmmmM `Moo9^Yo..JMML.   
 
 */
query.updateidiomasnombre = function (nombre, id) {
    return `UPDATE idiomas 
    SET idiomanombre ="${nombre}" 
    WHERE id = ${id}; `;
}
query.updateidiomasnivel = function (nivel, id) {
    return `UPDATE idiomas 
    SET idiomanivel ="${nivel} "
    WHERE id = ${id}; `;
}
query.updateidiomas = function (nombre, nivel, id) {
    return `UPDATE idiomas 
    SET idiomanombre =${nombre},  idiomanivel =${nivel}
    WHERE id = ${id}; `;
}
//-----------------------------------------------------
query.updateusuarioscorreo = function (email, id) {
    return `UPDATE usuarios 
    SET email="${email}"
    WHERE id = ${id}; `;
}
query.updateusuarioscontrasena = function (password, id) {
    return `UPDATE usuarios 
    SET contrasena ="${password}"
    WHERE id = ${id}; `;
}
query.updateusuariofotoperfil = function (foto, id) {
    return `UPDATE usuarios 
    SET fotoperfil ="${foto}"
    WHERE id = ${id}; `;
}
query.updateusuarioshojavida = function (cv, id) {
    return `UPDATE usuarios 
    SET nombrearchivohojadevida ="${cv}"
    WHERE id = ${id}; `;
}
query.updateusuariosexperiencia = function (experiencia, id) {
    return `UPDATE usuarios 
    SET anosdeexperiencia ="${experiencia}"
    WHERE id = ${id}; `;
}
query.updateusuariosnombre = function (name, id) {
    return `UPDATE usuarios 
    SET nombre ="${name}"
    WHERE id = ${id}; `;
}
query.updateusuariosdescripcion = function (descrip, id) {
    return `UPDATE usuarios 
    SET descripcion ="${descrip}"
    WHERE id = ${id}; `;
}
query.updateusuariospais = function (pais, id) {
    return `UPDATE usuarios 
    SET pais ="${descrip}"
    WHERE id = ${id}; `;
}
query.updateusuariosedad = function (edad, id) {
    return `UPDATE usuarios 
    SET edad ="${edad}"
    WHERE id = ${id}; `;
}
query.updateusuariosgithub = function (github, id) {
    return `UPDATE usuarios 
    SET github ="${github}"
    WHERE id = ${id}; `;
}
query.updateusuariosbitbucket = function (bitbucket, id) {
    return `UPDATE usuarios 
    SET bitbucket="${bitbucket}"
    WHERE id = ${id}; `;
}
query.updateusuariosgitlab = function (gitlab, id) {
    return `UPDATE usuarios 
    SET gitlab ="${gitlab}"
    WHERE id = ${id}; `;
}
query.updateusuarioslinkedin = function (linkedin, id) {
    return `UPDATE usuarios 
    SET linkedin ="${linkedin}"
    WHERE id = ${id}; `;
}
query.updateusuario = function (id,
    email,
    password,
    experiencia,
    fotoperfil,
    nombrearchivohojadevida,
    nombre,
    descripcion,
    pais,
    edad,
    github,
    gitlab,
    bitbucket,
    linkedin) {
    return `UPDATE usuarios 
    SET email ="${email}",
    contrasena= "${password}",
    fotoperfil= "${fotoperfil}",
    nombrearchivohojadevida= "${nombrearchivohojadevida}",
    anosdeexperiencia= ${experiencia},
    nombre= "${nombre}",
    descripcion= "${descripcion}",
    pais= "${pais}",
    edad= ${edad},
    github= "${github}",
    gitlab= "${gitlab}",
    bitbucket= "${bitbucket}",
    linkedin= "${linkedin}"
    WHERE id = ${id}; `;
}
//----------------------------------------------------------------------
query.updatecontacto = function (preferencias, id) {
    return `UPDATE contactos 
    SET preferencias =${preferencias}
    WHERE id = ${id}; `;
}
query.updateactividadfechaentrega = function (fecha, id) {
    return `UPDATE actividades 
    SET actividadfechaentrega =${fecha}
    WHERE id = ${id}; `;
}
query.updateactividadestado = function (estado, id) {
    return `UPDATE actividades 
    SET actividadestado ="${estado}"
    WHERE id = ${id}; `;
}
query.updateactividadrevisiones = function (revision, id) {
    return `UPDATE actividades 
    SET actividadrevision =${revision}
    WHERE id = ${id}; `;
}
query.updateaintegrantes = function (rol, id) {
    return `UPDATE integrantes 
    SET rol =${rol}
    WHERE id = ${id}; `;
}
query.updatecontenidos = function (nombreArchivo, id) {
    return `UPDATE contenidos 
    SET contenidonombrearchivo ="${nombreArchivo}"
    WHERE id = ${id}; `;
}
query.updatentregable = function (estado, id) {
    return `UPDATE entregables 
    SET entregaestado ="${estado}"
    WHERE id = ${id}; `;
}
query.updathistorial = function (descripcion, id) {
    return `UPDATE historiales 
    SET historiadescripcion ="${descripcion}"
    WHERE id = ${id}; `;
}
query.updatproyectobanner = function (banner, id) {
    return `UPDATE proyectos 
    SET proyectobanner ="${banner}"
    WHERE id = ${id}; `;
}
query.updatproyectoicono = function (icono, id) {
    return `UPDATE proyectos 
    SET proyectoicon ="${icono}"
    WHERE id = ${id}; `;
}
query.updatentregablenum = function (num, estado, id) {
    return `UPDATE entregables 
    SET entreganumeroRevisiones =${num},
    entregaestado ="${estado}"
    WHERE id = ${id}; `;
}
query.updatentrega = function (descripcion, titulo, nombrearchivo, id) {
    return `UPDATE entregas 
    SET entregastitulo ="${titulo}",
    entregasdescripcion ="${descripcion}",
    entregasnombrearchivoguardado ="${nombrearchivo}"
    WHERE id = ${id}; `;
}
query.actualizaractividad = function (integrante, actividad) {
    return `update listaactividades
    set integrante = ${integrante}, actividad= ${actividad}
    where  actividad= ${actividad};  `;
}
/**
 `7MM"""Yp,                                               
  MM    Yb                                               
  MM    dP  ,pW"Wq.  `7Mb,od8 `7Mb,od8  ,6"Yb.  `7Mb,od8 
  MM"""bg. 6W'   `Wb   MM' "'   MM' "' 8)   MM    MM' "' 
  MM    `Y 8M     M8   MM       MM      ,pm9MM    MM     
  MM    ,9 YA.   ,A9   MM       MM     8M   MM    MM     
.JMMmmmd9   `Ybmd9'  .JMML.   .JMML.   `Moo9^Yo..JMML.   
 */
//DELETE FROM table_name WHERE condition;
query.deleteTabla = function (tabla) { return `DELETE FROM ${tabla};` }
query.deleteIdiomas = function (id) { return `DELETE FROM idiomas WHERE id=${id} ; `; }
query.deleteHabilidades = function (id) { return `DELETE FROM habilidades  WHERE id=${id}; `; }
query.deleteHerramientas = function (id) { return `DELETE FROM herramientas  WHERE id=${id}; `; }
query.deleteUsuarios = function (id) { return `DELETE FROM usuarios  WHERE id=${id}; `; }
query.deletePalabrasClave = function (id) { return `DELETE FROM palabrasclave  WHERE id=${id}; `; }
query.deleteListaidiomas = function (id) { return `DELETE FROM listaidiomas  WHERE usuario=${id}; `; }
query.deleteContactos = function (id) { return `DELETE FROM contactos  WHERE id=${id}; `; }
query.deleteListaContactos = function (id) { return `DELETE FROM listacontactos  WHERE usuario=${id}; `; }
query.deleteListaHabilidades = function (id) { return `DELETE FROM listahabilidades  WHERE usuario=${id}; `; }
query.deleteListaHerramientas = function (id) { return `DELETE FROM listaherramientas  WHERE usuario=${id}; `; }
query.deleteMetodologias = function (id) { return `DELETE FROM metodologias  WHERE id=${id}; `; }
query.deletePracticas = function (id) { return `DELETE FROM practicas  WHERE id=${id}; `; }
query.deleteListasPracticas = function (id) { return `DELETE FROM listapracticas  WHERE practica=${id}; `; }
query.deleteAlfas = function (id) { return `DELETE FROM alfas  WHERE id=${id}; `; }
query.deleteListaAlfas = function (id) { return `DELETE FROM listaalfas  WHERE alfa=${id}; `; }
query.deleteHerramientasMetodologia = function (id) { return `DELETE FROM herramientasmetodologia WHERE id=${id};`; }
query.deleteTecnicas = function (id) { return `DELETE FROM tecnicas  WHERE id=${id}; `; }
query.deleteActividades = function (id) { return `DELETE FROM actividades  WHERE id=${id}; `; }
query.deleteRoles = function (id) { return `DELETE FROM roles  WHERE id=${id}; `; }
query.deleteListaRoles = function (id) { return `DELETE FROM listaroles  WHERE rol=${id}; `; }
query.deleteIntegrantes = function (id) { return `DELETE FROM integrantes  WHERE id=${id}; `; }
query.deleteListaActividades = function (id) { return `DELETE FROM listaactividades  WHERE actividad=${id}; `; }
query.deleteContenidos = function (id) { return `DELETE FROM contenidos  WHERE id=${id}; `; }
query.deleteEntregables = function (id) { return `DELETE FROM entregables  WHERE id=${id}; `; }
query.deleteListaentregables = function (id) { return `DELETE FROM listaentregables  WHERE entregable=${id}; `; }
query.deleteListaHerramientasMetodologia = function (id) { return `DELETE FROM listaherramientasmetodologia  WHERE herramientametodologia=${id}; `; }
query.deleteListaContenidos = function (id) { return `DELETE FROM listacontenidos  WHERE contenido=${id}; `; }
query.deleteEntregas = function (id) { return `DELETE FROM entregas  WHERE id=${id}; `; }
query.deleteChats = function (id) { return `DELETE FROM chats  WHERE id=${id}; `; }
query.deleteHistoriales = function (id) { return `DELETE FROM historiales  WHERE id=${id}; `; }
query.deleteListaChats = function (id) { return `DELETE FROM listachats  WHERE chat=${id}; `; }
query.deleteProyectos = function (id) { return `DELETE FROM proyectos  WHERE id=${id}; `; }
query.deleteReuniones = function (id) { return `DELETE FROM reuniones  WHERE id=${id}; `; }
query.deleteListaReuniones = function (id) { return `DELETE FROM listareuniones  WHERE reunion=${id}; `; }
query.deleteListaEntregas = function (id) { return `DELETE FROM listaentregas  WHERE entregable=${id}; `; }
query.deleteEventos = function (id) { return `DELETE FROM eventos  WHERE id=${id}; `; }
query.deleteListaEventos = function (id) { return `DELETE FROM listaeventos  WHERE evento=${id}; `; }
query.deleteListaIntegrantes = function (integrante, proyecto) { return `DELETE FROM listaintegrantes  WHERE integrante=${integrante} and proyecto=${proyecto}; `; }

query.deleteallIdiomas = function () { return `DELETE FROM idiomas  ; `; }
query.deleteallHabilidades = function () { return `DELETE FROM habilidades ; `; }
query.deleteallHerramientas = function () { return `DELETE FROM herramientas  ; `; }
query.deleteallUsuarios = function () { return `DELETE FROM usuarios  ; `; }
query.deleteallPalabrasClave = function () { return `DELETE FROM palabrasclave ; `; }
query.deleteallListaidiomas = function () { return `DELETE FROM listaidiomas ; `; }
query.deleteallContactos = function () { return `DELETE FROM contactos  ; `; }
query.deleteallListaContactos = function () { return `DELETE FROM listacontactos  ; `; }
query.deleteallListaHabilidades = function () { return `DELETE FROM listahabilidades  ; `; }
query.deleteallListaHerramientas = function () { return `DELETE FROM listaherramientas ; `; }
query.deleteallMetodologias = function () { return `DELETE FROM metodologias  ; `; }
query.deleteallPracticas = function () { return `DELETE FROM practicas  ; `; }
query.deleteallListasPracticas = function () { return `DELETE FROM listapracticas ; `; }
query.deleteallAlfas = function () { return `DELETE FROM alfas  ; `; }
query.deleteallListaAlfas = function () { return `DELETE FROM listaalfas ; `; }
query.deleteallHerramientasMetodologia = function () { return `DELETE FROM herramientasmetodologia ;`; }
query.deleteallTecnicas = function () { return `DELETE FROM tecnicas  ; `; }
query.deleteallActividades = function () { return `DELETE FROM actividades  ; `; }
query.deleteallRoles = function () { return `DELETE FROM roles  ; `; }
query.deleteallListaRoles = function () { return `DELETE FROM listaroles  ; `; }
query.deleteallIntegrantes = function () { return `DELETE FROM integrantes ; `; }
query.deleteallListaActividades = function () { return `DELETE FROM listaactividades  ; `; }
query.deleteallContenidos = function () { return `DELETE FROM contenidos  ; `; }
query.deleteallEntregables = function () { return `DELETE FROM entregables  ; `; }
query.deleteallListaentregables = function () { return `DELETE FROM listaentregables  ; `; }
query.deleteallListaHerramientasMetodologia = function () { return `DELETE FROM listaherramientasmetodologia ; `; }
query.deleteallListaContenidos = function () { return `DELETE FROM listacontenidos ; `; }
query.deleteallEntregas = function () { return `DELETE FROM entregas ; `; }
query.deleteallChats = function () { return `DELETE FROM chats; `; }
query.deleteallHistoriales = function () { return `DELETE FROM historiales  ; `; }
query.deleteallListaChats = function () { return `DELETE FROM listachats ; `; }
query.deleteallProyectos = function () { return `DELETE FROM proyectos  ; `; }
query.deleteallReuniones = function () { return `DELETE FROM reuniones ; `; }
query.deleteallListaReuniones = function () { return `DELETE FROM listareuniones  ; `; }
query.deleteallListaEntregas = function () { return `DELETE FROM listaentregas ; `; }
query.deleteallEventos = function () { return `DELETE FROM eventos ; `; }
query.deleteallListaEventos = function () { return `DELETE FROM listaeventos ; `; }
query.deleteallListaIntegrantes = function () { return `DELETE FROM listaintegrantes  ; `; }


/**
 `7MM"""YMM                                             mm                        db                        
  MM    `7                                             MM                                                  
  MM   d    `7M'   `MF'`7MMpdMAo.  ,pW"Wq.  `7Mb,od8 mmMMmm   ,6"Yb.   ,p6"bo  `7MM   ,pW"Wq.  `7MMpMMMb.  
  MMmmMM      `VA ,V'    MM   `Wb 6W'   `Wb   MM' "'   MM    8)   MM  6M'  OO    MM  6W'   `Wb   MM    MM  
  MM   Y  ,     XMX      MM    M8 8M     M8   MM       MM     ,pm9MM  8M         MM  8M     M8   MM    MM  
  MM     ,M   ,V' VA.    MM   ,AP YA.   ,A9   MM       MM    8M   MM  YM.    ,   MM  YA.   ,A9   MM    MM  
.JMMmmmmMMM .AM.   .MA.  MMbmmd'   `Ybmd9'  .JMML.     `Mbmo `Moo9^Yo. YMbmd'  .JMML. `Ybmd9'  .JMML  JMML.
                         MM                                                                                
                       .JMML.                                                                              
 */
module.exports = query;