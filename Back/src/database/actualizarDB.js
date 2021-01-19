
const promesa = require('../database');
const buscarDB = require('./buscarDB')
const Query = require('./querys');
const chalk = require('chalk');
//const LLAVE = 'misecretos';
const funcionesDB = () => {
    console.log("funciones de la base de datos")
}

funcionesDB.entregaractividad = (actividad, nombre) => {
    return new Promise((res, rej) => {
        buscarDB.obtenerentreactividad(actividad).then(actientre => {
            let revisio = actientre.API[0].actividadrevision + 1;
            funcionesDB.updateDelivery({
                descripcion: `${actientre.API[0].actividadtitulo} entregado unos ${revisio}`,
                titulo: actientre.API[0].actividadtitulo,
                nombrearchivo: nombre,
                id: actientre.API[0].entregaid
            }).then(result => {
                console.log(chalk.bgRed("|   |") + " entrega actividad echa");
                funcionesDB.updatecontent({
                    nombreArchivo: nombre,
                    id: actientre.API[0].contenidoid
                }).then(result2 => {
                    console.log(chalk.bgYellow("|   |") + " contenido actualizado");
                    funcionesDB.updateactivitystate({
                        estado: "entregada",
                        id: actientre.API[0].actividadid
                    }).then(result2 => {
                        funcionesDB.updateactivityrevised({
                            revision: (actientre.API[0].actividadrevision + 1),
                            id: actientre.API[0].actividadid
                        }).then(result3 => {
                            res({ proyecto: actientre.API[0].proyectoid })
                        }).catch(err4 => rej(err4))
                    }).catch(err3 => rej(err3))
                }).catch(err3 => rej(err3))
            }).catch(err2 => rej(err2))
        }).catch(err => rej(err))
    })
}

