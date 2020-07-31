const ex = require('express'); 
const rutas= ex.Router();

const mariaDB = require('../database'); 

rutas.get ('/login/:correo/:password',(req,res)=>{
    const {correo, password}= req.params; 
    console.log(`correo => ${correo} y la contraseña es => ${password}`);
    const query=`
    SELECT * FROM usuarios 
    WHERE 
    correoElectronico = "${correo}" 
    AND
    contrasena = "${password}"
    `;
    mariaDB.query(query ,(err,rows , fields)=>{
        if(!err){
            res.json('usuario encontrado :D'); 
            res.json(rows); 
        }else{
            res.json('usuario no encontrado'); 
            console.log(err);
        }
    });
}); 

rutas.get ('/login/persona/:correo/:password',(req,res)=>{
    const {correo, password}= req.params; 
    console.log(`correo => ${correo} y la contraseña es => ${password}`);
    const query=`
    SELECT * FROM usuarios 
    INNER JOIN personas ON usuarios.persona = personas.id 
    WHERE 
    correoElectronico = "${correo}" 
    AND
    contrasena = "${password}"
    `; 
     mariaDB.query(query,(err,rows , fields)=>{
        if(!err){
            res.json(rows); 
        }else{
            res.json("Usuairo no encontrado"); 
            console.log(err);
        }
     });
  //  console.log(`id : ${id} ,`)
});



module.exports = rutas; 