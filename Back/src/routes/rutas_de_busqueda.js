const ex = require('express');
const jwt = require('jsonwebtoken');
const rutas = ex.Router();

const buscarDB = require('../database/buscarDB');
const ftpminio = require("../ftp/peticiones");
const LLAVE = 'misecretos';


//

/*

rutas.get('/login/email=:correo&pass=:password',(req,res)=>{
    console.log(req.params);  console.log(req.body); 
    buscarDB.obtenerToken(req.params, res).then(resultado=>{
       // console.log("Exito"); 
    }); 

});*/


rutas.post('/login', (req, res) => {
    //    console.log("body", req.body); 

    buscarDB.obtenerToken(req.body, res);
});


rutas.get('/escritorio', proToken, (req, res) => {
    // console.log("hola /escritorio")
    jwt.verify(req.token, LLAVE, (err, data) => {

        if (err) {
            res.sendStatus(403);
        } else {
            if (data.rows[0] != null || data.rows.length > 0) {
                //console.log(data.rows);  
                buscarDB.obtenerEscritorio(data, res);
            } else {
                console.log("Basio perro "); res.json({ estado: "no se encontro nada" });
            }
        }
    });

});


rutas.get('/talentos', proToken, (req, res) => {
    jwt.verify(req.token, LLAVE, (err, data) => {
        if (!err) {
            if (data.rows[0] != null || data.rows.length > 0) {
                buscarDB.buscartalentogeneral(data.rows[0].id, res);
            }
        }
    })
});

rutas.get('/proyectos', proToken, (req, res) => {

    jwt.verify(req.token, LLAVE, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            if (data != {} || data !== {} || data !== null || data !== undefined) {
                buscarDB.obtenerProyecto(data, res);
            }
        }
    });
});

rutas.get('/proyectos/:id', proToken, (req, res) => {

    jwt.verify(req.token, LLAVE, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            if (data != {} || data !== {} || data !== null || data !== undefined) {
                buscarDB.buscarProyecto(data, req.params.id, res);
            }
        }
    });
});


rutas.get('/herramientas/todas', (req, res) => {
    buscarDB.obtenertodasherramientas(res);

});


rutas.get('/proyecto/contenido/:buque/:name', (req, res) => {
    /*
     if(buscarDB.buscarProyecto(req.params)){
         
     }*/
    console.log(req.params);
    const { buque, name } = req.params;
    // const {id,name } = req.body;

    ftpminio.getFilesingle(buque, name, res);


});
rutas.get('/proyecto/contenidos', (req, res) => {


    ftpminio.getFile(res);


});
rutas.get('/proyecto/listado/:id', async (req, res) => {
    /*
     if(buscarDB.buscarProyecto(req.params)){
         
     }*/
    //  console.log(req.params);
    const { id } = req.params;
    //const {user} = req.body; 
    // const {id,name } = req.body;

    ftpminio.listObjects(id, user, res);
});


rutas.get('/talentos', proToken, (req, res) => {
    jwt.verify(req.token, LLAVE, async (err, data) => {
        //console.log(data.rows[0].id)
        await buscarDB.searchPeople(data.rows[0].id, res);
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
function proToken (req, res, next) {
    const header = req.headers['authorization'];
    //console.log(header); 
    if (typeof header !== 'undefined') {
        const portador = header.split(" ");
        const portadorToken = portador[1];
        req.token = portadorToken;
        next();
    } else {
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