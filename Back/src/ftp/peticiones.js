const minio = require("../serverMinio"); 
var fs = require('fs')
const path = require('path');
const peticiones ={}; 

peticiones.getFilesingle= async (bucket,namefile)=>{
  
  await  minio.fGetObject(bucket,namefile ,path.join(__dirname, `../routes/tmp/${namefile}`), function(e) {
    if (e) {
      return console.log(e)
    }
    console.log('done')
  })
 return path.join(__dirname, `../routes/tmp/${namefile}`); 
}
peticiones.getFile=()=>{
    
}

peticiones.putFile=async (bucket,namefile, file ,fileStat )=>{ 


    // Using fPutObject API upload your file to the bucket europetrip.
  await  minio.fPutObject(bucket, namefile, file,fileStat,function(err, etag) {
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

