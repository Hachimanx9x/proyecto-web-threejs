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

funcionesDB.creaproyecto2 = (obj) => {
    return new Promise((res, rej) => {
        const { proyect, members, practice } = obj
        insertmetodologia().then(result1 => {
            inserthistoria().then(result2 => {
                inserproyecto({
                    nombre: proyect.nombre,
                    descripcion: proyect.descripcion,
                    estado: "iniciado",
                    icon: proyect.icono,
                    banner: proyect.banner,
                    metodologia: result1.id,
                    historia: result2.id
                }).then(result3 => {
                    for (let a = 0; a < practice.length; a++) {
                        for (let b = 0; b < modelo.Practicas.length; b++) {
                            if (practice[a] == modelo.Practicas[b].nombre) {
                                insertpractica({
                                    nombre: modelo.Practicas[b].nombre,
                                    descripcion: modelo.Practicas[b].descripcion
                                }).then(result4 => {
                                    for (let c = 0; c < modelo.Practicas[b].alfas.length; c++) {
                                        insertalfa({
                                            nombre: modelo.Practicas[b].alfas[c].nombre,
                                            descripcion: modelo.Practicas[b].alfas[c].descripcion,
                                            estado: modelo.Practicas[b].alfas[c].estado
                                        }).then(result5 => {
                                            funcionesDB.insertlistAlpha({
                                                practica: result4.id,
                                                alfa: result5.id
                                            }).then(result6 => {
                                                console.log("insert list alfa " + result6.msj);
                                                for (let d = 0; d < modelo.Practicas[b].alfas[c].entregable.length; d++) {
                                                    for (let e = 0; e < modelo.Practicas[b].Entregables.length; e++) {
                                                        if (modelo.Practicas[b].alfas[c].entregable[d] === modelo.Practicas[b].Entregables[e].entregatitulo) {
                                                            insertentregable({
                                                                titulo: modelo.Practicas[b].Entregables[e].entregatitulo,
                                                                descripcion: modelo.Practicas[b].Entregables[e].entregadescripcion,
                                                                estado: modelo.Practicas[b].Entregables[e].entregaestado,
                                                                tipoArchivo: modelo.Practicas[b].Entregables[e].entregatipoArchivo,
                                                                fechaEntrega: modelo.Practicas[b].Entregables[e].entregafechaEntrega,
                                                                numeroRevisiones: modelo.Practicas[b].Entregables[e].entreganumeroRevisiones
                                                            }).then(result7 => {
                                                                insertcontenido().then(result8 => {
                                                                    funcionesDB.insertlistContent({
                                                                        entregable: result7.id,
                                                                        contenido: result8.id,
                                                                        actividad: null
                                                                    }).then(result9 => {
                                                                        console.log("insert list contenido " + result9.msj);
                                                                        if (c === (modelo.Practicas[b].alfas.length - 1) && d === (modelo.Practicas[b].alfas[c].entregable.length - 1) && e === (modelo.Practicas[b].Entregables.length - 1)) {
                                                                            buscarDB.obtenertodasRoles().then(result10 => {
                                                                                for (let f = 0; f < members.length; f++) {
                                                                                    for (let g = 0; g < result10.API.length; g++) {
                                                                                        if (members[f].rol === result10.API[g].roltitulo) {
                                                                                            insertintegrante({
                                                                                                usuario: members[f].user,
                                                                                                rol: result10.API[g].id
                                                                                            }).then(result11 => {
                                                                                                funcionesDB.insertlistMembers({
                                                                                                    proyecto: result3.id,
                                                                                                    integrante: result11.id
                                                                                                }).then(result12 => {
                                                                                                    console.log("insert list integrante " + result12.msj);
                                                                                                    let fin = false;
                                                                                                    for (let h = 0; h < modelo.Practicas[b].Roles.length; h++) {
                                                                                                        for (let i = 0; i < modelo.Practicas[b].Roles[h].actividades.length; i++) {
                                                                                                            for (let j = 0; j < modelo.Practicas[b].Actividades.length; j++) {
                                                                                                                if (modelo.Practicas[b].Roles[h].nombre === members[f].rol &&
                                                                                                                    modelo.Practicas[b].Roles[h].actividades[i] === modelo.Practicas[b].Actividades[j].titulo) {
                                                                                                                    insertactividad({
                                                                                                                        titulo: modelo.Practicas[b].Actividades[j].titulo,
                                                                                                                        estado: modelo.Practicas[b].Actividades[j].estado,
                                                                                                                        descripcion: modelo.Practicas[b].Actividades[j].descripcion,
                                                                                                                        fechacreacion: modelo.Practicas[b].Actividades[j].fechacreacion,
                                                                                                                        fechaentrega: modelo.Practicas[b].Actividades[j].fechaentrega,
                                                                                                                        revision: modelo.Practicas[b].Actividades[j].revision,
                                                                                                                        tecnica: modelo.Practicas[b].Actividades[j].tecnica
                                                                                                                    }).then(result13 => {
                                                                                                                        funcionesDB.insertlistActivity({
                                                                                                                            integrante: result11.id,
                                                                                                                            actividad: result13.id
                                                                                                                        }).then(result14 => {
                                                                                                                            console.log("insert list actividad " + result14.msj);
                                                                                                                            insertcontenido().then(result15 => {
                                                                                                                                funcionesDB.insertlistContent({
                                                                                                                                    entregable: null,
                                                                                                                                    contenido: result15.id,
                                                                                                                                    actividad: result13.id
                                                                                                                                }).then(result16 => {
                                                                                                                                    console.log("insert list contenido2 " + result16.msj);
                                                                                                                                    if (fin) {
                                                                                                                                        res({ proyectoid: result3.id })
                                                                                                                                    }
                                                                                                                                }).catch(err16 => rej(err16))
                                                                                                                            }).catch(err15 => rej(err15))
                                                                                                                        }).catch(err14 => rej(err14))
                                                                                                                    }).catch(err13 => rej(err13))
                                                                                                                }
                                                                                                                if (a == (practice.length - 1)) {
                                                                                                                    if (f === (members.length - 1)) {
                                                                                                                        if (h === (modelo.Practicas[b].Roles.length - 1)) {
                                                                                                                            if (i === (modelo.Practicas[b].Roles[h].actividades.length - 1)) {
                                                                                                                                if (j === (modelo.Practicas[b].Actividades.length - 1)) {
                                                                                                                                    fin = true;
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }).catch(err12 => rej(err12))
                                                                                            }).catch(err11 => rej(err11))
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }).catch(err10 => rej(err10))
                                                                        }
                                                                    }).catch(err9 => rej(err9))
                                                                }).catch(err8 => rej(err8))
                                                            }).catch(err7 => rej(err7))
                                                        }
                                                    }
                                                }
                                            }).catch(err6 => rej(err6))
                                        }).catch(err5 => rej(err5))
                                    }
                                }).catch(err3 => rej(err3))
                            }
                        }
                    }
                }).catch(err2 => rej(err3))
            }).catch(err2 => rej(err2))
        }).catch(err => rej(err))
    })
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
        console.log(nombre)
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.insertpractica(nombre, descripcion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err.message }); }
                });
            }
            else {
                sqlite.all(Query.insertpractica(nombre, descripcion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err.message }); }
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
funcionesDB.insertlistDeliverable = (obj) => {
    return new Promise((res, rej) => {
        const { alfa, entregable } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(
                    Query.insertlistEntregables(alfa, entregable), (err) => {
                        if (!err) {
                            res({ msj: "success" });
                        } else { rej({ msj: err }); }
                    });
            }
            else {
                sqlite.all(
                    Query.insertlistEntregables(alfa, entregable), (err) => {
                        if (!err) {
                            res({ msj: "success" });
                        } else { rej({ msj: err }); }
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
//-----------------------------------------------


function insertmetodologia() {
    return new Promise((res, rej) => {
        funcionesDB.insertMethodology({
            nombre: modelo.nombre,
            descripcion: modelo.descripcion,
            consejo: modelo.consejo
        }).then(result => {
            console.log("insert metodologia " + result.msj);
            buscarDB.obtenertodasMetodologias().then(result2 => {
                res(result2.API[result2.API.length - 1])
            }).catch(err2 => rej(err2))
        }).catch(err => rej(err))
    })
}

function inserthistoria() {
    return new Promise((res, rej) => {
        const fecha = new Date();
        const descri = `proyecto creado el ${fecha}`;
        funcionesDB.insertHistory({ descripcion: descri }).then(result => {
            console.log("insert historia " + result.msj);
            buscarDB.obtenertodasHistoriales().then(result1 => {
                res(result1.API[result1.API.length - 1])
            }).catch(err2 => rej(err2))
        }).catch(err => rej(err))
    })
}

function inserproyecto(obj) {
    return new Promise((res, rej) => {
        funcionesDB.insertProject(obj).then(result => {
            console.log("insert proyecto " + result.msj);
            buscarDB.obtenertodasProyectos().then(result1 => {
                res(result1.API[result1.API.length - 1])
            }).catch(err2 => rej(err2))
        }).catch(err => rej(err))
    })
}

function insertpractica(obj) {
    return new Promise((res, rej) => {
        funcionesDB.insertPractice(obj).then(result => {
            console.log("insert practica " + result.msj);
            buscarDB.obtenertodasPracticas().then(result1 => {
                res(result1.API[result1.API.length - 1])
            }).catch(err2 => rej(err2))
        }).catch(err => rej(err))
    })
}
function insertalfa(obj) {
    return new Promise((res, rej) => {
        funcionesDB.insertAlpha(obj).then(result => {
            console.log("insert alfa " + result.msj);
            buscarDB.obtenertodasAlfas().then(result1 => {
                res(result1.API[result1.API.length - 1])
            }).catch(err2 => rej(err2))
        }).catch(err => rej(err))
    })
}
function insertentregable(obj) {
    return new Promise((res, rej) => {
        funcionesDB.insertDeliverable(obj).then(result => {
            console.log("insert entragable " + result.msj);
            buscarDB.obtenertodasEntregables().then(result1 => {
                res(result1.API[result1.API.length - 1])
            }).catch(err2 => rej(err2))
        }).catch(err => rej(err))
    })
}
function insertcontenido() {
    return new Promise((res, rej) => {
        funcionesDB.insertContent({
            nombre: null,
            nombrearchivo: null,
            descripcion: null,
            bibliografia: null
        }).then(result => {
            console.log("insert entragable " + result.msj);
            buscarDB.obtenertodasContenidos().then(result1 => {
                res(result1.API[result1.API.length - 1])
            }).catch(err2 => rej(err2))
        }).catch(err => rej(err))
    })
}

function insertintegrante(obj) {
    return new Promise((res, rej) => {
        funcionesDB.insertMembers(obj).then(result => {
            console.log("insert integrante " + result.msj);
            buscarDB.obtenertodasIntegrantes().then(result1 => {
                res(result1.API[result1.API.length - 1])
            }).catch(err2 => rej(err2))
        }).catch(err => rej(err))
    })
}
function insertactividad(obj) {
    return new Promise((res, rej) => {
        funcionesDB.insertActivity(obj).then(result => {
            console.log("insert actividad " + result.msj);
            buscarDB.obtenertodasActividades().then(result1 => {
                res(result1.API[result1.API.length - 1])
            }).catch(err2 => rej(err2))
        }).catch(err => rej(err))
    })
}
module.exports = funcionesDB;