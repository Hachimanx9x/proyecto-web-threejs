const {Router} = require('express'); 
const rutas = Router(); 

const controlGeneral = require('../controladores/controlGeneral');

module.exports =app=>{
    rutas.get('/', controlGeneral.index); 
    rutas.get('/entorno', controlGeneral.entorno); 
    rutas.get('/interaccion', controlGeneral.interaccion); 
    rutas.get('/controlCamara', controlGeneral.controles); 

    app.use(rutas); 
}