const ex = require('express'); 
const app = ex();

//configuracion
app.set('PORT', process.env.PORT || 3030 )

//Middlewares
app.use(ex.json()); 
app.use(ex.urlencoded({extended:false})); 
//Rutas
app.use(require('../routes/rutas_de_busqueda')); 
app.use(require('../routes/rutas_de_insercion'));
app.use(require('../routes/rutas_de_eliminacion')); 


module.exports = app; 
/*
app.listen(app.get('PORT'),()=>{
    console.log(`Ejecutado en ${app.get('PORT')}`)
});*/