const query = function(e){
    return `SELECT * FROM  usuarios; `;
}

query.login= function(obj){
    const { correo, password } = obj;
    return `SELECT * FROM usuarios WHERE correoElectronico = "${correo}" AND contrasena = "${password}" `
}
query.obtenerEscritorio=function(person){
    return (`SELECT    usuarios.id,  
    personas.nombre,
    proyectos.id, 
    practicas.nombre, 
    rutas.nombre, 
    alfas.nombre, 
    alfas.estado, 
    actividades.titulo ,
    actividades.estado, 
    actividades.fechaEntrega, 
    actividades.horaEntrega

FROM personas
JOIN usuarios ON  personas.id = usuarios.persona
JOIN integrantes ON usuarios.id = integrantes.usuario 
JOIN proyectos ON  integrantes.id = proyectos.integrante
JOIN practicas ON proyectos.practica = practicas.id 
JOIN rutas ON practicas.ruta = rutas.id 
JOIN actividades ON  rutas.actividad = actividades.id 
JOIN alfas ON practicas.alfaUsada = alfas.id
WHERE usuarios.id = "${person}"  GROUP BY proyectos.id ;`); 
}
query.obtenerProyecto= function(person){
    return (`SELECT proyectos.id,
    proyectos.nombre,
    proyectos.descripcion,
    proyectos.estado,
    proyectos.icon,
    proyectos.banner
FROM personas
JOIN usuarios ON  personas.id = usuarios.persona
JOIN integrantes ON usuarios.id = integrantes.usuario
JOIN proyectos ON  integrantes.id = proyectos.integrante
WHERE personas.id = "${person}";`) ;
}


query.buscarProyecto = function(id){
    return `SELECT * FROM  proyectos where id= ${id}`;
}


query.insertPerson = function(nombre, descripcion, otro, pais , edad ){
    return `INSERT INTO personas (nombre, descripcion, otro, pais , edad  ) VALUES ("${nombre}" , "${descripcion}", "${otro}", "${pais}","${edad}") `;    
}

query.insertLenguaje=function(nombre, nivel){
    return `INSERT INTO IDIOMAS (nombre, nivel) VALUES ("${nombre}","${nivel}");`
}
query.insertContacts=function(person, preferences){
    //INSERT INTO contactos (personas, preferencias) VALUES (1, TRUE);
    return `INSERT INTO contactos (personas, preferencias) VALUES (${person}, ${preferences});`
}
query.insertTools = function(nombre, tipo,descripcion, url_icono){
    //INSERT INTO herramientas (nombre, tipo,descripcion, url_icono) VALUES ("nodejs","Desarrollo software", "Node.js es un entorno multiplataforma, basado en el lenguaje de programación JavaScript.","https://nodejs.org/static/images/logo.svg"); 
    return `INSERT INTO herramientas (nombre, tipo,descripcion, url_icono) VALUES ("${nombre}", "${tipo}", "${descripcion}", "${url_icono}"); `
}

query.insertAbility = function(tipo, descripcion, nivel,herramientaUsada){
   // INSERT INTO habilidades (tipo, descripcion, nivel,herramientaUsada)  VALUES ("diseño ui", "Expecialista en diseño para la web", "medio", 2) ; 
   return ` INSERT INTO habilidades (tipo, descripcion, nivel,herramientaUsada)  VALUES ("${tipo}", "${descripcion}", "${nivel}", ${herramientaUsada}) ; `
}

query.insertUser = function(correoElectronico, urlHojaVida, contrasena, experiencia,contacto, persona,habilidad){
    //INSERT INTO usuarios (correoElectronico, urlHojaVida, contrasena, experiencia,contacto, persona,habilidad) VALUES ("micorreo2@uao.edu.co", "link_de_la_hoja_de_vida","contraseña123", 3,1,2,3);
    return `INSERT INTO usuarios (correoElectronico, urlHojaVida, contrasena, experiencia,contacto, persona,habilidad) VALUES ("${correoElectronico}", "${urlHojaVida}","${contrasena}", ${experiencia},${contacto},${persona},${habilidad});`
}



module.exports = query;