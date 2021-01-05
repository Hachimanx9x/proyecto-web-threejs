const jwt = require('jsonwebtoken');
const promesa = require('../database');
const Query = require('./querys');
//const LLAVE = 'misecretos';
const funcionesDB = () => {
    console.log("funciones de la base de datos")
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
funcionesDB.updatecontact = (obj) => {
    return new Promise((res, rej) => {
        const { nopreferenciasmbre, id } = obj;
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
module.exports = funcionesDB;