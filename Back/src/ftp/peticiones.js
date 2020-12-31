const minio = require("../serverMinio");
var fs = require('fs')
const path = require('path');
const stream = require('stream')

const db = require('../database/buscarDB');
const peticiones = {};

peticiones.getFilesingle = async (bucket, namefile, res) => {

  await minio.fGetObject(bucket, namefile, path.join(__dirname, `../routes/tmp/${namefile}`), function (e) {
    if (e) {
      return console.log(e)
    }
    //console.log('done')
    const r = fs.createReadStream(path.join(__dirname, `../routes/tmp/${namefile}`)) //llamamos el archivo para el envio 
    const ps = new stream.PassThrough()
    stream.pipeline(r, ps, //<---- esto hace un truco con el manejo de errores de transmisión
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
      // console.log('borrado')
    } catch (err) {
      //  console.error('Something wrong happened removing the file', err)//No hay tal archivo o cualquier otro tipo de error
    }

  })

}



peticiones.putFile = async (bucket, namefile, file, fileStat) => {
  var data = { upload: false, file: false }
  return new Promise((resolve, reject) => {
    // Using fPutObject API upload your file to the bucket europetrip.
    minio.fPutObject(bucket, namefile, file, fileStat, function (err, etag) {
      if (err) reject(data);
      data.upload = true
      try {
        fs.unlinkSync(file)
        data.file = true;
        resolve(data)
        //console.log('borrado')
      } catch (err) {
        reject(data);
      }
    });
  });


}

peticiones.creatBucket = (name) => {
  return new Promise((res, rej) => {
    minio.makeBucket(name, minio.ubicacion, function (e) {
      if (e) {
        rej(e);
      }
      res(true);
    });
  });

}


peticiones.listObjects = async (namebucket) => {
  return new Promise((res, rej) => {
    var names = [];
    var n = 0;
    var stream = minio.listObjects(namebucket, '', true);
    stream.on('data', async (obj) => {
      names.push(obj.name);
      stream.on('data', (obj2) => {
        n++;
        if (n === names.length) {
          res(names);
        }
      });
    });
    stream.on('error', function (err) { rej(err) })

  });

}




module.exports = peticiones;
/*
  await stream.on('data', function(obj) {  names.push(obj.name);
        stream.on('data', function(obj) {
         n++;
        if(n===names.length){ res.json(names); }
        });

    }  )
 */
