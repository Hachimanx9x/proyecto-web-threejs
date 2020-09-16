
const mariaDB = require('../database'); 
const jwt = require('jsonwebtoken'); 
const LLAVE = 'misecretos'; 

const funcionesDB = ()=>{}

funcionesDB.buscarLogin =async (body,res)=>{
    const { correo, password }  =body ; 
 
    const query=`SELECT * FROM usuarios WHERE correoElectronico = "${correo}" AND  contrasena = "${password}" `; 
     
  await mariaDB.query(query,(err,rows , fields)=>{
   // respuesta = jwt.sign({rows},LLAVE);
   if(!err){
        res.json({rows}); 
   }else{

   }
    }); 
}

funcionesDB.obtenerToken=async  (body,res)=>{
    const { correo, password }  =body ; 
 
    const query=`SELECT * FROM usuarios WHERE correoElectronico = "${correo}" AND contrasena = "${password}" `; 
     
  await mariaDB.query(query,(err,rows , fields)=>{
   
   if(!err){
    const token = jwt.sign({rows},LLAVE); 
     res.json({token});
   }else{

   }
 
    }); 

    
}

funcionesDB.obtenerEscritorio=async  (body,res)=>{
    const {persona } = body.rows[0]; 
    const query =`SELECT    usuarios.id,  
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
     await mariaDB.query(query,(err,rows , fields)=>{
   
        if(!err){
                         
            res.json({
                estado : "protegido"  ,
                rows  });
        }else{
                     
        }
                      
    });

   // console.log(body.rows[0].persona);
}


funcionesDB.obtenerProyecto = async (body,res)=>{
    const {persona } = body.rows[0]; 
    const query =`SELECT proyectos.id,
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
    await mariaDB.query(query,(err,rows , fields)=>{
   
        if(!err){
                         
            res.json({
                estado : "protegido"  ,
                rows  });
        }else{
                     
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