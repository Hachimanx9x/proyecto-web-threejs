const ex = require('express');
const jwt = require('jsonwebtoken');
const rutas = ex.Router();
const env = require('../env')
const buscarDB = require('../database/buscarDB');
const { removeObject } = require('../ftp/peticiones');
const ftpminio = require("../ftp/peticiones");
const LLAVE = 'misecretos';



rutas.post('/login', (req, res) => {
    console.log("body", req.body);
    const { email, password } = req.body
    if (typeof email === 'string' && typeof password === 'string') {
        buscarDB.obtenerToken(req.body).then(resul => res.json(resul)).catch(err => res.json(err));
    }

});


rutas.get('/escritorio', proToken, (req, res) => {
    // console.log("hola /escritorio")
    jwt.verify(req.token, LLAVE, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            //    console.log(data)
            if (data.rows[0] != null && data.rows.length > 0) {
                // console.log(data.rows);
                buscarDB.obtenerusuarioid({ id: data.rows[0].id }).then(usua => {
                    buscarDB.obtenerEscritorioActividades(data).then(result => {
                        buscarDB.buscartalentogeneral2(data.rows[0].id).then(talento => {

                            buscarDB.obtenerEscritorioProyectos(data).then(result2 => {
                                res.json({
                                    actividades: result.actividades,
                                    proyectos: result2.proyectos,
                                    datos: {
                                        nombre: usua.nombre,
                                        foto: `${env.host}/proyecto/contenido/usuario${data.rows[0].id}/${usua.fotoperfil}`,
                                        herramientas: talento.data[0].herramientas,
                                        palabras: talento.data[0].palabras
                                    }
                                });
                            }).catch(err2 => res.json(err2));
                        }).catch(err3 => res.json(err3));
                    }).catch(err => res.json(err));
                }).catch(errud => removeObject(errud))

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
                buscarDB.buscartalentogeneral(data.rows[0].id).then(result => res.json(result)).catch(err => res.json(err));
            }
        }
    })
});
rutas.get('/talentos/:id', proToken, (req, res) => {
    const { id } = req.params;
    jwt.verify(req.token, LLAVE, (err, data) => {
        if (!err) {
            if (data.rows[0] != null || data.rows.length > 0) {
                buscarDB.buscarusuariocontatelento(id).then(result => res.json(result)).catch(err => res.json(err));
            }
        }
    })
});
rutas.get('/usuarios/:id', proToken, (req, res) => {
    jwt.verify(req.token, LLAVE, (err, data) => {
        if (!err) {
            if (data.rows[0] != null || data.rows.length > 0) {
                buscarDB.buscartalentogeneral(data.rows[0].id).then(result => res.json(result)).catch(err => res.json(err));
            }
        }
    })
});
rutas.get(`/contactos`, proToken, (req, res) => {
    jwt.verify(req.token, LLAVE, (err, data) => {
        if (!err) {
            if (data.rows[0] != null || data.rows.length > 0) {
                buscarDB.obtenerContactosUsuario(data).then(result => res.json(result)).catch(err => res.json(err));
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
                buscarDB.obtenerProyecto(data).then(result => res.json(result)).catch(err => res.json(err));
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
                buscarDB.buscarProyecto(req.params.id).then(result => res.json(result)).catch(err => res.json(err));
            }
        }
    });
});




rutas.get('/proyecto/contenido/:buque/:name', (req, res) => {

    const { buque, name } = req.params;
    //console.log(req.params)
    // const {id,name } = req.body;
    if (name == "null" || name == null) {
        res.json({ msj: "no existe" })
    } else {
        ftpminio.getFilesingle(buque, name, res);
    }



});

rutas.get('/proyecto/actividades/:id', proToken, (req, res) => {

    const { id } = req.params;
    //const {user} = req.body; 
    // const {id,name } = req.body;
    jwt.verify(req.token, LLAVE, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            if (data != {} || data !== {} || data !== null || data !== undefined) {

                buscarDB.buscaractividadesproyecto(data.rows[0], id).then(respu => res.json(respu)).catch(err => res.json(err));
            }
        }
    });

});

rutas.get('/proyecto/listado/:id', async (req, res) => {
    /*
     if(buscarDB.buscarProyecto(req.params)){
         
     }*/
    //  console.log(req.params);
    const { id } = req.params;
    //const {user} = req.body; 
    // const {id,name } = req.body;

    ftpminio.listObjects(id).then(result => res.json(result)).catch(err => res.json(err));
});



