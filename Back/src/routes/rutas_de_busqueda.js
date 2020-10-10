const ex = require('express'); 
const jwt = require('jsonwebtoken'); 
const rutas= ex.Router();
 
const buscarDB = require('../database/buscarDB'); 
const ftpminio = require("../ftp/peticiones"); 
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
        if(err){ res.sendStatus(403)
        }else{if(data =={} || data==={} || data ==null || data === undefined){
             }else{ buscarDB.obtenerEscritorio(data,res).then(resultado=>{           /*console.log("Exito"); */             }); 
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

rutas.get('/proyecto/contenido',(req,res)=>{
    /*
     if(buscarDB.buscarProyecto(req.params)){
         
     }*/
     console.log(req.params);
     const {id,name } = req.body;

   const dir =  ftpminio.getFilesingle(id,name ); 
   res.send(dir); 
      
 }); 
 

 rutas.get('/proyecto/contenido/:name',(req,res)=>{
    /*
     if(buscarDB.buscarProyecto(req.params)){
         
     }*/
     console.log(req.params);
     const {name } = req.params; 
    // const {id,name } = req.body;

   ftpminio.getFilesingle("default",name,res ); 
  
      
 }); 
 rutas.get('/proyecto/listado/:id',(req,res)=>{
    /*
     if(buscarDB.buscarProyecto(req.params)){
         
     }*/
     console.log(req.params);
    // const {id} = req.params; 
    // const {id,name } = req.body;

  ftpminio.listObjects(id,res ); 
  
      
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

/*
**************************************************************************************************
************************Exportaciones*****************************************************************
**************************************************************************************************
*/
/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

module.exports = rutas; 


/*         ,--"""",--.__,---[],-------._         
       ,"   __,'            \         \--""""""==;-
     ," _,-"  "/---.___     \       ___\   ,-'',"
    /,-'      / ;. ,.--'-.__\  _,-"" ,| `,'   /
   /``""""-._/,-|:\       []\,' ```-/:;-. `. /
             `  ;:::      ||       /:,;  `-.\
                =.,'__,---||-.____',.=
                =(:\_     ||__    ):)=
               ,"::::`----||::`--':::"._
             ,':::::::::::||::::::::::::'.
    .__     ;:::.-.:::::__||___:::::.-.:::\     __,
       """-;:::( O )::::>_|| _<::::( O )::::-"""
   =======;:::::`-`:::::::||':::::::`-`:::::\=======
    ,--"";:::_____________||______________::::""----.          , ,
         ; ::`._(    |    |||     |   )_,'::::\_,,,,,,,,,,____/,'_,
       ,;    :::`--._|____[]|_____|_.-'::::::::::::::::::::::::);_
      ;/ /      :::::::::,||,:::::::::::::::::::::::::::::::::::/
     /; ``''''----------/,'/,__,,,,,____:::::::::::::::::::::,"
     ;/                :);/|_;| ,--.. . ```-.:::::::::::::_,"
    /;                :::):__,'//""\\. ,--.. \:::,:::::_,"
   ;/              :::::/ . . . . . . //""\\. \::":__,"
   ;/          :::::::,' . . . . . . . . . . .:`::\
   ';      :::::::__,'. ,--.. . .,--. . . . . .:`::`
   ';   __,..--'''-. . //""\\. .//""\\ . ,--.. :`:::`
   ;    /  \\ .//""\\ . . . . . . . . . //""\\. :`::`
   ;   /       . . . . . . . . . . . . . . . . .:`::`
   ;   (          . . . . . . . . . . . . . . . ;:::`
   ,:  ;,            . . . . . . . . . . . . . ;':::`
   ,:  ;,             . . . . . . . . . . . . .;`:::
   ,:   ;,             . . . . . . . . . . . . ;`::;`
    ,:  ;             . . . . . . . . . . . . ;':::;`
     :   ;             . . . . . . . . . . . ,':::;
      :   '.          . . . . . . . .. . . .,':::;`
       :    `.       . . . . . . . . . . . ;::::;`
        '.    `-.   . . . . . . . . . . ,-'::::;
          `:_    ``--..___________..--'':::::;'`
             `._::,.:,.:,:_ctr_:,:,.::,.:_;'`
________________`"\/"\/\/'""""`\/"\/""\/"____________________________ */ 