const app = require('./server/app');
const http = require('./server/httpx');
const chalk = require('chalk');
var isWin = process.platform;
const exec = require('child_process').exec;
//const socket = require('./server/socket'); 
//const minio = require("./serverMinio"); 

async function inicio () {
    await http.listen(app.get('PORT'), () => {
        console.log(chalk.blue('Sitema ejecutandose en :') + chalk.white.bgBlue(isWin));
        if (isWin === "win32") {
            exec('start ./min.sh', function (err, stdout, stderr) {
                if (!err) {
                    console.log(stdout);
                }
            });
        }

        console.log(chalk.blue('Ejecutando en el puerto :') + chalk.white.bgBlue(' 3030 '));
    });
}

inicio(); 