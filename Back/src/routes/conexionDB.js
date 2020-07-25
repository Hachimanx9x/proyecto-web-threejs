const ex = require('express'); 
const rutas= ex.Router();

const mariaDB = require('../database'); 

rutas.get ('/',(req,res)=>{
    mariaDB.query('SELECT * FROM usuario' ,(err,rows , fields)=>{
        if(!err){
            res.json(rows); 
        }else{
            console.log(err);
        }
    });
}); 

rutas.get ('/:id',(req,res)=>{
    const {id}= req.params; 
     mariaDB.query(`SELECT * FROM usuario WHERE id = ${id}`,(err,rows , fields)=>{
        if(!err){
            res.json(rows); 
        }else{
            console.log(err);
        }
     });
  //  console.log(`id : ${id} ,`)
});

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
rutas.delete('/:tabla', (req,res)=>{
    const {id} = req.body ; 
    const {tabla} = req.params ; 
    const query =`DELETE FROM ${tabla} WHERE id=?; `;
    mariaDB.query(query, [id] ,(err,rows , fields)=>{
        if(!err){
            res.json({Status: 'usuario eliminado'}); 
        }else{
            console.log(err);
        }
    });

});

module.exports = rutas; 