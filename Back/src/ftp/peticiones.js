const minio = require("../serverMinio"); 
var Fs = require('fs')

const peticiones ={}; 

peticiones.getFile=()=>{
    
}

peticiones.putFile=async (bucket,namefile, file  )=>{
    // Using fPutObject API upload your file to the bucket europetrip.
  await  minio.fPutObject(bucket, namefile, file,function(err, etag) {
        if (err) return console.log(err)
        console.log(`Se a subido ${namefile} al bucket => ${bucket}`)
      });
}

peticiones.creatBucket= async (name)=>{

  await  minio.makeBucket(name,minio.ubicacion, function(e) {
        if (e) {
          return console.log(e)
        }
        console.log("cubeta creada exitosamente")
      }); 
}

peticiones.listObjects= async (namebucket, res)=>{
    var  stream  = minio.listObjects(namebucket, '', true);
    await stream.on('data', function(obj) { console.log(obj) } )
    await stream.on('error', function(err) { console.log(err) } ) 
}


module.exports  = peticiones; 

