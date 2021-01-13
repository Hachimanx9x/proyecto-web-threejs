const jwt = require('jsonwebtoken');
const promesa = require('../database');
const buscarDB = require('./buscarDB');
const Query = require('./querys');
const LLAVE = 'misecretos';
const modelo = require('../models/models');
const funcionesDB = () => {
    console.log("funciones de la base de datos")
}

/*
 ________  __  __                     
|        \|  \|  \                    
| $$$$$$$$ \$$| $$  ______    _______ 
| $$__    |  \| $$ /      \  /       \
| $$  \   | $$| $$|  $$$$$$\|  $$$$$$$
| $$$$$   | $$| $$| $$    $$ \$$    \ 
| $$      | $$| $$| $$$$$$$$ _\$$$$$$\
| $$      | $$| $$ \$$     \|       $$
 \$$       \$$ \$$  \$$$$$$$ \$$$$$$$ 
                                       */

funcionesDB.creaprouyecto = (obj) => {
    return new Promise((res, rej) => {
        const { proyect, members, practice } = obj
        funcionesDB.insertMethodology({
            nombre: modelo.nombre,
            descripcion: modelo.descripcion,
            consejo: modelo.consejo
        }).then(result1 => {
            funcionesDB.insertHistory({ descripcion: `proyecto creado el ${fecha}` }).then(result2 => {
                buscarDB.obtenertodasMetodologias().then(result3 => {
                    const ultimeto = result3.API[result3.API.length - 1];
                    buscarDB.obtenertodasHistoriales().then(result4 => {
                        const ultihis = result4.API[result4.API.length - 1];
                        funcionesDB.insertProject({
                            nombre: proyect.nombre,
                            descripcion: proyect.descripcion,
                            estado: "iniciado",
                            icon: proyect.icono,
                            banner: proyect.banner,
                            metodologia: ultimeto.id,
                            historia: ultihis.id
                        }).then(result5 => {
                            for (let a = 0; a < practice.length; a++) {
                                for (let b = 0; b < modelo.Practicas.length; b++) {
                                    if (practice[a] == modelo.Practicas[b].nombre) {
                                        funcionesDB.insertPractice({
                                            nombre: modelo.Practicas[b].nombre,
                                            descripcion: Practicas[b].descripcion
                                        }).then(result6 => {
                                            buscarDB.obtenertodasPracticas().then(result7 => {
                                                const ultipra = result1.API[result1.API.length - 1];
                                                funcionesDB.insertlistPractice({
                                                    metodologia: ultimeto.id,
                                                    practica: ultipra.id
                                                }).then(result8 => {
                                                    for (let c = 0; c < modelo.Practicas[b].alfas.length; c++) {
                                                        funcionesDB.insertAlpha({
                                                            nombre: modelo.Practicas[b].alfas[c].nombre,
                                                            descripcion: modelo.Practicas[b].alfas[c].descripcion,
                                                            estado: modelo.Practicas[b].alfas[c].estado
                                                        }).then(result9 => {
                                                            buscarDB.obtenertodasAlfas().then(result9 => {
                                                                const ultialfa = result9.API[result9.API.length - 1];
                                                                entregable.insertlistAlpha({
                                                                    practica: ultipra.id,
                                                                    alfa: ultialfa.id
                                                                }).then(result10 => {
                                                                    for (let d = 0; d < modelo.Practicas[b].alfas[c].entregable.length; d++) {
                                                                        for (let e = 0; e < modelo.Practicas[b].Entregables.length; e++) {
                                                                            if (modelo.Practicas[b].alfas[c].entregable[d] === modelo.Practicas[b].Entregables[e].entregatitulo)
                                                                                funcionesDB.insertDeliverable({
                                                                                    titulo: modelo.Practicas[b].Entregables[e].entregatitulo,
                                                                                    descripcion: modelo.Practicas[b].Entregables[e].entregadescripcion,
                                                                                    estado: modelo.Practicas[b].Entregables[e].entregaestado,
                                                                                    tipoArchivo: modelo.Practicas[b].Entregables[e].entregatipoArchivo,
                                                                                    fechaEntrega: modelo.Practicas[b].Entregables[e].entregafechaEntrega,
                                                                                    numeroRevisiones: modelo.Practicas[b].Entregables[e].entreganumeroRevisiones
                                                                                }).then(result11 => {

                                                                                    if (c === (modelo.Practicas[b].alfas.length - 1)) {
                                                                                        if (a === practice.length - 1) {
                                                                                            res(practicas);
                                                                                        }
                                                                                    }
                                                                                }).catch(err => rej(err));
                                                                        }
                                                                    }
                                                                }).catch(err => res.json(err))
                                                            }).catch(err => rej(err))
                                                        }).catch(err => rej(err))
                                                    }
                                                }).catch(err => rej(err))
                                            }).catch(err => rej(err))
                                        }).catch(err => rej(err));
                                    }
                                }
                            }
                        }).catch(err => rej(err))
                    }).catch(err => rej(err))
                }).catch(err => rej(err))
            }).catch(err => rej(err));
        }).catch(err => rej(err));
    });
}

