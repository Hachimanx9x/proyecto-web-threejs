const {Router} = require('express'); 
const rutas = Router(); 

const controlGeneral = require('../controladores/controlGeneral');

module.exports =app=>{
    rutas.get('/', controlGeneral.index); 
    rutas.get('/entorno', controlGeneral.entorno); 
    rutas.get('/interaccion', controlGeneral.interaccion); 
    rutas.get('/controlCamara', controlGeneral.controles); 
    rutas.get('/espejos', controlGeneral.espejos); 
    rutas.get('/chat', controlGeneral.chat); 

    app.use(rutas); 
}