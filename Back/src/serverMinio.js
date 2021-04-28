const Minio = require("minio"); 
const chalk = require('chalk'); 
const minioconeccion =new  Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});


minioconeccion.ubicacion = 'localhost'; 

minioconeccion.listBuckets(function(err, buckets) {
    if (err)
    { return console.log(chalk.bold.red('error en la conexión de ')+ chalk.bgRed.bold(' min.io '))}
    else {console.log(chalk.white.bold('Estado de min.io :') + chalk.white.bgBlue(' Conectado '))} 
 //   console.log('buckets :', buckets)
  }); 

module.exports = minioconeccion;