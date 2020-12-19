const app = require('./server/app');
const http = require('./server/httpx'); 
const chalk = require('chalk'); 
var isWin = process.platform;

//const socket = require('./server/socket'); 
//const minio = require("./serverMinio"); 

async function inicio(){
    await http.listen(app.get('PORT') ,()=>{
        console.log(chalk.blue('Sitema ejecutandose en :') + chalk.white.bgBlue(isWin)); 
        console.log(chalk.blue('Ejecutando en el puerto :') + chalk.white.bgBlue(' 3030 ')); 
    });
}

inicio(); 