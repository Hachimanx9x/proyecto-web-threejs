const Minio = require("minio"); 

const minioconeccion =new  Minio.Client({
    endPoint: '192.168.18.9',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});


minioconeccion.ubicacion = 'localhost'; 

minioconeccion.listBuckets(function(err, buckets) {
    if (err)
    { return console.log(err)}
    else {console.log("minio esta conectado")} 
 //   console.log('buckets :', buckets)
  }); 

module.exports = minioconeccion;