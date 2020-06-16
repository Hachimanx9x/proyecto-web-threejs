const ex = require('express'); 
const fs = require('fs'); 
const path = require('path'); 

const config = require('./servidor/configuracion'); 

const bd = require('./baseDatos'); 

const app = config(ex()); 

const baseDatos = require('./baseDatos'); 


app.listen(app.get('port') , ()=>{
    console.log(`Servidor iniciado en ${app.get('port')}`);
}); 
 