const ex = require('express'); 
const rutas= ex.Router();
const jwt = require('jsonwebtoken'); 
const mariaDB = require('../database'); 

const LLAVE = 'misecretos'; 

rutas.post('/login/email=:correo&pass=:password',(req,res)=>{
    const {correo, password}= req.params; 
    console.log(`correo => ${correo} y la contraseña es => ${password}`);
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
});


rutas.get('/api/protegido',proToken, (req,res)=>{
    jwt.verify(req.token,LLAVE,(err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({ 
                text:'protegido',
                data
            });
        }
    }); 
    
}); 

function proToken(req,res,next){
   const header = req.headers['authorization'];
   console.log(header); 
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