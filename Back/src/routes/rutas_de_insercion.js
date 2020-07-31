const ex = require('express'); 
const rutas= ex.Router();

const mariaDB = require('../database'); 


rutas.post('/',(req,res)=>{
    const {id,name,contraseña} = req.body ; 
    const query =`

    CALL usuarioAgregarOEditar( ?, ?, ?); 
    `;
    mariaDB.query(query, [id,name,contraseña] ,(err,rows , fields)=>{
        if(!err){
            res.json({Status: 'usuario guardado'}); 
        }else{
            console.log(err);
        }
    });
} ); 




module.exports = rutas; 