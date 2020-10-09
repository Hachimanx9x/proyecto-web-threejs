const app = require('./server/app');
const http = require('./server/httpx'); 
//const socket = require('./server/socket'); 
//const minio = require("./serverMinio"); 

async function inicio(){
    await http.listen(app.get('PORT') ,()=>{
        console.log(`Ejecutado en ${app.get('PORT')}`); 
    });
}

inicio(); 