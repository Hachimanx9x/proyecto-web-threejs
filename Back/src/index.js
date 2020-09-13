const app = require('./app');
const http = require('./server/http'); 
const socket = require('./server/socket'); 

async function inicio(){
    await http.listen(app.get('PORT') ,()=>{
        console.log(`Ejecutado en ${app.get('PORT')}`); 
    });
}

inicio(); 