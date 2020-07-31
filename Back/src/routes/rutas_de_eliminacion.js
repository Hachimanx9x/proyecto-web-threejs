const ex = require('express'); 
const rutas= ex.Router();

const mariaDB = require('../database'); 


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