funcionesDB.entregarentregable = (entregable, nombre) => {
    return new Promise((res, rej) => {
        buscarDB.obtenerentreentregable(entregable).then(result => {
            let practicas = result.API[0].entreganumeroRevisiones + 1;
            funcionesDB.updateDelivery({
                descripcion: `${result.API[0].entregatitulo} entregado unos ${practicas}`,
                titulo: result.API[0].entregatitulo,
                nombrearchivo: nombre,
                id: result.API[0].entregaid
            }).then(result => {
                console.log(chalk.bgRed("|   |") + " entrega entregable echa");
                funcionesDB.updatecontent({
                    nombreArchivo: nombre,
                    id: result.API[0].contenidoid
                }).then(result2 => {
                    funcionesDB.updatedeliverablenum({
                        num: (practicas), id: result.API[0].entregableid
                    }).then(result3 => {
                        res({ proyecto: result.API[0].proyectoid })
                    }).catch(err4 => rej(err4))
                }).catch(err3 => rej(err3))
            }).catch(err2 => rej(err2))

        }).catch(err => rej(err))
    })
}
//falta implementar 
funcionesDB.entregarentregable = (entregable, nombre) => {
    return new Promise((res, rej) => {
        buscarDB.obtenerentreentregable(entregable).then(result => {
            let practicas = result.API[0].entreganumeroRevisiones + 1;
            funcionesDB.updateDelivery({
                descripcion: `${result.API[0].entregatitulo} entregado unos ${practicas}`,
                titulo: result.API[0].entregatitulo,
                nombrearchivo: nombre,
                id: result.API[0].entregaid
            }).then(result => {
                console.log(chalk.bgRed("|   |") + " entrega entregable echa");
                funcionesDB.updatecontent({
                    nombreArchivo: nombre,
                    id: result.API[0].contenidoid
                }).then(result2 => {
                    funcionesDB.updatedeliverablenum({
                        num: (practicas), estado: "entregado", id: result.API[0].entregableid
                    }).then(result3 => {
                        res({ proyecto: result.API[0].proyectoid })
                    }).catch(err4 => rej(err4))
                }).catch(err3 => rej(err3))
            }).catch(err2 => rej(err2))

        }).catch(err => rej(err))
    })
}
//----------------------------------------------------------------
funcionesDB.updateDelivery = (obj) => {
    return new Promise((res, rej) => {
        const { descripcion, titulo, nombrearchivo, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updatentrega(descripcion, titulo, nombrearchivo, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.updatentrega(descripcion, titulo, nombrearchivo, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                })
            }
        })
    })
}
funcionesDB.updatedeliverablenum = (obj) => {
    return new Promise((res, rej) => {
        const { num, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updatentregablenum(num, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.updatentregablenum(num, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updatelenguajename = (obj) => {
    return new Promise((res, rej) => {
        const { nombre, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateidiomasnombre(nombre, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.updateidiomasnombre(nombre, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
        }).catch(err => console.log(err))
    })
}
//----------------------------------------------------------------
funcionesDB.updatelenguajelevel = (obj) => {
    return new Promise((res, rej) => {
        const { nivel, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                console.log("entro1")
                mariaDB.query(Query.updateidiomasnivel(nivel, id), (err, rows) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.updateidiomasnivel(nivel, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
        }).catch(err => console.log(err))
    })
}
//----------------------------------------------------------------
funcionesDB.updatelenguaje = (obj) => {
    return new Promise((res, rej) => {
        const { nombre, nivel, id } = obj;
        promesa.then((result) => {

            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateidiomas(nombre, nivel, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.updateidiomas(nombre, nivel, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        }).catch(err => console.log(err))
    })
}
//----------------------------------------------------------------
funcionesDB.updateuseremail = (obj) => {
    return new Promise((res, rej) => {
        const { email, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuarioscorreo(email, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuarioscorreo(email, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateuserpassword = (obj) => {
    return new Promise((res, rej) => {
        const { password, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuarioscontrasena(password, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuarioscontrasena(password, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateuserprofilephoto = (obj) => {
    return new Promise((res, rej) => {
        const { foto, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuariofotoperfil(foto, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuariofotoperfil(foto, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateusercv = (obj) => {
    return new Promise((res, rej) => {
        const { cv, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuarioshojavida(cv, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuarioshojavida(cv, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateuserexperience = (obj) => {
    return new Promise((res, rej) => {
        const { experiencia, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuariosexperiencia(experiencia, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuariosexperiencia(experiencia, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateusername = (obj) => {
    return new Promise((res, rej) => {
        const { nombre, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuariosnombre(nombre, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuariosnombre(nombre, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateuserdescription = (obj) => {
    return new Promise((res, rej) => {
        const { descripcion, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuariosdescripcion(descripcion, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuariosdescripcion(descripcion, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateusercountry = (obj) => {
    return new Promise((res, rej) => {
        const { pais, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuariospais(pais, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuariospais(pais, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateuserage = (obj) => {
    return new Promise((res, rej) => {
        const { edad, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuariosedad(edad, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuariosedad(edad, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}

//----------------------------------------------------------------
funcionesDB.updateusergithub = (obj) => {
    return new Promise((res, rej) => {
        const { github, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuariosgithub(github, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuariosgithub(github, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateuserbitbucket = (obj) => {
    return new Promise((res, rej) => {
        const { bitbucket, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuariosbitbucket(bitbucket, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuariosbitbucket(bitbucket, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateusergitlab = (obj) => {
    return new Promise((res, rej) => {
        const { gitlab, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuariosgitlab(gitlab, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuariosgitlab(gitlab, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateuserlinkedin = (obj) => {
    return new Promise((res, rej) => {
        const { linkedin, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateusuarioslinkedin(linkedin, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateusuarioslinkedin(linkedin, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateuser = (obj) => {

    return new Promise((res, rej) => {
        const { id,
            email,
            password,
            experiencia,
            fotoperfil,
            nombrearchivohojadevida,
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
                mariaDB.query(Query.updateusuario(id,
                    email,
                    password,
                    experiencia,
                    fotoperfil,
                    nombrearchivohojadevida,
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
                        } else { rej({ msj: err }); }
                    });
            }
            else {
                sqlite.all(Query.updateusuario(id,
                    email,
                    password,
                    experiencia,
                    fotoperfil,
                    nombrearchivohojadevida,
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
                        } else { rej({ msj: err }); }
                    });
            }
        })
    })

}
//----------------------------------------------------------------
funcionesDB.updatecontact = (obj) => {
    return new Promise((res, rej) => {
        const { preferencias, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updatecontacto(preferencias, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updatecontacto(preferencias, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateactivitystate = (obj) => {
    return new Promise((res, rej) => {
        const { estado, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateactividadestado(estado, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateactividadestado(estado, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateactivitydeliverydate = (obj) => {
    return new Promise((res, rej) => {
        const { fecha, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateactividadfechaentrega(fecha, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateactividadfechaentrega(fecha, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateactivityrevised = (obj) => {
    return new Promise((res, rej) => {
        const { revision, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateactividadrevisiones(revision, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateactividadrevisiones(revision, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updatemember = (obj) => {
    return new Promise((res, rej) => {
        const { rol, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updateaintegrantes(rol, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updateaintegrantes(rol, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updatecontent = (obj) => {
    return new Promise((res, rej) => {
        const { nombreArchivo, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updatecontenidos(nombreArchivo, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updatecontenidos(nombreArchivo, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updatedeliverable = (obj) => {
    return new Promise((res, rej) => {
        const { estado, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updatentregable(estado, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updatentregable(estado, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updatehistory = (obj) => {
    return new Promise((res, rej) => {
        const { descripcion, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updathistorial(descripcion, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updathistorial(descripcion, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateproyectbanner = (obj) => {
    return new Promise((res, rej) => {
        const { banner, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updatproyectobanner(banner, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updatproyectobanner(banner, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
//----------------------------------------------------------------
funcionesDB.updateproyecticon = (obj) => {
    return new Promise((res, rej) => {
        const { icono, id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.updatproyectoicono(icono, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.updatproyectoicono(icono, id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        })
    })
}
module.exports = funcionesDB;