const mariadb = require('mysql'); 
const chalk = require('chalk'); 
const mariadbConection = mariadb.createConnection({
    host: 'localhost',
    user:'root',
    password:'root',
    database:'proyectoweb'
});

mariadbConection.connect( function(error){
    if(error){
        console.log(chalk.bold.red('error en la conexión de ')+ chalk.bgRed.bold(' mariaDB '));
        return; 
    }else{
        console.log(chalk.white.bold('Estado de mariaDB es :') + chalk.white.bgBlue(' Conectado '))

    }
});

module.exports = mariadbConection;