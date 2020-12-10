const app = require('./server/app');
const http = require('./server/httpx'); 
const chalk = require('chalk'); 
//const socket = require('./server/socket'); 
//const minio = require("./serverMinio"); 

async function inicio(){
    await http.listen(app.get('PORT') ,()=>{
        console.log(chalk.blue('Ejecutando en el puerto :') + chalk.white.bgBlue(' 3030 ')); 
    });
}

inicio(); 