rutas.get('/calendario', proToken, (req, res) => {
    jwt.verify(req.token, LLAVE, async (err, data) => {
        //console.log(data.rows[0].id)
        await buscarDB.buscareventoscalendario(data.rows[0].id).then(respu => res.json(respu)).catch(err => res.json(err));
    });
});

rutas.get('/calendarios/:id', proToken, (req, res) => {
    jwt.verify(req.token, LLAVE, async (err, data) => {
        const { id } = req.params
        await buscarDB.buscareventoscalendarioproyecto(id).then(respu => res.json(respu)).catch(err => res.json(err));
    });
});
//-----------seccion de la api
rutas.get('/api/idiomas', async (req, res) => {
    buscarDB.obtenertodasIdiomas().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/habilidades', async (req, res) => {
    buscarDB.obtenertodasHabilidades().then(respu => res.json(respu)).catch(err => res.json(err));
});

rutas.get('/api/herramientas', async (req, res) => {
    buscarDB.obtenertodasherramientas().then(respu => res.json(respu)).catch(err => res.json(err));
});

rutas.get('/api/usuarios', async (req, res) => {
    buscarDB.obtenertodasUsuarios().then(respu => res.json(respu)).catch(err => res.json(err));
});

rutas.get('/api/palabrasclave', async (req, res) => {
    buscarDB.obtenertodasPalabrasClave().then(respu => res.json(respu)).catch(err => res.json(err));
});

rutas.get('/api/listaidiomas', async (req, res) => {
    buscarDB.obtenertodasListaidiomas().then(respu => res.json(respu)).catch(err => res.json(err));
});

rutas.get('/api/contactos', async (req, res) => {
    buscarDB.obtenertodasContactos().then(respu => res.json(respu)).catch(err => res.json(err));
});

rutas.get('/api/listacontactos', async (req, res) => {
    buscarDB.obtenertodasListaContactos().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listahabilidades', async (req, res) => {
    buscarDB.obtenertodasListaHabilidades().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listaherramientas', async (req, res) => {
    buscarDB.obtenertodasListaHerramientas().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/metodologias', async (req, res) => {
    buscarDB.obtenertodasMetodologias().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/practicas', async (req, res) => {
    buscarDB.obtenertodasPracticas().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listapracticas', async (req, res) => {
    buscarDB.obtenertodasListasPracticas().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/alfas', async (req, res) => {
    buscarDB.obtenertodasAlfas().then(respu => res.json(respu)).catch(err => res.json(err));
});

rutas.get('/api/listaalfas', async (req, res) => {
    buscarDB.obtenertodasListaAlfas().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/herramientasmetodologia', async (req, res) => {
    buscarDB.obtenertodasHerramientasMetodologia().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/tecnicas', async (req, res) => {
    buscarDB.obtenertodasTecnicas().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/actividades', async (req, res) => {
    buscarDB.obtenertodasActividades().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/roles', async (req, res) => {
    buscarDB.obtenertodasRoles().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/integrantes', async (req, res) => {
    buscarDB.obtenertodasIntegrantes().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listaactividades', async (req, res) => {
    buscarDB.obtenertodasListaActividades().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/entregables', async (req, res) => {
    buscarDB.obtenertodasEntregables().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listaentregables', async (req, res) => {
    buscarDB.obtenertodasListaentregables().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listaherramientasmetodologia', async (req, res) => {
    buscarDB.obtenertodasListaHerramientasMetodologia().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listacontenidos', async (req, res) => {
    buscarDB.obtenertodasListaContenidos().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/entregas', async (req, res) => {
    buscarDB.obtenertodasEntregas().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/chats', async (req, res) => {
    buscarDB.obtenertodasChats().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/historial', async (req, res) => {
    buscarDB.obtenertodasHistoriales().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listachats', async (req, res) => {
    buscarDB.obtenertodasListaChats().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/proyectos', async (req, res) => {
    buscarDB.obtenertodasProyectos().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/reuniones', async (req, res) => {
    buscarDB.obtenertodasReuniones().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listareuniones', async (req, res) => {
    buscarDB.obtenertodasListaReuniones().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listaentregas', async (req, res) => {
    buscarDB.obtenertodasListaEntregas().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listaeventos', async (req, res) => {
    buscarDB.obtenertodasListaEventos().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/listaintegrantes', async (req, res) => {
    buscarDB.obtenertodasListaIntegrantes().then(respu => res.json(respu)).catch(err => res.json(err));
});
rutas.get('/api/rol/:id', async (req, res) => {
    buscarDB.obtenerunrol(req.params).then(respu => res.json(respu)).catch(err => res.json(err));
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
function proToken(req, res, next) {
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