const jwt = require('jsonwebtoken');
const mariaDB = require('../database');
const Query = require('./querys'); 
const LLAVE = 'misecretos';

const funcionesDB = () => {
    console.log("funciones de la base de datos")
}
/*
funcionesDB.buscarLogin = async (body, res) => {
    const { correo, password } = body;



    if(correo !== undefined && password !== undefined){
        const query = Query.login(body);
        await mariaDB.query(query, (err, rows, fields) => {
            // respuesta = jwt.sign({rows},LLAVE);
            if (!err) {
                res.json({ rows });
            } else {
    
            }
        });
    }else{
        res.json({error: "mal envio de datos"})
    }
}*/

funcionesDB.obtenerToken = async (body, res) => {
    const { email, password } = body;
   
    if(email !== undefined && password !== undefined){
      
        await mariaDB.query( Query.login(body) , (err, rows, fields) => {
    
            if (!err) {
               // console.log(rows);
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
    }else{
        console.log('error datos indefinidos')
    }
    


}

funcionesDB.obtenerEscritorio = async (body, res) => {
    const { persona } = body.rows[0];
    if(persona !== undefined ){
        await mariaDB.query(Query.obtenerEscritorio(persona), (err, rows, fields) => {
            if (!err) {    
                res.json({
                    estado: "protegido",
                    rows
                });
            } else {
                res.json({estado : "vulnerado",
            msj : "error interno no se como paso mis if"});
            }
    
        });
    }
  

    // console.log(body.rows[0].persona);
}


funcionesDB.obtenerProyecto = async (body, res) => {

    const { persona } = body.rows[0];
    if(persona !== undefined ){
        await mariaDB.query(Query.obtenerProyecto(persona) , (err, rows, fields) => {

            if (!err) {
                res.json({   estado: "protegido",    rows   });
            } else {
                res.json({estado : "vulnerado",
                msj : "error interno no se como paso mis if"   });
            }
    
        });
    }
   
}

funcionesDB.buscarProyecto = async (id) => {
    
    if(id !== undefined || id !== ""){
        await mariaDB.query(Query.buscarProyecto(id), (err, rows, fields) => {
            if (!err) { return true; } else { return false; };
        });
    }
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
                if(rows[i].id== idUser){
                    console.log("entro"); 
                    rows.splice(i, 1);
                }
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