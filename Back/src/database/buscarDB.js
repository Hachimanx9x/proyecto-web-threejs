
const mariaDB = require('../database');
const jwt = require('jsonwebtoken');
const LLAVE = 'misecretos';

const funcionesDB = () => {
    console.log("funciones de la base de datos")
}

funcionesDB.buscarLogin = async (body, res) => {
    const { correo, password } = body;

    const query = `SELECT * FROM usuarios WHERE correoElectronico = "${correo}" AND  contrasena = "${password}" `;

    await mariaDB.query(query, (err, rows, fields) => {
        // respuesta = jwt.sign({rows},LLAVE);
        if (!err) {
            res.json({ rows });
        } else {

        }
    });
}

funcionesDB.obtenerToken = async (body, res) => {
    const { correo, password } = body;
    console.log(body);

    const query = `SELECT * FROM usuarios WHERE correoElectronico = "${correo}" AND contrasena = "${password}" `;

    await mariaDB.query(query, (err, rows, fields) => {

        if (!err) {
            console.log(rows);
            if (rows[0] == null || rows.length == 0) {
                console.log("error en los datos ")
                res.json({ respuesta: "no encontrado" });
            } else {
                //console.log(rows); 
                const token = jwt.sign({ rows }, LLAVE);
                //  console.log("token enviado");           
                res.json({ token });

            }

        } else {
            res.json({ respuesta: "Base de datos dañada" });
        }

    });


}

funcionesDB.obtenerEscritorio = async (body, res) => {
    const { persona } = body.rows[0];
    const query = `SELECT    usuarios.id,  
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
                    WHERE usuarios.id = ${persona}  GROUP BY proyectos.id ;`;
    await mariaDB.query(query, (err, rows, fields) => {

        if (!err) {

            res.json({
                estado: "protegido",
                rows
            });
        } else {

        }

    });

    // console.log(body.rows[0].persona);
}


funcionesDB.obtenerProyecto = async (body, res) => {

    const { persona } = body.rows[0];
    const query = `SELECT proyectos.id,
                         proyectos.nombre,
                         proyectos.descripcion,
                         proyectos.estado,
                         proyectos.icon,
                         proyectos.banner
                  FROM personas
                  JOIN usuarios ON  personas.id = usuarios.persona
                  JOIN integrantes ON usuarios.id = integrantes.usuario
                  JOIN proyectos ON  integrantes.id = proyectos.integrante
                  WHERE personas.id = ${persona};`;
    await mariaDB.query(query, (err, rows, fields) => {

        if (!err) {

            res.json({
                estado: "protegido",
                rows
            });
        } else {

        }

    });
}

funcionesDB.buscarProyecto = async (id) => {
    const query = `SELECT * FROM  proyectos where id= ${id}`;
    await mariaDB.query(query, (err, rows, fields) => {
        if (!err) { return true; } else { return false; };
    });
}

funcionesDB.searchFilesUserOne = async (iduser, res, array) => {

    const QUERY = `SELECT * FROM contenidos WHERE usariopropietario = ${iduser};`
    await mariaDB.query(QUERY, (err, rows, fields) => {
        if (!err) {
            var files = []
            //  console.log(rows[0].nombre); 
            //console.log(array);

            for (var i = 0; i < array.length; i++) {
                for (var j = 0; j < rows.length; j++) {
                    if (array[i] === rows[j].nombre) {
                        files.push(`/proyecto/contenido${rows[j].url_documentacion}${rows[j].nombre}`);
                    }
                }
            }
            res.json({ files: files });

        } else {

        }
    });
}

funcionesDB.searchPeople = async (idUser, res)=>{
    const QUERY = `SELECT    
    (@usid:=usuarios.id), 
    (@pername:=personas.nombre), 
    (@pername:=personas.descripcion), 
    usuarios.palabraClave, 
    herramientas.url_icono, 
    herramientas.nombre, 
    herramientas.descripcion		
    FROM personas
    JOIN usuarios ON  personas.id = usuarios.persona
    JOIN idiomas ON usuarios.idioma = idiomas.id
    JOIN habilidades ON usuarios.habilidad = habilidades.id
    JOIN herramientas ON habilidades.herramientaUsada = herramientas.id;`;
    await mariaDB.query(QUERY, (err, rows, fields) => {
        if (!err) {
            console.log(rows); 
            for (var i=0; i< rows.length ; i++){
               // console.log(rows[i].id); 
               /* if(rows[i].id== idUser){
                    console.log("entro"); 
                    rows.splice(i, 1);
                }*/
            }
            
            res.json({rows });

        } else {

        }
    });

}


module.exports = funcionesDB;

/*
const {correo, password}= req.params;
//console.log(`correo => ${correo} y la contraseña es => ${password}`);
const query=`
SELECT * FROM usuarios
WHERE
correoElectronico = "${correo}"
AND
contrasena = "${password}"
`;
 mariaDB.query(query,(err,rows , fields)=>{
    if(!err){
      // res.json(rows);
        const token = jwt.sign({rows},LLAVE);
        res.json({token});

    }else{
        res.json("Usuairo no encontrado");
        console.log(err);
    }
 });
//  console.log(`id : ${id} ,`)
*/