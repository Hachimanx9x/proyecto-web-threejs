const minio = require("../serverMinio"); 
var fs = require('fs')
const path = require('path');
const stream = require('stream')

const peticiones ={};  

peticiones.getFilesingle= async (bucket,namefile,res)=>{
  
  await  minio.fGetObject(bucket,namefile ,path.join(__dirname, `../routes/tmp/${namefile}`), function(e) {
    if (e) {
      return console.log(e)
    }
    console.log('done')
    const r = fs.createReadStream(path.join(__dirname, `../routes/tmp/${namefile}`)) //llamamos el archivo para el envio 
    const ps = new stream.PassThrough()
    stream.pipeline( r,ps, //<---- esto hace un truco con el manejo de errores de transmisión
     (err) => {
      if (err) {
        console.log(err) //No hay tal archivo o cualquier otro tipo de error
        return res.sendStatus(400); 
      }
    } 
    );
    ps.pipe(res); //se renderiza el archivo
    try {
      fs.unlinkSync(path.join(__dirname, `../routes/tmp/${namefile}`))//se borra el archivo temporal 
      console.log('borrado')
    } catch(err) {
      console.error('Something wrong happened removing the file', err)//No hay tal archivo o cualquier otro tipo de error
    }

  })

}

peticiones.getFile=()=>{
    
}

peticiones.putFile=async (bucket,namefile, file ,fileStat )=>{ 


    // Using fPutObject API upload your file to the bucket europetrip.
  await  minio.fPutObject(bucket, namefile, file,fileStat,function(err, etag) {
        if (err) return console.log(err)
        console.log(`Se a subido ${namefile} al bucket => ${bucket}`)
        try {
          fs.unlinkSync(file)
          console.log('borrado')
        } catch(err) {
          console.error('Something wrong happened removing the file', err)
        }
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

var externa_list_melleno;
peticiones.listObjects= async (namebucket, res)=>{
  var names =[]; 
  var n; 
  var n =0; 
    var  stream  = minio.listObjects(namebucket, '', true);

    var nums= await stream.on('data',async (obj)=> {  names.push(obj.name);
        stream.on('data', function(obj) {   
         n++;  
        if(n===names.length){ console.log(names); return names;  }
        });
    
    }  ); 

    console.log(nums); 

   

   // await stream.on('data', (obj)=> {   return obj; n=obj;      }); 
    await stream.on('error', function(err) { console.log(err) } ) 

  // return n ; 
}


module.exports  = peticiones; 
/*
  await stream.on('data', function(obj) {  names.push(obj.name);
        stream.on('data', function(obj) {   
         n++;  
        if(n===names.length){ res.json(names); }
        });
    
    }  )
 */
