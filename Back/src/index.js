const ex = require('express'); 
const app = ex();

//configuracion
app.set('PORT', process.env.PORT || 3000 )

//Middlewares
app.use(ex.json()); 
//Rutas
app.use(require('./routes/conexionDB'))

app.listen(app.get('PORT'),()=>{
    console.log(`Ejecutado en ${app.get('PORT')}`)
});