const app = require('./server/app');
//const http = require('./server/httpx');
const chalk = require('chalk');
var isWin = process.platform;
const exec = require('child_process').exec;
const socket = require('./server/socket');
//const minio = require("./serverMinio"); 

function inicio() {
    if (isWin === "win32") {
        console.log(chalk.blue('Iniciando min.io :') + chalk.green(" - - espera"));
        exec('start ./min.sh', function (err, stdout, stderr) {
            if (!err) {
                console.log(stdout);
            }
        });
    }
    setTimeout(() => {
        socket.listen(app.get('PORT'), () => {
            console.log(chalk.blue('Sitema ejecutandose en :') + chalk.white.bgBlue(isWin));
            console.log(chalk.blue('Ejecutando en el puerto :') + chalk.white.bgBlue(' 3030 '));
        });
    }, 3000);

}

inicio(); 