/**
 * 
 _______              __                __                                     
|       \            |  \              |  \                                    
| $$$$$$$\  ______  _| $$_     ______  | $$____    ______    _______   ______  
| $$  | $$ |      \|   $$ \   |      \ | $$    \  |      \  /       \ /      \ 
| $$  | $$  \$$$$$$\\$$$$$$    \$$$$$$\| $$$$$$$\  \$$$$$$\|  $$$$$$$|  $$$$$$\
| $$  | $$ /      $$ | $$ __  /      $$| $$  | $$ /      $$ \$$    \ | $$    $$
| $$__/ $$|  $$$$$$$ | $$|  \|  $$$$$$$| $$__/ $$|  $$$$$$$ _\$$$$$$\| $$$$$$$$
| $$    $$ \$$    $$  \$$  $$ \$$    $$| $$    $$ \$$    $$|       $$ \$$     \
 \$$$$$$$   \$$$$$$$   \$$$$   \$$$$$$$ \$$$$$$$   \$$$$$$$ \$$$$$$$   \$$$$$$$
 */
//--------------------------------------------------------------
funcionesDB.insertLenguaje = (obj) => {
    return new Promise((res, rej) => {
        const { nombre, nivel } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertLenguaje(nombre, nivel), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertLenguaje(nombre, nivel), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })

    })


}
funcionesDB.insertUser = (obj) => {
    return new Promise((res, rej) => {
        const { email,
            contrasena,
            fotoperfil,
            nombrearchivohojadevida,
            anosdeexperiencia,
            nombre,
            descripcion,
            pais,
            edad,
            github,
            gitlab,
            bitbucket,
            linkedin } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertUser(
                    email,
                    contrasena,
                    fotoperfil,
                    nombrearchivohojadevida,
                    anosdeexperiencia,
                    nombre,
                    descripcion,
                    pais,
                    edad,
                    github,
                    gitlab,
                    bitbucket,
                    linkedin), (err) => {
                        if (!err) {
                            res({ msj: "success" });
                        } else { rej({ msj: "error" }); }
                    })
            }
            else {
                sqlite.all(Query.insertUser(
                    email,
                    contrasena,
                    fotoperfil,
                    nombrearchivohojadevida,
                    anosdeexperiencia,
                    nombre,
                    descripcion,
                    pais,
                    edad,
                    github,
                    gitlab,
                    bitbucket,
                    linkedin), (err) => {
                        if (!err) {
                            res({ msj: "success" });
                        } else { rej({ msj: "error" }); }
                    });
            }
        })
    })


}
//--------------------------------------------------------------------
funcionesDB.insertKeyword = (obj) => {
    return new Promise((res, rej) => {
        const { user, palabra } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertpalabraclave(user, palabra), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.insertpalabraclave(user, palabra), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
        }).catch(e => { console.log(e) });
    }).catch(e => { console.log(e) });

}
//---------------------------------------------------------
funcionesDB.insertlistlenguaje = (obj) => {
    return new Promise((res, rej) => {
        const { user, idioma } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistaidiomas(user, idioma), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.insertlistaidiomas(user, idioma), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
        });
    });

}
//----------------------------------------------------------
//return new Promise((res, rej) => {});
funcionesDB.insertAbility = (obj) => {
    return new Promise((res, rej) => {
        const { tipo, descripcion, nivel } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertHabilidades(tipo, descripcion, nivel), (err, rows, fields) => {
                    if (!err) {
                        res.json({ msj: "success" });
                    } else { res.json({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertHabilidades(tipo, descripcion, nivel), (err, rows) => {
                    if (!err) {
                        res.json({ msj: "success" });
                    } else { res.json({ msj: "error" }); }
                });
            }
        });
    });



}
//----------------------------------------------------------
funcionesDB.insetlistAbility = (obj) => {
    return new Promise((res, rej) => {
        const { usuario, habilidad } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistaHabilidades(usuario, habilidad), (err, rows, fields) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertHainsertlistaHabilidades(usuario, habilidad), (err, rows) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });

}
//----------------------------------------------------------
funcionesDB.insertContacts = (obj) => {
    return new Promise((res, rej) => {
        const { usuario, preferencia } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertcontactos(usuario, preferencia), (err, rows, fields) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.insertcontactos(usuario, preferencia), (err, rows) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
        });
    });

}
//----------------------------------------------------------
funcionesDB.insertlistContacts = (obj) => {
    return new Promise((res, rej) => {
        const { usuario, contacto } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistcontactos(usuario, contacto), (err, rows, fields) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.insertlistcontactos(usuario, contacto), (err, rows) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
        });
    });

}
//--------------------------------------------------------------

