const query = function (e) {
    return `SELECT * FROM  usuarios; `;
}

query.login = function (obj) {
    const { email, password } = obj;
    //
    return `SELECT * FROM usuarios WHERE email = "${email}" AND contrasena = "${password}" `
}
query.obtenerEscritorioActividades = function (id) {
    return (`SELECT  
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
    WHERE usuarios.id = ${id}; `);
}
query.obtenerEscritorioProyectos = function (id) {
    return (`SELECT proyectos.proyectonombre,
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
     WHERE usuarios.id= ${id}; `);
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
  ) GROUP BY proyectos.id ;   `);
}


query.buscarProyecto = function (id) {
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
WHERE proyectos.id = ${id}  `);
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
    herramientas.herramientanombre,
    herramientas.herramientadescripcion,
    herramientas.herramientanombreIcono
    FROM usuarios
    JOIN palabrasclave ON usuarios.id = palabrasclave.pcusuario
    JOIN listaherramientas ON usuarios.id = listaherramientas.usuario
    JOIN herramientas ON listaherramientas.herramientausada = herramientas.id; `;
}
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
    return `INSERT INTO metodologias(metodologianombre, metodologiadescripcion,metodologiaconsejo ) VALUES(
        "${metodologianombre}", "${metodologiadescripcion}","${metodologiaconsejo}"); `;
}
//INSERT INTO historiales(historiadescripcion) VALUES("esta hara seguimiento a todos los suscesos echos en el prouyecto asociado");
query.inserthistoriales = function (historiadescripcion) {
    return `INSERT INTO historiales(historiadescripcion) VALUES("${historiadescripcion}");`;
}
//INSERT INTO proyectos (proyectonombre, proyectodescripcion, proyectoestado, proyectoicon,proyectobanner, metodologia, historia) 
//VALUES("Desarrollo de un entorno virtual colaborativo para preproducción de un sistema multimedia", "Como se expone en el apartado de planteamiento del problema los equipos de trabajo encargados de la preproducción de un sistema multimedia poseen muchos retos en la gestión, por lo tanto, el sistema propuesto por este documento podrá garantizar los siguientes beneficios","iniciada","iconoTemporaldelsistema.jpg","bannertemporal.jpg",1,1);
query.insertproyecto = function (proyectonombre, proyectodescripcion, proyectoestado, proyectoicon, proyectobanner, metodologia, historia) {
    return `INSERT INTO proyectos (proyectonombre, proyectodescripcion, proyectoestado, proyectoicon,proyectobanner, metodologia, historia) 
    VALUES("${proyectonombre}", "${proyectodescripcion}","${proyectoestado}","${proyectoicon}","${proyectobanner}",${metodologia},${historia});`;
}
//INSERT INTO practicas (practicanombre, practicadescripcion ) VALUES ("concepción del experiencia multimedia [CEM]", "se estara haciendo uso de fierentes herramientras para creacion de una ccorrecta experiencia");
query.insertpractica = function (practicanombre, practicadescripcion) {
    return `INSERT INTO practicas (practicanombre, practicadescripcion ) 
    VALUES ("${practicanombre}, "${practicadescripcion}");`;
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
module.exports = query;