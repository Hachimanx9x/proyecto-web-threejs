const minio = require("../serverMinio");
var fs = require("fs");
const path = require("path");
const stream = require("stream");
const chalk = require("chalk");
const db = require("../database/buscarDB");
const peticiones = {};

peticiones.getFilesingle = async (bucket, namefile, res) => {
  await minio.fGetObject(
    bucket,
    namefile,
    path.join(__dirname, `../routes/tmp/${namefile}`),
    function (e) {
      if (e) {
        console.log(chalk.bgRed("___") + chalk.red(`bucket o archivo`));
        return res.json(e);
      }
      //console.log('done')
      const r = fs.createReadStream(
        path.join(__dirname, `../routes/tmp/${namefile}`)
      ); //llamamos el archivo para el envio
      const ps = new stream.PassThrough();
      sinfile(r, ps, res);
    }
  );
};

function sinfile(r, ps, res) {
  stream.pipeline(
    r,
    ps, //<---- esto hace un truco con el manejo de errores de transmisión
    (err) => {
      if (err) {
        console.log("bocket es muy lento");
        sinfile(r, ps, res);
        return;
      }
    }
  );
  ps.pipe(res); //se renderiza el archivo
  try {
    fs.unlinkSync(path.join(__dirname, `../routes/tmp/${namefile}`)); //se borra el archivo temporal
    // console.log('borrado')
  } catch (err) {
    //  console.error('Something wrong happened removing the file', err)//No hay tal archivo o cualquier otro tipo de error
  }
}
peticiones.putFile = async (bucket, namefile, file, fileStat) => {
  var data = { upload: false, file: false };
  return new Promise((resolve, reject) => {
    // Using fPutObject API upload your file to the bucket europetrip.
    minio.fPutObject(bucket, namefile, file, fileStat, function (err, etag) {
      if (err) reject(err);
      data.upload = true;
      try {
        fs.unlinkSync(file);
        data.file = true;
        resolve(data);
        console.log("borrado");
      } catch (err) {
        reject(err);
      }
    });
  });
};

peticiones.creatBucket = (name) => {
  return new Promise((res, rej) => {
    minio.makeBucket(name, minio.ubicacion, function (e) {
      if (e) {
        rej(e);
      }
      res(true);
    });
  });
};

peticiones.listObjects = async (namebucket) => {
  return new Promise((res, rej) => {
    var names = [];
    var names2 = [];
    var n = 0;
    console.log(`bucket de lista ${namebucket}`);
    var stream = minio.listObjects(namebucket, "", true);
    stream.on("data", (obj) => {
      names2.push(obj.name);
      stream.on("data", (obj2) => {
        console.log(names2);
        console.log(names2.length);
      });
    }); /*
    stream.on('data', async (obj) => {
      names.push(obj.name);
      console.log(obj.name)
      stream.on('data', (obj2) => {
        n++;
        console.log(names)
        if (n === names.length) {
          res(names); console.log("sali de metodo lista bucket")
        }
      });
    });*/
    stream.on("error", function (err) {
      rej(err);
    });
  });
};

peticiones.removeObject = (bucket, obj) => {
  return new Promise((res, rej) => {
    minio.removeObject(bucket, obj, (e) => {
      if (e) {
        rej({ msj: e.message });
      } else {
        res({ msj: `borrado el archivo ${obj}` });
      }
    });
  });
};
peticiones.removeBucket = (bucket, archivos) => {
  return new Promise((res, rej) => {
    removerobjeto(archivos, bucket)
      .then((result) => {
        minio.removeBucket(bucket, function (err) {
          if (err) {
            console.log("error");
            console.log(err.message);
            rej(err);
          } else {
            res(bucket);
            console.log("Bucket removed successfully.");
          }
        });
      })
      .catch((err) => rej(err));
  });
};

function removerobjeto(lista, bucket) {
  return new Promise((res, rej) => {
    console.log(lista);
    if (lista.length == 0 || lista[0] == "null") {
      res(true);
    } else {
      let num = 0;
      for (let a = 0; a < lista.length; a++) {
        peticiones
          .removeObject(bucket, lista[a])
          .then((result) => {
            console.log(result.msj);
            if (num === lista.length - 1) {
              res(true);
              console.log("sali");
            }
            num++;
          })
          .catch((err) => rej(err));
      }
    }
  });
}
module.exports = peticiones;
