const jwt = require('jsonwebtoken');
const promesa = require('../database');
const Query = require('./querys');
const LLAVE = 'misecretos';
const funcionesDB = () => {
    console.log("funciones de la base de datos")
}

module.exports = funcionesDB;