funcionesDB.insertTools = (obj) => {
    return new Promise((res, rej) => {
        const { nombre, tipo, descripcion, url_icono } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertherramientas(nombre, tipo, descripcion, url_icono), (err, rows, fields) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertherramientas(nombre, tipo, descripcion, url_icono), (err, rows) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });

}
//--------------------------------------------------------------
funcionesDB.insertlistTool = (obj) => {
    return new Promise((res, rej) => {
        const { usuario, herramienta } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistaherramientas(usuario, herramienta), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertlistaherramientas(usuario, herramienta), (err, rows) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });

}
//----------------------------------------------------------------
funcionesDB.insertMethodology = (obj) => {
    return new Promise((res, rej) => {
        const { nombre, descripcion, consejo } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertmetodologia(nombre, descripcion, consejo), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.insertmetodologia(nombre, descripcion, consejo), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
        });
    });

}
//-----------------------------------------------------------------------
funcionesDB.insertHistory = (obj) => {
    return new Promise((res, rej) => {
        const { descripcion } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.inserthistoriales(descripcion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.inserthistoriales(descripcion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
        });
    });

}
//-----------------------------------------------------------------------
funcionesDB.insertProject = (obj) => {
    return new Promise((res, rej) => {
        const { nombre, descripcion, estado, icon, banner, metodologia, historia } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertproyecto(nombre, descripcion, estado, icon, banner, metodologia, historia), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertproyecto(nombre, descripcion, estado, icon, banner, metodologia, historia), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//-----------------------------------------------------------------------
funcionesDB.insertPractice = (obj) => {
    return new Promise((res, rej) => {
        const { nombre, descripcion } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertpractica(nombre, descripcion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertpractica(nombre, descripcion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//-----------------------------------------------------------------------
funcionesDB.insertlistPractice = (obj) => {
    return new Promise((res, rej) => {
        const { metodologia, practica } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistapracticas(metodologia, practica), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertlistapracticas(metodologia, practica), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//-----------------------------------------------------------------------
funcionesDB.inserRoles = (obj, res) => {
    return new Promise((res, rej) => {
        const { titulo, descripcion, recomendacion } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertRol(titulo, descripcion, recomendacion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertRol(titulo, descripcion, recomendacion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//-----------------------------------------------------------------------
funcionesDB.insertlistRoles = (obj) => {
    return new Promise((res, rej) => {
        const { practica, rol } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistaroles(practica, rol), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertlistaroles(practica, rol), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//-----------------------------------------------------------------------
funcionesDB.insertMembers = (obj) => {
    return new Promise((res, rej) => {
        const { usuario, rol } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertIntegrante(usuario, rol), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertIntegrante(usuario, rol), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//-----------------------------------------------------------------------
funcionesDB.insertlistMembers = (obj) => {
    return new Promise((res, rej) => {
        const { proyecto, integrante } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertListaintegrantes(proyecto, integrante), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertListaintegrantes(proyecto, integrante), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });

}
//-----------------------------------------------------------------------
funcionesDB.insertAlpha = (obj) => {
    return new Promise((res, rej) => {
        const { nombre, descripcion, estado } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertAlfa(nombre, descripcion, estado), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertAlfa(nombre, descripcion, estado), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });

}
//-----------------------------------------------------------------------
funcionesDB.insertlistAlpha = (obj) => {
    return new Promise((res, rej) => {
        const { practica, alfa } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistAlfas(practica, alfa), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertlistAlfas(practica, alfa), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });

}
//-----------------------------------------------------------------------
funcionesDB.insertDeliverable = (obj) => {
    return new Promise((res, rej) => {
        const { titulo, descripcion, estado, tipoArchivo, fechaEntrega, numeroRevisiones } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(
                    Query.insertEntregables(
                        titulo,
                        descripcion,
                        estado,
                        tipoArchivo,
                        fechaEntrega,
                        numeroRevisiones), (err) => {
                            if (!err) {
                                res({ msj: "success" });
                            } else { rej({ msj: "error" }); }
                        });
            }
            else {
                sqlite.all(
                    Query.insertEntregables(
                        titulo,
                        descripcion,
                        estado,
                        tipoArchivo,
                        fechaEntrega,
                        numeroRevisiones), (err) => {
                            if (!err) {
                                res({ msj: "success" });
                            } else { rej({ msj: "error" }); }
                        });
            }
        });
    });

}
//-----------------------------------------------------------------------
funcionesDB.insertTechnical = (obj) => {
    return new Promise((res, rej) => {
        const { titulo, descripcion, bibliografia } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertTecnicas(titulo, descripcion, bibliografia), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertTecnicas(titulo, descripcion, bibliografia), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });

}
//-----------------------------------------------------------------------
funcionesDB.insertActivity = (obj) => {
    return new Promise((res, rej) => {
        const { titulo, estado, descripcion, fechacreacion, fechaentrega, revision, tecnica } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertActividades(
                    titulo,
                    estado,
                    descripcion,
                    fechacreacion,
                    fechaentrega,
                    revision,
                    tecnica), (err) => {
                        if (!err) {
                            res({ msj: "success" });
                        } else { rej({ msj: "error" }); }
                    });
            }
            else {
                sqlite.all(Query.insertActividades(
                    titulo,
                    estado,
                    descripcion,
                    fechacreacion,
                    fechaentrega,
                    revision,
                    tecnica), (err) => {
                        if (!err) {
                            res({ msj: "success" });
                        } else { rej({ msj: "error" }); }
                    });
            }
        });
    });

}
//-----------------------------------------------------------------------
funcionesDB.insertlistActivity = (obj) => {
    return new Promise((res, rej) => {
        const { integrante, actividad } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistaactiviades(integrante, actividad), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertlistaactiviades(integrante, actividad), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });

}
//-----------------------------------------------------------------------
funcionesDB.insertchat = (obj) => {
    return new Promise((res, rej) => {
        const { archivo, fecha } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertchats(archivo, fecha), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertchats(archivo, fecha), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });

}
//-----------------------------------------------------------------------
funcionesDB.insertlistchat = (obj) => {
    return new Promise((res, rej) => {
        const { historial, chat } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistchats(historial, chat), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertlistchats(historial, chat), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.insertEvent = (obj) => {
    return new Promise((res, rej) => {
        const { fechacreacion } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.inserteventos(fechacreacion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.inserteventos(fechacreacion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.insertListEvent = (obj) => {
    return new Promise((res, rej) => {
        const { historial, evento, integrante } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlisteventos(historial, evento, integrante), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertlisteventos(historial, evento, integrante), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.insertMeeting = (obj) => {
    return new Promise((res, rej) => {
        const { titulo, fecha, hora, duracion, descripcion, vigente } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertreunion(titulo, fecha, hora, duracion, descripcion, vigente), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertreunion(titulo, fecha, hora, duracion, descripcion, vigente), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.insertListMeeting = (obj) => {
    return new Promise((res, rej) => {
        const { evento, reunion } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistreunion(evento, reunion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertlistreunion(evento, reunion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.insertDelivery = (obj) => {
    return new Promise((res, rej) => {
        const { titulo, descripcion, nombrearchivoguardado, actividad, entragable } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertentrega(titulo, descripcion, nombrearchivoguardado, actividad, entragable), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertentrega(titulo, descripcion, nombrearchivoguardado, actividad, entragable), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.insertContent = (obj) => {
    return new Promise((res, rej) => {
        const { nombre, nombrearchivo, descripcion, bibliografia } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertcontenido(nombre, nombrearchivo, descripcion, bibliografia), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertcontenido(nombre, nombrearchivo, descripcion, bibliografia), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.insertlistContent = (obj) => {
    return new Promise((res, rej) => {
        const { entregable, contenido, actividad } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistcontenido(entregable, contenido, actividad), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertlistcontenido(entregable, contenido, actividad), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.insertMethodologyTool = (obj) => {
    return new Promise((res, rej) => {
        const { nombre, descripcion, bibliografia } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertherramientametodologia(nombre, descripcion, bibliografia), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertherramientametodologia(nombre, descripcion, bibliografia), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.insertListMethodologyTool = (obj) => {
    return new Promise((res, rej) => {
        const { entregable, herramientametodologia } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertlistherramientametodologia(entregable, herramientametodologia), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertlistherramientametodologia(entregable, herramientametodologia), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}


module.exports = funcionesDB;