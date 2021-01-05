const chalk = require('chalk');
const path = require('path');
const maria = require('mysql');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../db/database.db')
var vDB = true;
// busca la coneccion 
let sqlite;
const mariaDB = maria.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proyectoweb'
});
//proyectoweb
let promesa = new Promise((res, rej) => {
    mariaDB.connect((error) => {
        if (error) {
            console.log(chalk.bold.red('error en la conexión de ') + chalk.bgRed.bold(' mariaDB '));
            sqlite = new sqlite3.Database(dbPath, (err) => {
                if (err) {
                    console.log("error");
                    rej({ mariaDBError: error, sqliteError: err });
                    return console.error(err.message);
                }
                console.log(chalk.bgRed("entrando en la base de datos de emergencia"));
                console.log(chalk.bgBlue("Reiniciando base de datos"));
                vDB = false;
                console.log(chalk.white.bold('Estado de SQLITE es :') + chalk.white.bgBlue(' Conectado '));
                res({ mariaDB, sqlite, vDB });
            });

            return;
        } else {
            res({ mariaDB, sqlite, vDB });
            console.log(chalk.white.bold('Estado de mariaDB es :') + chalk.white.bgBlue(' Conectado '))

        }
    });
})



module.exports = promesa; 
