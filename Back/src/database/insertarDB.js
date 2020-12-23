const jwt = require('jsonwebtoken');
const promesa = require('../database');
const Query = require('./querys');
const LLAVE = 'misecretos';

const funcionesDB = () => {
    console.log("funciones de la base de datos")
}


funcionesDB.insertLenguaje = async function (obj, res) {
    const { nombre, nivel } = obj;
    promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
            await mariaDB.query(Query.insertLenguaje(nombre, nivel), (err, rows, fields) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
        else {
            sqlite.all(Query.login(body), (err, rows) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
    });

}
//--------------------------------------------------------------
funcionesDB.insertUser = async function (email, contrasena, fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion, pais, edad, github, gitlab, bitbucket, linkedin, res) {
    promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
            await mariaDB.query(Query.insertUser(email, contrasena, fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion, pais, edad, github, gitlab, bitbucket, linkedin), (err, rows, fields) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            })
        }
        else {
            sqlite.all(Query.insertUser(email, contrasena, fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion, pais, edad, github, gitlab, bitbucket, linkedin), (err, rows) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
    });

}
//--------------------------------------------------------------------
funcionesDB.insertKeyword = async function (obj, res) {
    const { user, palabra } = obj;
    promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
            await mariaDB.query(Query.insertpalabraclave(user, palabra), (err) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
        else {
            sqlite.all(Query.insertpalabraclave(user, palabra), (err) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
    });
}
//---------------------------------------------------------
funcionesDB.insertlistlenguaje = async function (obj, res) {
    const { user, idioma } = obj;
    promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
            await mariaDB.query(Query.insertlistaidiomas(user, idioma), (err) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
        else {
            sqlite.all(Query.insertlistaidiomas(user, idioma), (err) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
    });
}
//----------------------------------------------------------
funcionesDB.insertAbility = async function (obj, res) {
    const { tipo, descripcion, nivel } = obj;
    promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
            await mariaDB.query(Query.insertHabilidades(tipo, descripcion, nivel), (err, rows, fields) => {
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


}
//----------------------------------------------------------
funcionesDB.insetlistAbility = async function (obj, res) {
    const { usuario, habilidad } = obj;
    promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
            await mariaDB.query(Query.insertlistaHabilidades(usuario, habilidad), (err, rows, fields) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
        else {
            sqlite.all(Query.insertHainsertlistaHabilidades(usuario, habilidad), (err, rows) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
    });
}
//----------------------------------------------------------
funcionesDB.insertContacts = async function (obj, res) {
    const { usuario, preferencia } = obj;
    promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
            await mariaDB.query(Query.insertcontactos(usuario, preferencia), (err, rows, fields) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
        else {
            sqlite.all(Query.insertcontactos(usuario, preferencia), (err, rows) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
    });

}
//--------------------------------------------------------------

funcionesDB.insertTools = async function (obj, res) {
    const { nombre, tipo, descripcion, url_icono } = obj;
    promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
            await mariaDB.query(Query.insertherramientas(nombre, tipo, descripcion, url_icono), (err, rows, fields) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
        else {
            sqlite.all(Query.insertherramientas(nombre, tipo, descripcion, url_icono), (err, rows) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
    });
}
//--------------------------------------------------------------
funcionesDB.insertlistTool = async function (obj, res) {
    const { usuario, herramienta } = obj;
    promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
            await mariaDB.query(Query.insertlistaherramientas(usuario, herramienta), (err, rows, fields) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
        else {
            sqlite.all(Query.insertlistaherramientas(usuario, herramienta), (err, rows) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
    });
}
//----------------------------------------------------------------
funcionesDB.insertMethodology = async function (obj, res) {
    const { nombre, descripcion, consejo } = obj;
    promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
            await mariaDB.query(Query.insertmetodologia(nombre, descripcion, consejo), (err, rows, fields) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
        else {
            sqlite.all(Query.insertmetodologia(nombre, descripcion, consejo), (err, rows) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
    });
}
//-----------------------------------------------------------------------
funcionesDB.insertHistory = async function (obj, res) {
    const { descripcion } = obj;
    promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
            await mariaDB.query(Query.inserthistoriales(descripcion), (err) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
        else {
            sqlite.all(Query.inserthistoriales(descripcion), (err, rows) => {
                if (!err) {
                    res.json({ msj: "success" });
                } else { res.json({ msj: "error" }); }
            });
        }
    });
}
//-----------------------------------------------------------------------

module.exports = funcionesDB;