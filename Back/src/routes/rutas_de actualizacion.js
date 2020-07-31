
const ex = require('express'); 
const rutas= ex.Router();

const mariaDB = require('../database'); 
rutas.put('/:id', (req,res)=>{
    const {name,contraseña} = req.body ; 
    const {id} = req.params ; 
    const query =` CALL usuarioAgregarOEditar( ?, ?, ?); `;
    mariaDB.query(query, [id,name,contraseña] ,(err,rows , fields)=>{
        if(!err){
            res.json({Status: 'usuario actualizado'}); 
        }else{
            console.log(err);
        }
    });

});
module.exports = rutas; 