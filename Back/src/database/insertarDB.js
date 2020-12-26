const jwt = require('jsonwebtoken');
const promesa = require('../database');
const Query = require('./querys');
const LLAVE = 'misecretos';

const funcionesDB = () => {
    console.log("funciones de la base de datos")
}
//  return new Promise((res, rej) => {}).catch(e => { console.log(e) });

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
//--------------------------------------------------------------
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
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertpalabraclave(user, palabra), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
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
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertlistaidiomas(user, idioma), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });

}
//----------------------------------------------------------
//return new Promise((res, rej) => {});
funcionesDB.insertAbility = (obj, res) => {
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
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertcontactos(usuario, preferencia), (err, rows) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
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
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.insertmetodologia(nombre, descripcion, consejo), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
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
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.inserthistoriales(descripcion), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
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
module.exports = funcionesDB;