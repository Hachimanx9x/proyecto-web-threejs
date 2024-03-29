const minio = require("../serverMinio");
var fs = require("fs");
const path = require("path");
const stream = require("stream");
const chalk = require("chalk");
const db = require("../database/buscarDB");
const peticiones = {};
const filtro = /(?:\.([^.]+))?$/;
peticiones.stringfile = async (bucket, namefile) => {
  console.log("stringfile")
  return new Promise(async (res, rej) => {
    riesgoDas(bucket,namefile,rej ,res)
  });
};



function riesgoDas(bucket,namefile,rej ,res){
  minio.fGetObject(
    bucket,
    namefile,
    path.join(__dirname, `../routes/tmp/${namefile}`),
    function (e) {
      if (e) {
        console.log(
          chalk.bgRed("___") + chalk.red(`bucket : ${bucket} o archivo`)
        );

       //// rej(e);
        riesgoDas(bucket,namefile,rej ,res)
      } else {
       
        solvedString(namefile,res)
        
      }
    }
  );
}
function solvedString(namefile,res){
  try {
    let file = fs.readFileSync(
      path.join(__dirname, `../routes/tmp/${namefile}`)
    );
  //  console.log("fie")
   // console.log(file)
    // console.log(file.toString("base64"));
    fs.unlinkSync(path.join(__dirname, `../routes/tmp/${namefile}`)); //se borra el archivo temporal
    // console.log('borrado')
    res(file.toString("base64"));
  } catch (err) {
    console.log(err);
  }
}

peticiones.getFilesinglestring = async (bucket, namefile, res) => {
  await minio.fGetObject(
    bucket,
    namefile,
    path.join(__dirname, `../routes/tmp/${namefile}`),
    function (e) {
      if (e) {
        console.log(
          chalk.bgRed("___") + chalk.red(`getFilesinglestring bucket o archivo`)
        );
        // console.log(e);
        return res.json(e);
      }
      let file = fs.readFileSync(
        path.join(__dirname, `../routes/tmp/${namefile}`)
      );
      // console.log(file.toString("base64"));
      try {
        fs.unlinkSync(path.join(__dirname, `../routes/tmp/${namefile}`)); //se borra el archivo temporal
        // console.log('borrado')
      } catch (err) {
        console.log(err);
      }
      res.json(file.toString("base64"));
    }
  );
};

peticiones.getFilesingle = async (bucket, namefile, res) => {
  console.log("getFilesingle");
  console.log(`${bucket} : ${namefile}`)
  await minio.fGetObject(
    bucket,
    namefile,
    path.join(__dirname, `../routes/tmp/${namefile}`),
    (e) => {
      if (!e) {
        sinfile(
          fs.createReadStream(
            path.join(__dirname, `../routes/tmp/${namefile}`)
          ),
          new stream.PassThrough(),
          res,
          namefile
        );
      } else {
        try {
          console.log(e);
          let files = fs.readdirSync(path.join(__dirname, `../routes/tmp`));

          for (let a = 0; a < files.length; a++) {
            if (filtro.exec(`${files[a]}`)[1] !== "minio") {
              console.log(`${files[a]}`);
              sinfile(
                fs.createReadStream(
                  path.join(__dirname, `../routes/tmp/${namefile}`)
                ),
                new stream.PassThrough(),
                res,
                namefile
              );
            } else {
              let tf = fs.readdirSync(path.join(__dirname, `../routes/tmp`));
              let booleanveri = false;
              for (let x in tf) {
                if (namefile === tf[x]) {
                  booleanveri = true;
                }
              }
              if (booleanveri) {
                fs.unlink(
                  path.join(__dirname, `../routes/tmp/${files[a]}`),
                  (err) => {
                    if (err) throw err;
                    //  console.log("File deleted: " + files[a]);
                  }
                );
              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  );

  //sinfunfileretry(bucket, namefile, res);
};
/*
async function sinfunfileretry(bucket, namefile, res) {
  await minio.fGetObject(
    bucket,
    namefile,
    path.join(__dirname, `../routes/tmp/${namefile}`),
    function async(e) {
      if (e) {
        console.log(e);
        console.log(
          chalk.bgRed("___") + chalk.red(` getFilesinglebucket o archivo`)
        );
        console.log(chalk.bgRed("==>") + chalk.red(`Limpiando espacio`));

        let files = fs.readdirSync(path.join(__dirname, `../routes/tmp`));
        console.log(files);
        for (let a = 0; a < files.length; a++) {
          try {
            if (filtro.exec(`${files[a]}`)[1] === "minio") {
              fs.unlinkSync(path.join(__dirname, `../routes/tmp/${files[a]}`)); //se borra el archivo temporal
              console.log(
                chalk.bgRed("==>") + chalk.red(`${files[a]} borrado`)
              );
            }
          } catch (err) {
            console.log(
              chalk.bgRed("==>") +
                chalk.red(`Error en el borrado del archivo ${files[a]}`)
            );
            console.log(err);
            //  console.error('Something wrong happened removing the file', err)//No hay tal archivo o cualquier otro tipo de error
          }
        }

        let files2 = fs.readdirSync(path.join(__dirname, `../routes/tmp`));
        if (files2.length < 0) {
          console.log("salio del error ");
          sinfunfileretry(bucket, namefile, res);
          return;
        }
      } else {
        sinfile(
          fs.createReadStream(
            path.join(__dirname, `../routes/tmp/${namefile}`)
          ),
          new stream.PassThrough(),
          res,
          namefile
        );
      }
    }
  );
}
*/
function sinfile(r, ps, res, namefile) {
  try {
    stream.pipeline(
      r,
      ps, //<---- esto hace un truco con el manejo de errores de transmisión
      (err) => {
        if (err) {
          console.log("bocket es muy lento");
          console.log(err);
          sinfile(r, ps, res);
          return;
        }
      }
    );
    ps.pipe(res).on("finish", () => {
      let tf = fs.readdirSync(path.join(__dirname, `../routes/tmp`));
      let booleanveri = false;
      if (namefile !== undefined) {
        for (let x in tf) {
          if (namefile === tf[x]) {
            booleanveri = true;
          }
        }

        if (booleanveri) {
          fs.unlink(
            path.join(__dirname, `../routes/tmp/${namefile}`),
            (err) => {
              if (err) throw err;
              // console.log("File deleted: " + namefile);
            }
          );
        }
      }
    }); //se renderiza el archivo
    console.log(chalk.bgBlue("___") + chalk.blue(`Archivo enviado `));

    //se borra el archivo temporal
    // console.log('borrado')
  } catch (err) {
    console.log(err);
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
