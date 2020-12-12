const jwt = require('jsonwebtoken');
const mariaDB = require('../database');
const Query = require('./querys'); 
const LLAVE = 'misecretos';

const funcionesDB = () => {
    console.log("funciones de la base de datos")
}
funcionesDB.insertPerson=  async function(obj, res){
    const {nombre, descripcion, otro, pais , edad} = obj; 
    await mariaDB.query(Query.insertPerson(nombre, descripcion, otro, pais , edad), (err, rows, fields) => {
        if (!err) {
                     
            res.json({msj:"success" });

        } else {
            res.json({msj:"error" });
        }
    });
}

funcionesDB.insertLenguaje= async function(obj, res){
    const {nombre, nivel} = obj; 
    await mariaDB.query(Query.insertLenguaje(nombre, nivel), (err, rows, fields) => {
        if (!err) {    res.json({msj:"success" });
        } else {            res.json({msj:"error" });       }
    });
}
funcionesDB.insertContacts= async  function(obj, res){
    const {person, preferences} = obj; 
    await mariaDB.query(Query.insertContacts(person, preferences), (err, rows, fields) => {
        if (!err) {    res.json({msj:"success" });
        } else {            res.json({msj:"error" });       }
    });
}

funcionesDB.insertTools=  async function(obj, res){
    const {nombre, tipo,descripcion, url_icono} = obj; 
    await mariaDB.query(Query.insertTools(nombre, tipo,descripcion, url_icono), (err, rows, fields) => {
        if (!err) {    res.json({msj:"success" });
        } else {            res.json({msj:"error" });       }
    });
}
funcionesDB.insertAbility=  async function(tipo, descripcion, nivel,herramientaUsada , res){
    await mariaDB.query(Query.insertAbility(tipo, descripcion, nivel,herramientaUsada),(err, rows, fields) => {
        if (!err) {    res.json({msj:"success" });
        } else {            res.json({msj:"error" });       }
    } )
}

funcionesDB.insertUser= async function(correoElectronico, urlHojaVida, contrasena, experiencia,contacto, persona,habilidad, res){
    await mariaDB.query(Query.insertUser(correoElectronico, urlHojaVida, contrasena, experiencia,contacto, persona,habilidad),(err, rows, fields) => {
        if (!err) {    res.json({msj:"success" });
        } else {            res.json({msj:"error" });       }
    } )
}

module.exports = funcionesDB;