const ex = require('express'); 
const app = ex();
const bodyParser = require('body-parser')
//configuracion
app.set('PORT', process.env.PORT || 3030 )

//Middlewares
app.use(ex.json()); 
app.use(ex.urlencoded({extended:false})); 
app.use(bodyParser.json({
    limit: '500mb'
  }));
app.use(bodyParser.urlencoded({
    limit: '500mb',
    parameterLimit: 100000000,
    extended: true 
  }));
  
//Rutas
app.use(require('../routes/rutas_de_busqueda')); 
app.use(require('../routes/rutas_de_insercion'));
app.use(require('../routes/rutas_de_eliminacion')); 


module.exports = app; 
