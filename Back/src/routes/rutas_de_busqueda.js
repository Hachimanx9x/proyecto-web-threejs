const ex = require('express'); 
const jwt = require('jsonwebtoken'); 
const rutas= ex.Router();
 
const buscarDB = require('../database/buscarDB'); 

const LLAVE = 'misecretos'; 

rutas.get('/login/email=:correo&pass=:password',(req,res)=>{
    buscarDB.obtenerToken(req.params, res).then(resultado=>{
       // console.log("Exito"); 
    }); 

});

rutas.post('/login',(req,res)=>{
    buscarDB.obtenerToken(req.body, res).then(resultado=>{
        // console.log("Exito"); 
     }); 
});


rutas.get('/escritorio',proToken, (req,res)=>{
    jwt.verify(req.token,LLAVE,(err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{

            if(data =={} || data==={} || data ==null || data === undefined){

            }else{
                buscarDB.obtenerEscritorio(data,res).then(resultado=>{
                    // console.log("Exito"); 
                 }); 
            }
            
        }
    }); 
    
}); 




rutas.get('/proyectos',proToken, (req,res)=>{

    jwt.verify(req.token,LLAVE,(err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{

            if(data =={} || data==={} || data ==null || data === undefined){

            }else{
                buscarDB.obtenerProyecto(data,res).then(resultado=>{
                    // console.log("Exito"); 
                 }); 
            }
            
        }
    }); 
}); 

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
/*
**************************************************************************************************
************************Funciones*****************************************************************
**************************************************************************************************
*/
/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
function proToken(req,res,next){
    const header = req.headers['authorization'];
    //console.log(header); 
    if(typeof header !== 'undefined'){
        const portador = header.split(" "); 
        const portadorToken =portador[1]; 
        req.token=portadorToken; 
         next(); 
    }else{
        res.sendStatus(403); 
    }
 }


module.exports = rutas; 