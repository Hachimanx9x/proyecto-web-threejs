const {Router} = require('express'); 
const rutas = Router(); 

const controlGeneral = require('../controladores/controlGeneral');

module.exports =app=>{
    rutas.get('/', controlGeneral.index); 

    app.use(rutas); 
}