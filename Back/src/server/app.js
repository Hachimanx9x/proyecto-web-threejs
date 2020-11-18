const ex = require('express'); 
const app = ex();
const bodyParser = require('body-parser')
var cors = require('cors');
//configuracion
app.set('PORT', process.env.PORT || 3030 )
app.use(cors()); 
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
 // global controller
 /*
app.get('/*',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  next(); // http://expressjs.com/guide.html#passing-route control
}); 
app.post('/*',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  next(); 
}); */
//Rutas
app.use(require('../routes/rutas_de_busqueda')); 
app.use(require('../routes/rutas_de_insercion'));
app.use(require('../routes/rutas_de_eliminacion')); 


module.exports = app; 
